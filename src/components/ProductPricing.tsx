import { getDiscountPercent, getLowestPrice, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const DEFAULT_ORIGINAL_PRICE = 450;

type ProductPricingProps = {
  product: Product;
  price?: number;
  originalPrice?: number;
  showFromLabel?: boolean;
  size?: "sm" | "lg";
  className?: string;
};

export function ProductPricing({
  product,
  price,
  originalPrice: originalPriceProp,
  showFromLabel = false,
  size = "sm",
  className,
}: ProductPricingProps) {
  const salePrice = price ?? getLowestPrice(product);
  const originalPrice = originalPriceProp ?? DEFAULT_ORIGINAL_PRICE;
  const discountPercent = getDiscountPercent(salePrice, originalPrice);
  const showDiscount = originalPriceProp !== undefined && discountPercent > 0;

  const saleClass = size === "lg" ? "font-serif text-4xl text-gold" : "font-serif text-2xl text-gold";
  const originalClass =
    size === "lg"
      ? "font-serif text-2xl text-muted-foreground line-through"
      : "font-serif text-lg text-muted-foreground line-through";
  const badgeClass =
    size === "lg"
      ? "inline-flex items-center rounded-full bg-emerald-600 px-2.5 py-1 text-xs font-medium text-white"
      : "inline-flex items-center rounded-full bg-emerald-600 px-2 py-0.5 text-[11px] font-medium text-white";

  return (
    <div className={cn("flex flex-wrap items-center gap-x-2 gap-y-1 leading-none", className)}>
      {showFromLabel && (
        <span className="text-muted-foreground text-sm tracking-widest self-end mb-1">From</span>
      )}
      <span className={cn(saleClass, "leading-none")}>₹{salePrice}</span>
      {showDiscount && (
        <>
          <span className={cn(originalClass, "leading-none")}>₹{originalPrice}</span>
          <span className={cn(badgeClass, "leading-none")}>Save {discountPercent}%</span>
        </>
      )}
      {size === "lg" && (
        <span className="text-muted-foreground text-sm tracking-widest self-end mb-1">INR</span>
      )}
    </div>
  );
}
