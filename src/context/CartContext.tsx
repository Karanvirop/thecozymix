import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { PRODUCTS, SHIPPING_ESTIMATE, type Product } from "@/lib/products";

const STORAGE_KEY = "cozymix-cart";

export type CartItem = {
  productId: string;
  quantity: number;
};

type CartContextValue = {
  items: CartItem[];
  hydrated: boolean;
  addItem: (productId: string, quantity?: number) => void;
  removeItem: (productId: string) => void;
  setQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  subtotal: number;
  shipping: number;
  total: number;
  getProduct: (productId: string) => Product | undefined;
  formatCartSummary: () => string;
};

const CartContext = createContext<CartContextValue | null>(null);

function readStoredCart(): CartItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw) as CartItem[];
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (item) =>
        typeof item.productId === "string" &&
        typeof item.quantity === "number" &&
        item.quantity > 0 &&
        PRODUCTS[item.productId],
    );
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

  const addItem = useCallback((productId: string, quantity = 1) => {
    if (!PRODUCTS[productId] || quantity < 1) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.productId === productId);
      if (existing) {
        return prev.map((i) =>
          i.productId === productId ? { ...i, quantity: i.quantity + quantity } : i,
        );
      }
      return [...prev, { productId, quantity }];
    });
  }, []);

  const removeItem = useCallback((productId: string) => {
    setItems((prev) => prev.filter((i) => i.productId !== productId));
  }, []);

  const setQuantity = useCallback((productId: string, quantity: number) => {
    if (!PRODUCTS[productId]) return;
    if (quantity < 1) {
      setItems((prev) => prev.filter((i) => i.productId !== productId));
      return;
    }
    setItems((prev) =>
      prev.map((i) => (i.productId === productId ? { ...i, quantity } : i)),
    );
  }, []);

  const clearCart = useCallback(() => setItems([]), []);

  const getProduct = useCallback((productId: string) => PRODUCTS[productId], []);

  const subtotal = useMemo(
    () =>
      items.reduce((sum, item) => {
        const product = PRODUCTS[item.productId];
        return sum + (product?.price ?? 0) * item.quantity;
      }, 0),
    [items],
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
        return `${item.quantity} × ${product.name} (₹${product.price * item.quantity})`;
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
