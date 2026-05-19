import { Star } from "lucide-react";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

const DEFAULT_RATING = 4.9;
const DEFAULT_REVIEW_COUNT = 128;

type ProductRatingProps = {
  product: Product;
  rating?: number;
  reviewCount?: number;
  size?: "sm" | "lg";
  className?: string;
};

export function ProductRating({
  product,
  rating: ratingProp,
  reviewCount: reviewCountProp,
  size = "sm",
  className,
}: ProductRatingProps) {
  const rating = ratingProp ?? product.rating ?? DEFAULT_RATING;
  const reviewCount = reviewCountProp ?? product.reviewCount ?? DEFAULT_REVIEW_COUNT;
  const starSize = size === "lg" ? "w-4 h-4" : "w-3.5 h-3.5";
  const textSize = size === "lg" ? "text-base" : "text-sm";

  return (
    <div className={cn("flex items-center gap-1.5", className)}>
      <div className="flex items-center gap-0.5 text-[#F59E0B]" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={cn(starSize, "fill-current stroke-current")} strokeWidth={0} />
        ))}
      </div>
      <span className={cn(textSize, "font-semibold text-foreground leading-none")}>{rating}</span>
      <span className={cn(textSize, "text-muted-foreground leading-none")}>
        · {reviewCount} reviews
      </span>
    </div>
  );
}
