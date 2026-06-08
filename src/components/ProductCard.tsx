import { Link } from "@tanstack/react-router";
import { getLowestPrice, type Product } from "@/lib/products";
import { cn } from "@/lib/utils";

type ProductCardProps = {
  product: Product;
  className?: string;
};

export function ProductCard({
  product,
  className,
}: ProductCardProps) {
  const startingPrice = getLowestPrice(product);

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

        <p className="font-serif italic text-sm text-muted-foreground mb-2 mt-1">{product.subtitle}</p>

        <p className="text-xs tracking-widest text-muted-foreground mb-5">
          Starts from <span className="font-serif text-gold">₹{startingPrice}</span>
        </p>

        <Link
          to="/shop"
          className="mt-auto w-full tracking-luxury py-4 transition-all duration-300 bg-gold text-primary-foreground hover:opacity-90 text-center"
        >
          Buy Now
        </Link>
      </div>
    </article>
  );
}
