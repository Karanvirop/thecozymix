import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductPricing } from "@/components/ProductPricing";
import { ProductRating } from "@/components/ProductRating";
import { useCart } from "@/context/CartContext";
import { PRODUCTS } from "@/lib/products";
import { cn } from "@/lib/utils";

export const Route = createFileRoute("/shop")({
  head: () => ({
    meta: [
      { title: "Shop — CozyMix Restorative Shampoo 250ml" },
      {
        name: "description",
        content: "Order the CozyMix Restorative Shampoo 250ml. Salon-grade, botanical, sulfate-free.",
      },
      { property: "og:title", content: "Shop CozyMix Restorative Shampoo" },
    ],
  }),
  component: Shop,
});

const product = PRODUCTS["restorative-shampoo"];

function Shop() {
  const [qty, setQty] = useState(1);
  const { addItem } = useCart();
  const [added, setAdded] = useState(false);

  const total = product.price * qty;

  const handleAddToCart = () => {
    addItem(product.id, qty);
    setAdded(true);
    window.setTimeout(() => setAdded(false), 1500);
  };

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-20">
        <div className="text-center mb-16">
          <div className="tracking-luxury text-gold mb-4">The Collection</div>
          <h1 className="font-serif text-5xl md:text-6xl">The CozyMix</h1>
        </div>

        <div className="grid md:grid-cols-2 gap-16 items-start">
          <div className="bg-card border border-border p-6 group">
            <div className="overflow-hidden">
              <img
                src={product.image}
                alt="CozyMix Restorative Shampoo bottle"
                width={1024}
                height={1280}
                loading="lazy"
                className="w-full aspect-[4/5] object-cover transition-transform duration-700 group-hover:scale-105"
              />
            </div>
          </div>

          <div className="md:pt-8">
            <div className="tracking-luxury text-gold mb-4">No. 01 · Hair</div>
            <h2 className="font-serif text-4xl md:text-5xl mb-2">{product.name}</h2>
            <ProductRating product={product} size="lg" className="mb-3" />

            <p className="font-serif italic text-muted-foreground mb-6">{product.subtitle}</p>

            <ProductPricing product={product} size="lg" className="mb-8" />

            <p className="text-muted-foreground leading-relaxed mb-8 max-w-md">
              A nightly ritual in a matte black bottle. Argan, rosemary and raw honey quietly rebuild
              what daily life has worn away. Lather. Linger. Restore.
            </p>

            <div className="flex items-center gap-6 mb-8">
              <div className="tracking-luxury text-muted-foreground">Quantity</div>
              <div className="flex items-center border border-border">
                <button
                  type="button"
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="w-10 h-10 text-gold hover:bg-secondary"
                >
                  −
                </button>
                <div className="w-12 text-center font-serif text-xl">{qty}</div>
                <button
                  type="button"
                  onClick={() => setQty(qty + 1)}
                  className="w-10 h-10 text-gold hover:bg-secondary"
                >
                  +
                </button>
              </div>
            </div>

            <button
              type="button"
              onClick={handleAddToCart}
              className={cn(
                "w-full tracking-luxury py-5 transition-all duration-300",
                added
                  ? "bg-secondary text-gold border border-gold"
                  : "bg-gold text-primary-foreground hover:opacity-90",
              )}
            >
              {added ? "Added to Cart" : `Add to Cart · ₹${total}`}
            </button>

            <Link
              to="/cart"
              className="block w-full text-center mt-3 tracking-luxury border border-border text-muted-foreground py-4 hover:border-gold hover:text-gold transition-all"
            >
              View Cart
            </Link>

            <div className="mt-6 grid grid-cols-3 gap-4 text-center pt-8 border-t border-border">
              <div>
                <div className="text-gold font-serif text-lg">Free</div>
                <div className="text-xs tracking-widest text-muted-foreground mt-1">Shipping</div>
              </div>
              <div>
                <div className="text-gold font-serif text-lg">100%</div>
                <div className="text-xs tracking-widest text-muted-foreground mt-1">Botanical</div>
              </div>
              <div>
                <div className="text-gold font-serif text-lg">30d</div>
                <div className="text-xs tracking-widest text-muted-foreground mt-1">Returns</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
