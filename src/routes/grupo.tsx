import { createFileRoute } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { WhatsAppIcon } from "./index";

export const Route = createFileRoute("/grupo")({
  head: () => ({
    meta: [
      { title: "Marvel Pharms | Grupo do WhatsApp com desconto" },
      {
        name: "description",
        content:
          "Entre no grupo oficial da Marvel Pharms no WhatsApp e garanta desconto em todos os produtos do catálogo.",
      },
      { property: "og:title", content: "Marvel Pharms | Desconto completo no grupo do WhatsApp" },
      {
        property: "og:description",
        content:
          "Entre no grupo oficial do WhatsApp da Marvel Pharms e garanta desconto em todos os produtos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GrupoPage,
});

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/GCwv96SWRddDxqIS9xbv7b?s=sh&p=a&iam=2";

function GrupoPage() {
  return (
    <div className="site-shell grupo-minimal">
      <main className="grupo-minimal-main">
        <section className="grupo-hero" aria-labelledby="grupo-title">
          <div className="container grupo-hero-layout">
            <div className="grupo-hero-badge">
              <img
                src="/images/marvel-pharms-logo-transparent.png"
                alt="Logo Marvel Pharms"
              />
            </div>
            <div className="grupo-hero-copy">
              <div className="eyebrow">
                <span /> MARVEL PHARMS — GRUPO OFICIAL NO WHATSAPP
              </div>
              <h1 id="grupo-title">
                O desconto <span>completo</span> está no grupo.
              </h1>
              <p>
                Entre no grupo oficial da Marvel Pharms e receba desconto em{" "}
                <strong>todos os produtos</strong> do catálogo.
              </p>
              <div className="grupo-hero-actions">
                <Button size="lg" className="grupo-cta" asChild>
                  <a
                    href={WHATSAPP_GROUP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Entrar no grupo do WhatsApp da Marvel Pharms"
                  >
                    <WhatsAppIcon /> Entrar no grupo do WhatsApp
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
