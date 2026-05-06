import { createFileRoute } from "@tanstack/react-router";
import { SiteLayout } from "@/components/SiteLayout";
import img from "@/assets/ingredients.jpg";

export const Route = createFileRoute("/ingredients")({
  head: () => ({
    meta: [
      { title: "Ingredients — CozyMix Botanical Formula" },
      { name: "description", content: "Discover the organic botanicals behind CozyMix Restorative Shampoo: argan, rosemary, raw honey, lavender, shea." },
      { property: "og:title", content: "The Botanicals · CozyMix" },
    ],
  }),
  component: Ingredients,
});

const list = [
  { n: "01", name: "Moroccan Argan Oil", note: "Cold-pressed from wild argan groves. Seals split ends with lipid-rich gold." },
  { n: "02", name: "Mountain Rosemary", note: "Steam-distilled to wake the scalp and quiet the noise of the day." },
  { n: "03", name: "Raw Wildflower Honey", note: "A natural humectant that draws moisture deep into the cuticle." },
  { n: "04", name: "French Lavender", note: "A whisper of calm. Slow-grown in Provence, hand-bundled, sun-dried." },
  { n: "05", name: "Unrefined Shea Butter", note: "Hand-churned from West African shea nuts. Velvet for the strand." },
  { n: "06", name: "Black Sesame Extract", note: "Mineral-dense. Restores pigment depth and quiet vitality." },
];

function Ingredients() {
  return (
    <SiteLayout>
      <section className="relative h-[60vh] min-h-[400px] overflow-hidden">
        <img src={img} alt="Botanical ingredients on charcoal stone" className="w-full h-full object-cover" width={1920} height={1080} />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/60" />
        <div className="absolute inset-0 flex items-center justify-center text-center px-6">
          <div>
            <div className="tracking-luxury text-gold mb-4">The Apothecary</div>
            <h1 className="font-serif text-5xl md:text-7xl">Six Botanicals.<br /><em className="text-gold">One Ritual.</em></h1>
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
