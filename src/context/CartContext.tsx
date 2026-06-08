import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  PRODUCTS,
  SHIPPING_ESTIMATE,
  formatWhatsAppLine,
  getProductSize,
  type Product,
  type ProductSize,
} from "@/lib/products";

const STORAGE_KEY = "cozymix-cart";

export type CartItem = {
  productId: string;
  sizeId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  addItem: (productId: string, sizeId: string, quantity?: number) => void;
  removeItem: (productId: string, sizeId: string) => void;
  setQuantity: (productId: string, sizeId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
  getProduct: (productId: string) => Product | undefined;
  getItemSize: (productId: string, sizeId: string) => ProductSize | undefined;
  getItemUnitPrice: (item: CartItem) => number;
  getItemLineTotal: (item: CartItem) => number;
  formatCartSummary: () => string;
};

const CartContext = createContext<CartContextValue | null>(null);

function isValidCartItem(item: unknown): item is CartItem {
  if (!item || typeof item !== "object") return false;
  const { productId, sizeId, quantity } = item as CartItem;
  const product = PRODUCTS[productId];
  return (
    typeof productId === "string" &&
    typeof sizeId === "string" &&
    typeof quantity === "number" &&
    quantity > 0 &&
    !!product &&
    !!getProductSize(product, sizeId)
  );
}

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as unknown[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isValidCartItem);
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    setItems(readStoredCart());
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items, hydrated]);

  const addItem = useCallback((productId: string, sizeId: string, quantity = 1) => {
    const product = PRODUCTS[productId];
    if (!product || !getProductSize(product, sizeId) || quantity < 1) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId && i.sizeId === sizeId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId && i.sizeId === sizeId
            ? { ...i, quantity: i.quantity + quantity }
            : i,
        );
      }
      return [...prev, { productId, sizeId, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string, sizeId: string) => {
    setItems((prev) =>
      prev.filter((i) => !(i.productId === productId && i.sizeId === sizeId)),
    );
  }, []);

  const setQuantity = useCallback((productId: string, sizeId: string, quantity: number) => {
    const product = PRODUCTS[productId];
    if (!product || !getProductSize(product, sizeId)) return;
    if (quantity < 1) {
      setItems((prev) =>
        prev.filter((i) => !(i.productId === productId && i.sizeId === sizeId)),
      );
      return;
    }
    setItems((prev) =>
      prev.map((i) =>
        i.productId === productId && i.sizeId === sizeId ? { ...i, quantity } : i,
      ),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getProduct = useCallback((productId: string) => PRODUCTS[productId], []);

  const getItemSize = useCallback((productId: string, sizeId: string) => {
    const product = PRODUCTS[productId];
    if (!product) return undefined;
    return getProductSize(product, sizeId);
  }, []);

  const getItemUnitPrice = useCallback((item: CartItem) => {
    const size = getItemSize(item.productId, item.sizeId);
    return size?.price ?? 0;
  }, [getItemSize]);

  const getItemLineTotal = useCallback(
    (item: CartItem) => getItemUnitPrice(item) * item.quantity,
    [getItemUnitPrice],
  );

  const subtotal = useMemo(
    () => items.reduce((sum, item) => sum + getItemLineTotal(item), 0),
    [items, getItemLineTotal],
  );

  const totalItems = useMemo(
    () => items.reduce((sum, item) => sum + item.quantity, 0),
    [items],
  );

  const shipping = items.length > 0 ? SHIPPING_ESTIMATE : 0;
  const total = subtotal + shipping;

  const formatCartSummary = useCallback(() => {
    return items
      .map((item) => {
        const product = PRODUCTS[item.productId];
        if (!product) return "";
        return formatWhatsAppLine(product, item.sizeId, item.quantity);
      })
      .filter(Boolean)
      .join("\n");
  }, [items]);

  const value = useMemo(
    () => ({
      items,
      hydrated,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      totalItems,
      subtotal,
      shipping,
      total,
      getProduct,
      getItemSize,
      getItemUnitPrice,
      getItemLineTotal,
      formatCartSummary,
    }),
    [
      items,
      hydrated,
      addItem,
      removeItem,
      setQuantity,
      clearCart,
      totalItems,
      subtotal,
      shipping,
      total,
      getProduct,
      getItemSize,
      getItemUnitPrice,
      getItemLineTotal,
      formatCartSummary,
    ],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return ctx;
}
