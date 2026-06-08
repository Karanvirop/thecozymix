import productImage from "@/assets/product-shop.jpg";

export type ProductSize = {
  id: string;
  label: string;
  price: number;
  originalPrice?: number;
};

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  image: string;
  sizes: ProductSize[];
  rating?: number;
};

export const PRODUCTS: Record<string, Product> = {
  "restorative-shampoo": {
    id: "restorative-shampoo",
    name: "Restorative Shampoo",
    subtitle: "Cold pressed botanical formula",
    rating: 4.9,
    image: productImage,
    sizes: [
      { id: "200ml", label: "200ml", price: 300, originalPrice: 450 },
      { id: "500ml", label: "500ml", price: 650, originalPrice: 900 },
      { id: "1000ml", label: "1000ml / 1L", price: 1200, originalPrice: 1600 },
    ],
  },
};

export function getProductSize(product: Product, sizeId: string): ProductSize | undefined {
  return product.sizes.find((size) => size.id === sizeId);
}

export function getLowestPrice(product: Product): number {
  return Math.min(...product.sizes.map((size) => size.price));
}

export function cartItemKey(productId: string, sizeId: string): string {
  return `${productId}::${sizeId}`;
}

export function formatCartItemDisplay(
  product: Product,
  sizeId: string,
  quantity: number,
): string {
  const size = getProductSize(product, sizeId);
  const sizeLabel = size?.label ?? sizeId;
  return `${product.name} — ${sizeLabel} x${quantity}`;
}

export function formatWhatsAppLine(
  product: Product,
  sizeId: string,
  quantity: number,
): string {
  const size = getProductSize(product, sizeId);
  if (!size) return "";
  return `• ${product.name} (${size.label}) x${quantity} — ₹${size.price * quantity}`;
}

export function getDiscountPercent(salePrice: number, originalPrice: number) {
  if (originalPrice <= salePrice) return 0;
  return Math.round((1 - salePrice / originalPrice) * 100);
}

export const SHIPPING_ESTIMATE = 0;
