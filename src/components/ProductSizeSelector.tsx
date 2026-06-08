import type { ProductSize } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductSizeSelectorProps = {
  sizes: ProductSize[];
  selectedSizeId: string | null;
  onSelect: (sizeId: string) => void;
  className?: string;
};

export function ProductSizeSelector({
  sizes,
  selectedSizeId,
  onSelect,
  className,
}: ProductSizeSelectorProps) {
  return (
    <div className={cn("flex flex-wrap gap-3", className)}>
      {sizes.map((size) => {
        const isSelected = selectedSizeId === size.id;
        return (
          <button
            key={size.id}
            type="button"
            onClick={() => onSelect(size.id)}
            className={cn(
              "px-4 py-2.5 tracking-luxury text-sm border transition-all duration-200",
              isSelected
                ? "bg-gold text-primary-foreground border-gold"
                : "border-border text-muted-foreground hover:border-gold hover:text-gold bg-background",
            )}
          >
            <span className="block">{size.label}</span>
            <span className={cn("block font-serif text-xs mt-0.5", isSelected ? "opacity-90" : "text-gold")}>
              ₹{size.price}
            </span>
          </button>
        );
      })}
    </div>
  );
}
