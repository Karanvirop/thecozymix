import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import img from "@/assets/ingredients.jpg";

export const Route = createFileRoute("/ingredients")({
  head: () => ({
    meta: [
      { title: "Ingredients — CozyMix Botanical Formula" },
      { name: "description", content: "Discover the organic botanicals behind CozyMix Restorative Shampoo: Shikakai · Amla · Reetha · Rosemary · Bhringraj · Methi Dana Flaxseed · Brahmi · Rose Petals · Hibiscus · Aloe Vera · Vitamin E · Glycerine" },
      { property: "og:title", content: "The Botanicals · CozyMix" },
    ],
  }),
  component: Ingredients,
});

const list = [
  { n: "01", name: "Shikakai", note: "A gentle natural cleanser that supports scalp health." },
  { n: "02", name: "Amla", note: "Rich in vitamin C; strengthens and adds shine." },
  { n: "03", name: "Reetha", note: "Soapnut extract for a soft, natural lather." },
  { n: "04", name: "Rosemary", note: "Stimulates the scalp and supports healthy growth." },
  { n: "05", name: "Bhringraj", note: "Traditional herb for hair vitality and thickness." },
  { n: "06", name: "Methi Dana", note: "Fenugreek seeds that nourish and soften hair." },
  { n: "07", name: "Flaxseed", note: "Omega-rich moisture for dry, brittle strands." },
  { n: "08", name: "Brahmi", note: "Calms the scalp and supports root strength." },
  { n: "09", name: "Rose Petals", note: "Adds a delicate floral note and gentle conditioning." },
  { n: "10", name: "Hibiscus", note: "Helps maintain natural color and softness." },
  { n: "11", name: "Aloe Vera", note: "Soothes and hydrates the scalp and hair." },
  { n: "12", name: "Vitamin E", note: "Antioxidant protection for healthier-looking hair." },
  { n: "13", name: "Glycerine", note: "Draws moisture in and helps prevent dryness." },
];

function Ingredients() {
  return (
    <SiteLayout>
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={img} alt="Dried herbs and rose petals in a glass bowl" className="w-full h-full object-cover" width={1920} height={1280} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/80" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <div className="tracking-luxury text-gold mb-4">The Apothecary</div>
            <h1 className="font-serif text-5xl md:text-7xl">13 Botanicals.<br /><em className="text-gold">One Ritual.</em></h1>
          </div>
        </div>
      </section>

      <section className="max-w-5xl mx-auto px-6 md:px-12 py-24">
        <p className="font-serif text-2xl md:text-3xl text-center italic text-foreground/80 leading-relaxed mb-20">
          Every bottle is a slow conversation between earth and craft —
          ingredients foraged, pressed, and folded together by hand.
        </p>

        <div className="grid md:grid-cols-2 gap-x-16 gap-y-14">
          {list.map((i) => (
            <div key={i.n} className="border-t border-border pt-6 group">
              <div className="flex items-baseline justify-between mb-3">
                <span className="font-serif text-3xl text-gold">{i.n}</span>
                <span className="tracking-luxury text-muted-foreground">Botanical</span>
              </div>
              <h3 className="font-serif text-2xl mb-3 group-hover:text-gold transition-colors">{i.name}</h3>
              <p className="text-muted-foreground leading-relaxed">{i.note}</p>
            </div>
          ))}
        </div>
      </section>
    </SiteLayout>
  );
}
