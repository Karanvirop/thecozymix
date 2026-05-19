import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { ProductPricing } from "@/components/ProductPricing";
import { ProductRating } from "@/components/ProductRating";
import { useCart } from "@/context/CartContext";
import type { Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  className?: string;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
};

export function ProductCard({
  product,
  className,
  originalPrice,
  rating,
  reviewCount,
}: ProductCardProps) {
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const handleAdd = () => {
    addItem(product.id, 1);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1200);
  };

  return (
    <article
      className={cn(
        "bg-card border border-border group flex flex-col transition-shadow duration-300 hover:border-gold/40",
        className,
      )}
    >
      <Link to="/shop" className="block overflow-hidden">
        <img
          src={product.image}
          alt={product.name}
          width={640}
          height={800}
          loading="lazy"
          className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
        />
      </Link>
      <div className="p-6 flex flex-col flex-1">
        <p className="tracking-luxury text-gold text-xs mb-2">No. 01 · Hair</p>
        <Link to="/shop">
          <h3 className="font-serif text-2xl hover:text-gold transition-colors">{product.name}</h3>
        </Link>

        <ProductRating
          product={product}
          rating={rating}
          reviewCount={reviewCount}
          className="mt-1 mb-1"
        />

        <p className="font-serif italic text-sm text-muted-foreground mb-3">{product.subtitle}</p>

        <ProductPricing product={product} originalPrice={originalPrice} className="mb-5" />

        <button
          type="button"
          onClick={handleAdd}
          className={cn(
            "mt-auto w-full tracking-luxury py-4 transition-all duration-300",
            added
              ? "bg-secondary text-gold border border-gold"
              : "bg-gold text-primary-foreground hover:opacity-90",
          )}
        >
          {added ? "Added to Cart" : "Add to Cart"}
        </button>
      </div>
    </article>
  );
}
