import { createFileRoute, Link } from "@tanstack/react-router";
import { Minus, Plus, ShoppingBag, Trash2 } from "lucide-react";
import { SiteLayout } from "@/components/SiteLayout";
import { ContactBuyDialog } from "@/components/ContactBuyDialog";
import { useCart } from "@/context/CartContext";
import { cartItemKey, formatCartItemDisplay } from "@/lib/products";

export const Route = createFileRoute("/cart")({
  head: () => ({
    meta: [
      { title: "Your Cart — CozyMix" },
      { name: "description", content: "Review your CozyMix cart and checkout." },
    ],
  }),
  component: CartPage,
});

function CartPage() {
  const {
    items,
    totalItems,
    subtotal,
    shipping,
    total,
    removeItem,
    setQuantity,
    getProduct,
    getItemUnitPrice,
    getItemLineTotal,
    hydrated,
  } = useCart();

  const isEmpty = hydrated && items.length === 0;

  return (
    <SiteLayout>
      <section className="max-w-7xl mx-auto px-6 md:px-12 py-16 md:py-20">
        <header className="mb-12 md:mb-16">
          <p className="tracking-luxury text-gold mb-4">Checkout</p>
          <h1 className="font-serif text-4xl md:text-5xl">Your Cart</h1>
          {hydrated && totalItems > 0 && (
            <p className="mt-3 text-muted-foreground tracking-widest text-sm">
              {totalItems} {totalItems === 1 ? "item" : "items"}
            </p>
          )}
        </header>

        {isEmpty ? (
          <EmptyCart />
        ) : (
          <div className="grid lg:grid-cols-[1fr_360px] gap-12 lg:gap-16 items-start">
            <ul className="space-y-6">
              {items.map((item) => {
                const product = getProduct(item.productId);
                if (!product) return null;
                const lineTotal = getItemLineTotal(item);
                const unitPrice = getItemUnitPrice(item);
                const itemKey = cartItemKey(item.productId, item.sizeId);

                return (
                  <li
                    key={itemKey}
                    className="flex gap-4 md:gap-6 bg-card border border-border p-4 md:p-6 transition-all duration-300 animate-in fade-in slide-in-from-bottom-2"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-24 h-28 md:w-28 md:h-32 object-cover shrink-0"
                    />
                    <div className="flex-1 min-w-0 flex flex-col">
                      <h2 className="font-serif text-xl md:text-2xl">
                        {formatCartItemDisplay(product, item.sizeId, item.quantity)}
                      </h2>
                      <p className="text-sm text-muted-foreground font-serif italic mt-0.5">
                        {product.subtitle}
                      </p>
                      <p className="font-serif text-gold text-lg mt-2">₹{unitPrice} each</p>

                      <div className="mt-auto pt-4 flex items-center justify-between gap-4 flex-wrap">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            onClick={() => setQuantity(item.productId, item.sizeId, item.quantity - 1)}
                            className="w-9 h-9 text-gold hover:bg-secondary transition-colors"
                            aria-label="Decrease quantity"
                          >
                            <Minus className="w-4 h-4 mx-auto" />
                          </button>
                          <span className="w-10 text-center font-serif">{item.quantity}</span>
                          <button
                            type="button"
                            onClick={() => setQuantity(item.productId, item.sizeId, item.quantity + 1)}
                            className="w-9 h-9 text-gold hover:bg-secondary transition-colors"
                            aria-label="Increase quantity"
                          >
                            <Plus className="w-4 h-4 mx-auto" />
                          </button>
                        </div>
                        <button
                          type="button"
                          onClick={() => removeItem(item.productId, item.sizeId)}
                          className="flex items-center gap-2 text-xs tracking-luxury text-muted-foreground hover:text-destructive transition-colors"
                        >
                          <Trash2 className="w-4 h-4" />
                          Remove
                        </button>
                      </div>
                    </div>
                    <p className="font-serif text-gold text-lg hidden sm:block shrink-0">₹{lineTotal}</p>
                  </li>
                );
              })}
            </ul>

            <OrderSummary subtotal={subtotal} shipping={shipping} total={total} />
          </div>
        )}
      </section>
    </SiteLayout>
  );
}

function EmptyCart() {
  return (
    <div className="max-w-md mx-auto text-center py-16 animate-in fade-in duration-500">
      <div className="inline-flex items-center justify-center w-20 h-20 border border-border text-gold/60 mb-8">
        <ShoppingBag className="w-10 h-10" strokeWidth={1} />
      </div>
      <h2 className="font-serif text-2xl mb-3">Your cart is empty</h2>
      <p className="text-muted-foreground text-sm leading-relaxed mb-8">
        Discover our restorative ritual — botanical, sulfate-free, poured in small batches.
      </p>
      <Link
        to="/shop"
        className="inline-block tracking-luxury bg-gold text-primary-foreground px-8 py-4 hover:opacity-90 transition-all"
      >
        Continue Shopping
      </Link>
    </div>
  );
}

function OrderSummary({
  subtotal,
  shipping,
  total,
}: {
  subtotal: number;
  shipping: number;
  total: number;
}) {
  return (
    <aside className="lg:sticky lg:top-28 bg-card border border-border p-6 md:p-8 space-y-6">
      <h2 className="font-serif text-2xl">Order Summary</h2>
      <dl className="space-y-3 text-sm">
        <div className="flex justify-between tracking-widest text-muted-foreground">
          <dt>Subtotal</dt>
          <dd className="text-foreground font-serif text-base">₹{subtotal}</dd>
        </div>
        <div className="flex justify-between tracking-widest text-muted-foreground">
          <dt>Estimated shipping</dt>
          <dd className="text-foreground font-serif text-base">
            {shipping === 0 ? "Free" : `₹${shipping}`}
          </dd>
        </div>
        <div className="border-t border-border pt-4 flex justify-between">
          <dt className="tracking-luxury text-gold">Total</dt>
          <dd className="font-serif text-2xl text-gold">₹{total}</dd>
        </div>
      </dl>
      <div className="space-y-3 pt-2">
        <Link
          to="/checkout"
          className="block w-full text-center tracking-luxury bg-gold text-primary-foreground py-4 hover:opacity-90 transition-all"
        >
          Checkout
        </Link>
        <ContactBuyDialog
          trigger={
            <button
              type="button"
              className="w-full tracking-luxury border border-gold text-gold py-4 hover:bg-gold hover:text-primary-foreground transition-all"
            >
              Contact to Buy
            </button>
          }
        />
      </div>
    </aside>
  );
}
