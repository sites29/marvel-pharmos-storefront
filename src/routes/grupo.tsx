import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowLeft, BadgePercent, ChevronRight, Users } from "lucide-react";
import type { CSSProperties } from "react";
import { Button } from "@/components/ui/button";
import { categories, categoryLabels, products, type Product } from "@/data/products";
import {
  WhatsAppIcon,
  formatCurrency,
  getProductVisual,
  peptidePresentation,
} from "./index";

export const Route = createFileRoute("/grupo")({
  head: () => ({
    meta: [
      { title: "Marvel Pharms | Grupo do WhatsApp com desconto" },
      {
        name: "description",
        content:
          "Entre no grupo oficial da Marvel Pharms no WhatsApp e garanta desconto em todos os produtos do catálogo: peptídeos, emagrecedores e mais.",
      },
      { property: "og:title", content: "Marvel Pharms | Desconto completo no grupo do WhatsApp" },
      {
        property: "og:description",
        content:
          "Prévia do catálogo Marvel Pharms. Entre no grupo oficial do WhatsApp e garanta desconto em todos os produtos.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: GrupoPage,
});

const WHATSAPP_GROUP_URL = "https://chat.whatsapp.com/GCwv96SWRddDxqIS9xbv7b?s=sh&p=a&iam=2";

const productsByCategory = categories
  .map((category) => ({
    category,
    items: products.filter((product) => product.category === category.id),
  }))
  .filter((group) => group.items.length > 0);

function GrupoProductCard({ product }: { product: Product }) {
  const soldOut = product.price === null;
  const visual = getProductVisual(product);
  const presentation = visual ? peptidePresentation(product.name) : undefined;
  const visualVariation =
    product.name.split("").reduce((total, character) => total + character.charCodeAt(0), 0) % 3;
  const visualBrand = product.brand.toLocaleLowerCase("pt-BR").replace(/\s+/g, "-");
  return (
    <article className={`product-card ${visual ? "has-image" : ""}`}>
      {visual && presentation && (
        <div
          className={`product-visual ${visual.isReal ? "is-real" : "is-pending"} ${visual.isIllustrativeVial ? "is-illustrative-vial" : ""} visual-${visualBrand} presentation-${presentation.kind} variation-${visualVariation}`}
          style={{ "--visual-accent": visual.accent } as CSSProperties}
        >
          <div className="product-visual-badges">
            <span>{product.brand}</span>
            <em>
              {visual.isReal
                ? "Foto oficial"
                : visual.isReference
                  ? "Imagem de referência"
                  : "Imagem ilustrativa"}
            </em>
          </div>
          <img
            className="product-packshot"
            src={visual.image}
            alt={`${product.name} — linha ${product.brand}`}
          />
        </div>
      )}
      <div className="product-card-body">
        <div className="product-topline">
          <span>{product.brand}</span>
          <i aria-hidden="true" />
        </div>
        <h3>{product.name}</h3>
        <div className="product-footer">
          <div className={soldOut ? "sold-out" : "price"}>
            {soldOut ? (
              "Esgotado"
            ) : (
              <>
                <small>Valor</small>
                <strong>{formatCurrency(product.price ?? 0)}</strong>
              </>
            )}
          </div>
          <span className="grupo-card-badge">
            <BadgePercent /> Desconto no grupo
          </span>
        </div>
      </div>
    </article>
  );
}

function GrupoPage() {
  return (
    <div className="site-shell" id="inicio">
      <header className="site-header">
        <div className="container header-inner">
          <div className="header-brand">
            <Link className="brand" to="/" aria-label="Marvel Pharms - catálogo">
              <img src="/images/marvel-pharms-logo-transparent.png" alt="Marvel Pharms" />
            </Link>
            <span className="header-edition" aria-hidden="true">
              GRUPO
              <br />
              OFICIAL
            </span>
          </div>
          <nav className="header-links" aria-label="Navegação principal">
            <Link to="/">Catálogo</Link>
            <Link to="/grupo" activeProps={{ "aria-current": "location" }}>
              Grupo
            </Link>
          </nav>
          <div className="header-actions">
            <a
              className="header-whatsapp"
              href={WHATSAPP_GROUP_URL}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Entrar no grupo do WhatsApp da Marvel Pharms"
            >
              <WhatsAppIcon /> <span>Entrar no grupo</span>
            </a>
          </div>
        </div>
      </header>

      <main>
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
                <strong>todos os produtos</strong>: peptídeos, emagrecedores e todas as marcas do
                catálogo. A prévia completa está logo abaixo — o valor final com desconto você
                garante dentro do grupo.
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
                <Link className="text-link" to="/">
                  Ver catálogo completo <ChevronRight />
                </Link>
              </div>
              <ul className="grupo-perks">
                <li>
                  <BadgePercent /> Desconto em todos os produtos
                </li>
                <li>
                  <Users /> Ofertas e novidades em primeira mão
                </li>
                <li>
                  <WhatsAppIcon /> Atendimento direto com a equipe
                </li>
              </ul>
            </div>
          </div>
        </section>

        <section className="products-section grupo-preview" aria-labelledby="grupo-preview-title">
          <div className="container">
            <div className="products-heading">
              <div>
                <span>PRÉVIA DO CATÁLOGO — {products.length} PRODUTOS</span>
                <h2 id="grupo-preview-title">
                  Tudo isso com <strong className="grupo-accent">desconto no grupo.</strong>
                </h2>
              </div>
              <strong>Valores de catálogo; o desconto é aplicado no grupo do WhatsApp.</strong>
            </div>
            {productsByCategory.map((group) => (
              <div className="grupo-category-block" key={group.category.id}>
                <div className="grupo-category-heading">
                  <h3>{categoryLabels[group.category.id]}</h3>
                  <span>{group.items.length} produtos</span>
                </div>
                <div className="product-grid">
                  {group.items.map((product) => (
                    <GrupoProductCard key={product.id} product={product} />
                  ))}
                </div>
              </div>
            ))}
            <div className="grupo-final-cta">
              <p>
                Gostou de algum produto? Entre no grupo e garanta o desconto em todos os itens do
                catálogo.
              </p>
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
        </section>
      </main>

      <footer className="grupo-footer">
        <div className="container grupo-footer-inner">
          <Link to="/" className="text-link">
            <ArrowLeft /> Voltar ao catálogo
          </Link>
          <p>
            Catálogo informativo. Preços e disponibilidade podem mudar. O desconto é informado no
            grupo oficial do WhatsApp. Consulte as exigências de prescrição e procure orientação de
            um profissional de saúde.
          </p>
        </div>
      </footer>
    </div>
  );
}
