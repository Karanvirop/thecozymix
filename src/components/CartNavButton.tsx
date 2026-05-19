import { Link } from "@tanstack/react-router";
import { ShoppingCart } from "lucide-react";
import { useCart } from "@/context/CartContext";
import { cn } from "@/lib/utils";

export function CartNavButton({ className }: { className?: string }) {
  const { totalItems, hydrated } = useCart();

  return (
    <Link
      to="/cart"
      aria-label={`Cart${totalItems > 0 ? `, ${totalItems} items` : ""}`}
      className={cn(
        "relative inline-flex items-center justify-center w-10 h-10 border border-gold text-gold hover:bg-gold hover:text-primary-foreground transition-all",
        className,
      )}
    >
      <ShoppingCart className="w-5 h-5" strokeWidth={1.5} />
      {hydrated && totalItems > 0 && (
        <span className="absolute -top-1.5 -right-1.5 min-w-[1.125rem] h-[1.125rem] px-1 flex items-center justify-center bg-gold text-primary-foreground text-[10px] font-medium tracking-normal transition-transform duration-200 animate-in zoom-in-50">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </Link>
  );
}
