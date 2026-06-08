import { createFileRoute, Link } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import { ProductCard } from "@/components/ProductCard";
import { PRODUCTS } from "@/lib/products";
import hero from "@/assets/hero-bottle.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "CozyMix — Restorative Shampoo for Luxurious Hair" },
      {
        name: "description",
        content:
          "CozyMix Restorative Shampoo: a moody, botanical ritual crafted for salon-grade restoration. 250ml of slow-poured indulgence.",
      },
      { property: "og:title", content: "CozyMix — Restorative Shampoo" },
      {
        property: "og:description",
        content: "Salon-grade restoration in a matte black bottle. 250ml.",
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteLayout>
      <section className="relative min-h-[calc(100vh-5rem)] grid md:grid-cols-2 items-center overflow-hidden">
        <div className="px-6 md:px-16 py-16 md:py-0 z-10 order-2 md:order-1">
          <div className="tracking-luxury text-gold mb-6">The Ritual · No. 01</div>
          <h1 className="font-serif text-5xl md:text-7xl leading-[1.05] text-foreground">
            A quiet kind of <em className="text-gold">restoration</em>.
          </h1>
          <p className="mt-8 text-muted-foreground max-w-md leading-relaxed">
            Slow-poured in small batches. Pressed from rare botanicals, gold-bottled,
            and built for the kind of hair that remembers being cared for.
          </p>
          <div className="mt-10 flex items-center gap-6">
            <Link
              to="/shop"
              className="tracking-luxury bg-gold text-primary-foreground px-8 py-4 hover:opacity-90 transition-all"
            >
              Buy Now
            </Link>
            <Link to="/ingredients" className="tracking-luxury text-gold border-b border-gold pb-1">
              The Botanicals
            </Link>
          </div>

          <div className="mt-16 flex gap-12 text-xs tracking-luxury text-muted-foreground">
            <div><div className="text-gold text-2xl font-serif normal-case tracking-normal"></div></div>
            <div><div className="text-gold text-2xl font-serif normal-case tracking-normal"></div></div>
            <div><div className="text-gold text-2xl font-serif normal-case tracking-normal"></div></div>
          </div>
        </div>

        <div className="relative aspect-[4/5] w-full max-h-[80vh] order-1 md:order-2">
          <div className="absolute inset-0 bg-gradient-to-l from-transparent via-transparent to-background z-10 hidden md:block" />
          <img
            src={hero}
            alt="CozyMix Restorative Shampoo bottle in matte black with gold label"
            className="w-full h-full object-contain"
            width={1280}
            height={1600}
          />
          <div className="absolute bottom-8 right-8 text-right z-20">
            <div className="tracking-luxury text-gold/80"></div>
            <div className="font-serif italic text-foreground/80 text-sm mt-1">Restorative Shampoo</div>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-6 md:px-12 py-24 md:py-32">
        <div className="text-center mb-16">
          <div className="tracking-luxury text-gold mb-4">Featured</div>
          <h2 className="font-serif text-4xl md:text-5xl">The Collection</h2>
        </div>
        <div className="max-w-sm mx-auto md:max-w-md">
          <ProductCard product={PRODUCTS["restorative-shampoo"]} />
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 py-32 text-center">
        <div className="tracking-luxury text-gold mb-6">Our Promise</div>
        <p className="font-serif text-3xl md:text-4xl leading-relaxed text-foreground/90 italic">
          “Where hair is treated as heirloom — washed in rosemary, sealed in argan,
          finished with the patience of a candlelit salon.”
        </p>
      </section>
    </SiteLayout>
  );
}
