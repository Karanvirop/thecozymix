import productImage from "@/assets/product-shop.jpg";

export type Product = {
  id: string;
  name: string;
  subtitle: string;
  price: number;
  image: string;
  originalPrice?: number;
  rating?: number;
  //reviewCount?: number;
};

export const PRODUCTS: Record<string, Product> = {
  "restorative-shampoo": {
    id: "restorative-shampoo",
    name: "Restorative Shampoo",
    subtitle: "250 ml — Cold pressed botanical formula",
    price: 300,
    originalPrice: 450,
    rating: 4.9,
    //reviewCount: 120,
    image: productImage,
  },
};

export function getDiscountPercent(salePrice: number, originalPrice: number) {
  if (originalPrice <= salePrice) return 0;
  return Math.round((1 - salePrice / originalPrice) * 100);
}

export const SHIPPING_ESTIMATE = 0;
