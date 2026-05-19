import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { useCart } from "@/context/CartContext";

export const Route = createFileRoute("/checkout")({
  head: () => ({
    meta: [
      { title: "Checkout — CozyMix" },
      { name: "description", content: "Complete your CozyMix order." },
    ],
  }),
  component: CheckoutPage,
});

const WHATSAPP_NUMBER = "9815534464";

function CheckoutPage() {
  const { items, total, formatCartSummary, getProduct, hydrated } = useCart();

  const checkoutWhatsApp = () => {
    const lines = items
      .map((item) => {
        const product = getProduct(item.productId);
        if (!product) return "";
        return `${item.quantity} × ${product.name} (₹${product.price * item.quantity})`;
      })
      .filter(Boolean)
      .join(", ");

    const msg = encodeURIComponent(
      `Hello CozyMix, I'd like to checkout:\n\n${lines || formatCartSummary()}\n\nTotal: ₹${total}`,
    );
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${msg}`, "_blank");
  };

  if (hydrated && items.length === 0) {
    return (
      <SiteLayout>
        <section className="max-w-lg mx-auto px-6 py-24 text-center">
          <h1 className="font-serif text-4xl mb-4">Nothing to checkout</h1>
          <p className="text-muted-foreground mb-8">Your cart is empty.</p>
          <Link
            to="/shop"
            className="tracking-luxury bg-gold text-primary-foreground px-8 py-4 hover:opacity-90 transition-all inline-block"
          >
            Browse Shop
          </Link>
        </section>
      </SiteLayout>
    );
  }

  return (
    <SiteLayout>
      <section className="max-w-2xl mx-auto px-6 md:px-12 py-20">
        <div className="tracking-luxury text-gold mb-4">Secure Checkout</div>
        <h1 className="font-serif text-4xl md:text-5xl mb-8">Complete your order</h1>

        <div className="bg-card border border-border p-6 md:p-8 space-y-4 mb-8">
          {items.map((item) => {
            const product = getProduct(item.productId);
            if (!product) return null;
            return (
              <div key={item.productId} className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  {item.quantity} × {product.name}
                </span>
                <span className="font-serif text-gold">₹{product.price * item.quantity}</span>
              </div>
            );
          })}
          <div className="border-t border-border pt-4 flex justify-between">
            <span className="tracking-luxury text-gold">Total</span>
            <span className="font-serif text-2xl text-gold">₹{total}</span>
          </div>
        </div>

        <p className="text-muted-foreground text-sm leading-relaxed mb-8">
          Orders are fulfilled via WhatsApp. Tap below to send your cart summary — we&apos;ll confirm
          delivery and payment details.
        </p>

        <button
          type="button"
          onClick={checkoutWhatsApp}
          className="w-full tracking-luxury bg-gold text-primary-foreground py-5 hover:opacity-90 transition-all"
        >
          Continue on WhatsApp · ₹{total}
        </button>

        <Link
          to="/cart"
          className="block text-center mt-6 tracking-luxury text-gold border-b border-gold pb-1 w-fit mx-auto"
        >
          Back to cart
        </Link>
      </section>
    </SiteLayout>
  );
}
