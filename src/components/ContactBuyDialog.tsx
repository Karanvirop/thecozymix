import { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useCart } from "@/context/CartContext";

const CONTACT_EMAIL = "hello@cozymix.com";

type ContactBuyDialogProps = {
  trigger: React.ReactNode;
};

export function ContactBuyDialog({ trigger }: ContactBuyDialogProps) {
  const { formatCartSummary, total, items } = useCart();
  const [open, setOpen] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");

  const defaultMessage =
    items.length > 0
      ? `Hello CozyMix,\n\nI'd like to purchase the following:\n\n${formatCartSummary()}\n\nEstimated total: ₹${total}\n\nPlease let me know how to proceed.`
      : "Hello CozyMix,\n\nI'd like to inquire about your products.";

  const [message, setMessage] = useState(defaultMessage);

  useEffect(() => {
    if (open) setMessage(defaultMessage);
  }, [open, defaultMessage]);

  const handleOpenChange = (next: boolean) => {
    setOpen(next);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent("CozyMix — Cart inquiry");
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`;
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md border-border bg-card">
        <DialogHeader>
          <DialogTitle className="font-serif text-2xl">Contact to Buy</DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Share your details and we&apos;ll reply with next steps.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 mt-2">
          <div className="space-y-2">
            <Label htmlFor="contact-name" className="tracking-luxury text-xs text-muted-foreground">
              Name
            </Label>
            <Input
              id="contact-name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="border-border bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-email" className="tracking-luxury text-xs text-muted-foreground">
              Email
            </Label>
            <Input
              id="contact-email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="border-border bg-background"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="contact-message" className="tracking-luxury text-xs text-muted-foreground">
              Message
            </Label>
            <Textarea
              id="contact-message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              rows={6}
              className="border-border bg-background resize-none"
            />
          </div>
          <button
            type="submit"
            className="w-full tracking-luxury border border-gold text-gold py-4 hover:bg-gold hover:text-primary-foreground transition-all"
          >
            Send
          </button>
        </form>
      </DialogContent>
    </Dialog>
  );
}
