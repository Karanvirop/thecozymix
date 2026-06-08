import { useState } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { cartItemKey, formatCartItemDisplay, formatWhatsAppLine } from "@/lib/products";

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

type AddressForm = {
  fullName: string;
  phone: string;
  street: string;
  city: string;
  state: string;
  pinCode: string;
};

type AddressErrors = Partial<Record<keyof AddressForm, string>>;

const emptyForm: AddressForm = {
  fullName: "",
  phone: "",
  street: "",
  city: "",
  state: "",
  pinCode: "",
};

function validateAddress(form: AddressForm): AddressErrors {
  const errors: AddressErrors = {};
  const name = form.fullName.trim();
  const phone = form.phone.trim();
  const street = form.street.trim();
  const city = form.city.trim();
  const state = form.state.trim();
  const pin = form.pinCode.trim();

  if (!name) errors.fullName = "Full name is required";
  if (!phone) errors.phone = "Phone number is required";
  else if (!/^[6-9]\d{9}$/.test(phone.replace(/\s/g, ""))) {
    errors.phone = "Enter a valid 10-digit mobile number";
  }
  if (!street) errors.street = "Street address is required";
  if (!city) errors.city = "City is required";
  if (!state) errors.state = "State is required";
  if (!pin) errors.pinCode = "PIN code is required";
  else if (!/^\d{6}$/.test(pin)) errors.pinCode = "Enter a valid 6-digit PIN code";

  return errors;
}

function CheckoutPage() {
  const { items, total, getProduct, getItemLineTotal, hydrated } = useCart();
  const [form, setForm] = useState<AddressForm>(emptyForm);
  const [errors, setErrors] = useState<AddressErrors>({});

  const updateField = (field: keyof AddressForm, value: string) => {
    setForm((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const formatOrderLines = () =>
    items
      .map((item) => {
        const product = getProduct(item.productId);
        if (!product) return "";
        return formatWhatsAppLine(product, item.sizeId, item.quantity);
      })
      .filter(Boolean)
      .join("\n");

  const checkoutWhatsApp = (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validateAddress(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    const name = form.fullName.trim();
    const phone = form.phone.trim().replace(/\s/g, "");
    const street = form.street.trim();
    const city = form.city.trim();
    const state = form.state.trim();
    const pin = form.pinCode.trim();
    const orderLines = formatOrderLines();

    const msg = encodeURIComponent(
      ` *New CozyMix Order -->*\n\n` +
        ` ${name} |  ${phone}\n` +
        ` ${orderLines}\n\n` +
        ` Total: ₹${total}\n\n` +
        ` Address: ${street}, ${city}, ${state} – ${pin}`,
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
            const itemKey = cartItemKey(item.productId, item.sizeId);
            return (
              <div key={itemKey} className="flex justify-between text-sm gap-4">
                <span className="text-muted-foreground">
                  {formatCartItemDisplay(product, item.sizeId, item.quantity)}
                </span>
                <span className="font-serif text-gold shrink-0">₹{getItemLineTotal(item)}</span>
              </div>
            );
          })}
          <div className="border-t border-border pt-4 flex justify-between">
            <span className="tracking-luxury text-gold">Total</span>
            <span className="font-serif text-2xl text-gold">₹{total}</span>
          </div>
        </div>

        <form onSubmit={checkoutWhatsApp} className="space-y-6 mb-8">
          <div>
            <h2 className="font-serif text-2xl mb-1">Delivery details</h2>
            <p className="text-muted-foreground text-sm">
              We&apos;ll include this address in your WhatsApp order.
            </p>
          </div>

          <div className="space-y-2">
            <Label htmlFor="full-name" className="tracking-luxury text-xs text-muted-foreground">
              Full Name
            </Label>
            <Input
              id="full-name"
              value={form.fullName}
              onChange={(e) => updateField("fullName", e.target.value)}
              autoComplete="name"
              className="border-border bg-background"
            />
            {errors.fullName && <p className="text-sm text-destructive">{errors.fullName}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="tracking-luxury text-xs text-muted-foreground">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              inputMode="numeric"
              value={form.phone}
              onChange={(e) => updateField("phone", e.target.value)}
              autoComplete="tel"
              placeholder="10-digit mobile number"
              className="border-border bg-background"
            />
            {errors.phone && <p className="text-sm text-destructive">{errors.phone}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="street" className="tracking-luxury text-xs text-muted-foreground">
              Street Address
            </Label>
            <Input
              id="street"
              value={form.street}
              onChange={(e) => updateField("street", e.target.value)}
              autoComplete="street-address"
              className="border-border bg-background"
            />
            {errors.street && <p className="text-sm text-destructive">{errors.street}</p>}
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="city" className="tracking-luxury text-xs text-muted-foreground">
                City
              </Label>
              <Input
                id="city"
                value={form.city}
                onChange={(e) => updateField("city", e.target.value)}
                autoComplete="address-level2"
                className="border-border bg-background"
              />
              {errors.city && <p className="text-sm text-destructive">{errors.city}</p>}
            </div>

            <div className="space-y-2">
              <Label htmlFor="state" className="tracking-luxury text-xs text-muted-foreground">
                State
              </Label>
              <Input
                id="state"
                value={form.state}
                onChange={(e) => updateField("state", e.target.value)}
                autoComplete="address-level1"
                className="border-border bg-background"
              />
              {errors.state && <p className="text-sm text-destructive">{errors.state}</p>}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="pin-code" className="tracking-luxury text-xs text-muted-foreground">
              PIN Code
            </Label>
            <Input
              id="pin-code"
              inputMode="numeric"
              value={form.pinCode}
              onChange={(e) => updateField("pinCode", e.target.value)}
              autoComplete="postal-code"
              placeholder="6-digit PIN"
              maxLength={6}
              className="border-border bg-background"
            />
            {errors.pinCode && <p className="text-sm text-destructive">{errors.pinCode}</p>}
          </div>

          <p className="text-muted-foreground text-sm leading-relaxed">
            Orders are fulfilled via WhatsApp. Tap below to send your order — we&apos;ll confirm
            delivery and payment details.
          </p>

          <button
            type="submit"
            className="w-full tracking-luxury bg-gold text-primary-foreground py-5 hover:opacity-90 transition-all"
          >
            Continue on WhatsApp · ₹{total}
          </button>
        </form>

        <Link
          to="/cart"
          className="block text-center tracking-luxury text-gold border-b border-gold pb-1 w-fit mx-auto"
        >
          Back to cart
        </Link>
      </section>
    </SiteLayout>
  );
}
