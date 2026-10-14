import { createFileRoute } from '@tanstack/react-router';
import { useMemo, useRef, useState, type CSSProperties } from 'react';
import { ArrowLeft, ArrowRight, Check, ChevronRight, MessageCircle, Search, ShieldCheck, Sparkles, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { categories, categoryLabels, products, type Category, type Product } from '@/data/products';

export const Route = createFileRoute('/')({
  head: () => ({
    meta: [
      { title: 'Marvel Pharms | Catálogo por categorias' },
      { name: 'description', content: 'Explore o catálogo Marvel Pharms por categorias e consulte produtos, preços e disponibilidade diretamente pelo WhatsApp.' },
      { property: 'og:title', content: 'Marvel Pharms | Ciência, performance e resultados' },
      { property: 'og:description', content: 'Escolha uma categoria e fale com a Marvel Pharms pelo WhatsApp.' },
      { property: 'og:type', content: 'website' },
      { name: 'twitter:card', content: 'summary_large_image' },
    ],
  }),
  component: Storefront,
});

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, '') ?? '';

const categoryDescriptions: Record<Category, string> = {
  peptideos: 'Protocolos e compostos selecionados',
  emagrecedores: 'Linhas voltadas ao controle de peso',
  'lander-lan': 'Linha completa Lander Lan',
  'lander-lan-gold': 'Seleção premium Lander Gold',
  muscle: 'Catálogo completo Muscle',
  king: 'Produtos da linha King',
  bratva: 'Linha completa Bratva',
  pharmacon: 'Catálogo completo Pharmacon',
  cooper: 'Produtos da linha Cooper',
  oxygen: 'Catálogo completo Oxygen',
  canada: 'Seleção da linha Canadá',
  zphc: 'Produtos da linha ZPHC',
  eminence: 'Catálogo completo Eminence',
  alpha: 'Produtos da linha Alpha',
  variados: 'Acessórios e produtos diversos',
};

const featuredProducts = [
  {
    product: products.find((product) => product.category === 'lander-lan' && product.name === 'GH Lander 100UI')!,
    image: '/images/products/landertropin-100ui-transparent.png',
    label: 'Destaque da linha',
    source: 'Landerlan',
  },
  {
    product: products.find((product) => product.category === 'lander-lan' && product.name === 'Testenat 4ML')!,
    image: '/images/products/testenat-4ml-transparent.png',
    label: 'Mais procurado',
    source: 'Landerlan',
  },
  {
    product: products.find((product) => product.category === 'lander-lan' && product.name === 'Decaland 5ML')!,
    image: '/images/products/decaland-5ml-transparent.png',
    label: 'Seleção Marvel',
    source: 'Landerlan',
  },
  {
    product: products.find((product) => product.category === 'lander-lan-gold' && product.name === 'HCG 5000UI')!,
    image: '/images/products/hcg-5000ui-transparent.png',
    label: 'Lander Gold',
    source: 'Landerlan Gold',
  },
];

const peptideVisuals: Record<string, { image: string; accent: string }> = {
  'USA Importados': { image: '/images/products/peptides/cutouts/usa-importados.png', accent: '#2f87d7' },
  Core: { image: '/images/products/peptides/cutouts/core.png', accent: '#d2a54f' },
  Oxygen: { image: '/images/products/peptides/cutouts/oxygen.png', accent: '#416fe7' },
  Neopep: { image: '/images/products/peptides/cutouts/neopep.png', accent: '#24c1d5' },
  Alluvi: { image: '/images/products/peptides/cutouts/alluvi.png', accent: '#f25c9c' },
  World: { image: '/images/products/peptides/cutouts/world.png', accent: '#d7d8dc' },
  'Med Plus': { image: '/images/products/peptides/cutouts/med-plus.png', accent: '#ef3434' },
};

const realPeptideImages: Record<string, string> = {
  'Core|GHK-CU 50MG': '/images/products/peptides/real/core-ghk-cu-50-transparent.png',
  'Core|BPC-157 + TB-500': '/images/products/peptides/real/core-bpc-tb.png',
  'Core|BPC-157 5MG': '/images/products/peptides/real/core-bpc-157-transparent.png',
  'Core|TB-500 5MG': '/images/products/peptides/real/core-tb-500-transparent.png',
  'Core|Tesamorelin': '/images/products/peptides/real/core-tesamorelin-transparent.png',
  'Oxygen|GHK-CU 50MG': '/images/products/peptides/real/oxygen-ghk-cu-50-transparent.png',
  'Oxygen|GHK-CU 100MG': '/images/products/peptides/real/oxygen-ghk-cu-100-transparent.png',
  'Oxygen|KPV': '/images/products/peptides/real/oxygen-kpv-transparent.png',
  'Oxygen|MOTS-C': '/images/products/peptides/real/oxygen-mots-c-transparent.png',
  'Oxygen|Epithalon': '/images/products/peptides/real/oxygen-epithalon-transparent.png',
  'Oxygen|GLOW': '/images/products/peptides/real/oxygen-glow-transparent.png',
  'Oxygen|PT-141': '/images/products/peptides/real/oxygen-pt-141-transparent.png',
  'Oxygen|TB-500 + BPC-157': '/images/products/peptides/real/oxygen-tb-bpc-transparent.png',
  'Oxygen|NAD+ + Vitamina B12': '/images/products/peptides/real/oxygen-nad-b12-transparent.png',
  'Oxygen|Semax 10MG': '/images/products/peptides/real/oxygen-semax-transparent.png',
  'Oxygen|Selank 10MG': '/images/products/peptides/real/oxygen-selank-transparent.png',
  'Alluvi|GLOW caneta': '/images/products/peptides/real/alluvi-glow-caneta-transparent.png',
  'World|Semax 10MG': '/images/products/peptides/real/world-semax-10-transparent.png',
  'World|NAD+ 500MG': '/images/products/peptides/real/world-nad-500-transparent.png',
  'World|PT-141 10MG': '/images/products/peptides/real/world-pt-141-transparent.png',
  'Med Plus|MOTS-C caixa': '/images/products/peptides/real/medplus-mots-c-transparent.png',
  'Med Plus|MOTS-C bujão': '/images/products/peptides/real/medplus-mots-c-transparent.png',
  'Med Plus|BPC-157 caixa': '/images/products/peptides/real/medplus-bpc-157-transparent.png',
  'Med Plus|BPC-157 bujão': '/images/products/peptides/real/medplus-bpc-157-transparent.png',
  'Med Plus|TB-500 caixa': '/images/products/peptides/real/medplus-tb-500-transparent.png',
  'Med Plus|TB-500 bujão': '/images/products/peptides/real/medplus-tb-500-transparent.png',
  'Med Plus|Ipamorelin caixa': '/images/products/peptides/real/medplus-ipamorelin-transparent.png',
  'Med Plus|Ipamorelin bujão': '/images/products/peptides/real/medplus-ipamorelin-transparent.png',
  'Med Plus|AOD-9406 caixa': '/images/products/peptides/real/medplus-aod-9604-transparent.png',
  'Med Plus|AOD-9406 bujão': '/images/products/peptides/real/medplus-aod-9604-transparent.png',
  'Med Plus|Tesamorelin caixa': '/images/products/peptides/real/medplus-tesamorelin-transparent.png',
  'Med Plus|Tesamorelin bujão': '/images/products/peptides/real/medplus-tesamorelin-transparent.png',
  'Med Plus|KPV caixa': '/images/products/peptides/real/medplus-kpv-transparent.png',
  'Med Plus|KPV bujão': '/images/products/peptides/real/medplus-kpv-transparent.png',
  'Med Plus|Sermorelin caixa': '/images/products/peptides/real/medplus-sermorelin-transparent.png',
  'Med Plus|Sermorelin bujão': '/images/products/peptides/real/medplus-sermorelin-transparent.png',
};

const weightLossVisuals: Record<string, { image: string; accent: string; isReal: boolean }> = {
  'Semaglix (Ozempic importado)': { image: '/images/products/weight-loss/real/semaglix-transparent.png', accent: '#244a9b', isReal: true },
  Ozempic: { image: '/images/products/weight-loss/real/zphc-semaglutide-transparent.png', accent: '#416fe7', isReal: true },
  TG: { image: '/images/products/weight-loss/real/tg-5mg-transparent.png', accent: '#9f7a14', isReal: true },
  'Lipoless bujão único': { image: '/images/products/weight-loss/real/lipoless-single-transparent.png', accent: '#f28a18', isReal: true },
  'Lipoless caixa com 4 bujões': { image: '/images/products/weight-loss/real/lipoless-box-transparent.png', accent: '#f28a18', isReal: true },
  'Mounjaro 30MG': { image: '/images/products/peptides/cutouts/core.png', accent: '#8f49a9', isReal: false },
  'Mounjaro 60MG': { image: '/images/products/peptides/cutouts/world.png', accent: '#8f49a9', isReal: false },
  'Tirzec bujão': { image: '/images/products/weight-loss/real/tirzec-vial-transparent.png', accent: '#c89a13', isReal: true },
  'Tirzec 2,5MG bujão com 4 seringas': { image: '/images/products/weight-loss/real/tirzec-syringes-transparent.png', accent: '#c89a13', isReal: true },
  'Tirzepatida 60MG bujão único': { image: '/images/products/peptides/cutouts/oxygen.png', accent: '#416fe7', isReal: false },
  'Tirzepatida 60MG caixa com 4 bujões': { image: '/images/products/peptides/cutouts/oxygen.png', accent: '#416fe7', isReal: false },
  'Tirzepatida caneta 60MG': { image: '/images/products/peptides/cutouts/oxygen.png', accent: '#416fe7', isReal: false },
  'Tirzepatida 50MG': { image: '/images/products/weight-loss/real/zphc-tirze-50-transparent.png', accent: '#416fe7', isReal: true },
  'Retatrutida 60MG caixa com 5 bujões': { image: '/images/products/weight-loss/real/zphc-reta-60-transparent.png', accent: '#416fe7', isReal: true },
  'Retatrutida 60MG caixa com 2 bujões': { image: '/images/products/weight-loss/real/zphc-reta-60-transparent.png', accent: '#416fe7', isReal: false },
  'Retatrutida 120MG caixa com 2 bujões': { image: '/images/products/peptides/cutouts/world.png', accent: '#416fe7', isReal: false },
  'Retatrutida 120MG caixa com 5 bujões': { image: '/images/products/peptides/cutouts/world.png', accent: '#416fe7', isReal: false },
  'Retatrutida 40MG caixa com 4 bujões': { image: '/images/products/peptides/cutouts/oxygen.png', accent: '#416fe7', isReal: false },
  'Retatrutida 40MG caneta': { image: '/images/products/peptides/cutouts/oxygen.png', accent: '#416fe7', isReal: false },
  'Retatrutida 30MG': { image: '/images/products/peptides/cutouts/world.png', accent: '#d7d8dc', isReal: false },
  'Retatrutida 60MG': { image: '/images/products/peptides/cutouts/world.png', accent: '#d7d8dc', isReal: false },
};

const weightLossBrandOverrides: Record<string, { image: string; accent: string; isReal: boolean }> = {
  'Synetica|Retatrutida 40MG caneta': { image: '/images/products/weight-loss/real/synedica-reta-40-transparent.png', accent: '#65b687', isReal: false },
  'USA Importados|Retatrutida 40MG': { image: '/images/products/peptides/cutouts/usa-importados.png', accent: '#2f87d7', isReal: false },
  'USA Importados|Retatrutida 60MG': { image: '/images/products/peptides/cutouts/core.png', accent: '#2f87d7', isReal: false },
};

const landerLanVisuals: Record<string, { image: string; accent: string; isReal: boolean }> = {
  'Proviron 10MG - 20 comprimidos': { image: '/images/products/peptides/cutouts/world.png', accent: '#d2a54f', isReal: false },
  'Masteron comprimidos': { image: '/images/products/lander-lan/real/masteron-comprimidos-transparent.png', accent: '#d2a54f', isReal: true },
  Dianabol: { image: '/images/products/lander-lan/real/dianabol-transparent.png', accent: '#d2a54f', isReal: true },
  'Decaland 5ML': { image: '/images/products/lander-lan/real/decaland-5ml-transparent.png', accent: '#d2a54f', isReal: true },
  'Duraland 1ML': { image: '/images/products/lander-lan/real/duraland-1ml-transparent.png', accent: '#d2a54f', isReal: true },
  'GH Lander 100UI': { image: '/images/products/lander-lan/real/gh-lander-100ui-transparent.png', accent: '#d2a54f', isReal: true },
  Hemogenin: { image: '/images/products/peptides/cutouts/core.png', accent: '#d2a54f', isReal: false },
  'Oxandrolona 5MG': { image: '/images/products/lander-lan/real/oxandrolona-5mg-transparent.png', accent: '#d2a54f', isReal: true },
  'Oxandrolona 10MG': { image: '/images/products/lander-lan/real/oxandrolona-10mg-transparent.png', accent: '#d2a54f', isReal: true },
  'Stan 15ML': { image: '/images/products/lander-lan/real/stan-15ml-transparent.png', accent: '#d2a54f', isReal: true },
  'Stan 30ML': { image: '/images/products/lander-lan/real/stan-30ml-transparent.png', accent: '#d2a54f', isReal: true },
  'Stan comprimido': { image: '/images/products/lander-lan/real/stan-comprimido-transparent.png', accent: '#d2a54f', isReal: true },
  'Testoland 6ML - 3 ampolas': { image: '/images/products/peptides/cutouts/usa-importados.png', accent: '#d2a54f', isReal: false },
  'Testenat 4ML': { image: '/images/products/lander-lan/real/testenat-4ml-transparent.png', accent: '#d2a54f', isReal: true },
  'Propionato 10ML': { image: '/images/products/lander-lan/real/propionato-10ml-transparent.png', accent: '#d2a54f', isReal: true },
  'Primabolan injetável 10ML': { image: '/images/products/lander-lan/real/primabolan-injetavel-transparent.png', accent: '#d2a54f', isReal: true },
  'Primabolan comprimidos': { image: '/images/products/lander-lan/real/primabolan-comprimidos-transparent.png', accent: '#d2a54f', isReal: true },
  'Clembuterol 50 comprimidos': { image: '/images/products/lander-lan/real/clembuterol-50-transparent.png', accent: '#d2a54f', isReal: true },
};

function peptidePresentation(name: string) {
  const normalized = name.toLocaleLowerCase('pt-BR');
  if (normalized.includes('caneta')) return { kind: 'pen', label: 'Caneta preenchida' };
  if (normalized.includes('caixa')) return { kind: 'box', label: 'Apresentação em caixa' };
  if (normalized.includes('mamadeira')) return { kind: 'solution', label: 'Solução oral · 30 ml' };
  if (normalized.includes('comprimidos')) return { kind: 'tablets', label: 'Comprimidos' };
  if (normalized.includes('bujão')) return { kind: 'vial', label: 'Frasco individual' };
  return { kind: 'vial', label: 'Peptídeo liofilizado' };
}

const formatCurrency = (value: number) => value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });

function whatsappUrl(product?: Product) {
  const message = product
    ? `Olá! Vim pelo catálogo da Marvel Pharms e gostaria de consultar ${product.name} (${product.brand})${product.price === null ? ', que aparece como esgotado' : `, no valor de ${formatCurrency(product.price)}`}. Pode me ajudar?`
    : 'Olá! Vim pelo site da Marvel Pharms e gostaria de atendimento.';
  const destination = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : 'https://wa.me/';
  return `${destination}?text=${encodeURIComponent(message)}`;
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a className={`brand ${compact ? 'brand-compact' : ''}`} href="#inicio" aria-label="Marvel Pharms - início">
      <img src="/images/marvel-pharms-logo-transparent.png" alt="Marvel Pharms" />
    </a>
  );
}

function ProductCard({ product }: { product: Product }) {
  const soldOut = product.price === null;
  const peptideBase = product.category === 'peptideos' ? peptideVisuals[product.brand] : undefined;
  const realImage = product.category === 'peptideos' ? realPeptideImages[`${product.brand}|${product.name}`] : undefined;
  const visual = product.category === 'emagrecedores'
    ? weightLossBrandOverrides[`${product.brand}|${product.name}`] ?? weightLossVisuals[product.name]
    : product.category === 'lander-lan'
      ? landerLanVisuals[product.name]
    : peptideBase
      ? { ...peptideBase, image: realImage ?? peptideBase.image, isReal: Boolean(realImage) }
      : undefined;
  const presentation = visual ? peptidePresentation(product.name) : undefined;
  const visualVariation = product.name.split('').reduce((total, character) => total + character.charCodeAt(0), 0) % 3;
  const visualBrand = product.brand.toLocaleLowerCase('pt-BR').replace(/\s+/g, '-');
  return (
    <article className={`product-card ${visual ? 'has-image' : ''}`}>
      {visual && presentation && (
        <div className={`product-visual ${visual.isReal ? 'is-real' : 'is-pending'} visual-${visualBrand} presentation-${presentation.kind} variation-${visualVariation}`} style={{ '--visual-accent': visual.accent } as CSSProperties}>
          <div className="product-visual-badges"><span>{product.brand}</span><em>{visual.isReal ? 'Foto oficial' : 'Imagem ilustrativa'}</em></div>
          <img className="product-visual-logo" src="/images/marvel-pharms-monogram.png" alt="" aria-hidden="true" />
          <img className="product-packshot" src={visual.image} alt={visual.isReal ? `${product.name} — embalagem real da linha ${product.brand}` : `${product.name} — imagem ilustrativa da linha ${product.brand}`} />
        </div>
      )}
      <div className="product-card-body">
        <div className="product-topline"><span>{product.brand}</span><i aria-hidden="true" /></div>
        <h3>{product.name}</h3>
        <div className="product-footer">
          <div className={soldOut ? 'sold-out' : 'price'}>
            {soldOut ? 'Esgotado' : <><small>Valor</small><strong>{formatCurrency(product.price)}</strong></>}
          </div>
          <Button asChild className="whatsapp-button" aria-label={`Consultar ${product.name} pelo WhatsApp`}>
            <a href={whatsappUrl(product)} target="_blank" rel="noopener noreferrer"><MessageCircle />{soldOut ? 'Reposição' : 'Consultar'}</a>
          </Button>
        </div>
      </div>
    </article>
  );
}

function FeaturedProductCard({ item, index }: { item: (typeof featuredProducts)[number]; index: number }) {
  const { product } = item;
  return (
    <article className={`featured-card featured-card-${index + 1}`}>
      <div className="featured-image">
        <img src={item.image} alt={`${product.name} — ${item.source}`} />
        <span>{item.label}</span>
        <small>Imagem de referência</small>
      </div>
      <div className="featured-info">
        <div className="featured-brand">{product.brand}</div>
        <h3>{product.name}</h3>
        <div className="featured-buy">
          <div className="featured-price"><span>A partir de</span><strong>{product.price === null ? 'Consulte' : formatCurrency(product.price)}</strong></div>
          <Button asChild aria-label={`Consultar ${product.name} pelo WhatsApp`}>
            <a href={whatsappUrl(product)} target="_blank" rel="noopener noreferrer">Ver produto <ArrowRight /></a>
          </Button>
        </div>
      </div>
    </article>
  );
}

function Storefront() {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const resultsRef = useRef<HTMLElement>(null);
  const normalizedQuery = query.trim().toLocaleLowerCase('pt-BR');

  const counts = useMemo(() => Object.fromEntries(categories.map((category) => [category.id, products.filter((product) => product.category === category.id).length])) as Record<Category, number>, []);
  const visibleProducts = useMemo(() => {
    if (!selectedCategory && !normalizedQuery) return [];
    return products.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const searchable = `${product.name} ${product.brand} ${categoryLabels[product.category]}`.toLocaleLowerCase('pt-BR');
      return matchesCategory && searchable.includes(normalizedQuery);
    });
  }, [selectedCategory, normalizedQuery]);

  const showResults = selectedCategory !== null || normalizedQuery.length > 0;
  const scrollTo = (element: HTMLElement | null) => element?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth', block: 'start' });

  const chooseCategory = (category: Category) => {
    setSelectedCategory(category);
    setQuery('');
    window.setTimeout(() => scrollTo(resultsRef.current), 0);
  };

  const resetCatalog = () => {
    setSelectedCategory(null);
    setQuery('');
    window.setTimeout(() => scrollTo(document.querySelector<HTMLElement>('#categorias')), 0);
  };

  return (
    <div className="site-shell">
      <header className="site-header" id="inicio">
        <div className="container header-inner">
          <Brand compact />
          <nav aria-label="Navegação principal">
            <a href="#categorias">Categorias</a>
            <a className="header-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer"><MessageCircle /> Atendimento</a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow"><span /> Catálogo Marvel Pharms</div>
              <h1>Performance começa com a escolha certa.</h1>
              <p>Navegue pelas categorias, encontre o produto que procura e finalize seu atendimento de forma rápida e personalizada pelo WhatsApp.</p>
              <div className="hero-actions">
                <Button size="lg" onClick={() => scrollTo(document.querySelector<HTMLElement>('#categorias'))}>Explorar categorias <ArrowRight /></Button>
                <a className="text-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Falar com um atendente <ChevronRight /></a>
              </div>
              <div className="hero-trust"><span><Check /> 333 produtos</span><span><Check /> 15 categorias</span><span><Check /> Atendimento direto</span></div>
            </div>
            <div className="hero-visual" aria-label="Marvel Pharms — Ciência, Performance, Resultados">
              <div className="hero-logo-wrap"><img src="/images/marvel-pharms-athlete-hero.png" alt="Atleta em treinamento de alta performance" /></div>
              <div className="hero-stamp"><Sparkles /><span>Ciência<br />Performance<br />Resultados</span></div>
            </div>
          </div>
        </section>

        <div className="signal-strip" aria-label="Informações do catálogo">
          <div className="signal-track">
            <span>333 produtos</span><i />
            <span>15 categorias</span><i />
            <span>Atendimento direto</span><i />
            <span>Consulta de disponibilidade</span><i />
            <span>Pedidos pelo WhatsApp</span><i />
          </div>
        </div>

        <section className="featured-section" aria-labelledby="featured-title">
          <div className="container">
            <div className="featured-heading">
              <div>
                <div className="eyebrow"><span /> Curadoria Marvel</div>
                <h2 id="featured-title">Produtos em destaque</h2>
              </div>
              <p>Uma seleção do catálogo para você começar. Consulte disponibilidade e finalize o atendimento pelo WhatsApp.</p>
            </div>
            <div className="featured-grid">
              {featuredProducts.map((item, index) => <FeaturedProductCard item={item} index={index} key={item.product.id} />)}
            </div>
            <div className="featured-note"><ShieldCheck /> Imagens de referência. Confirme apresentação, disponibilidade e exigência de prescrição com o atendimento.</div>
          </div>
        </section>

        <section className="category-section" id="categorias" aria-labelledby="categories-title">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow"><span /> Navegue do seu jeito</div>
                <h2 id="categories-title">Escolha uma categoria</h2>
                <p>A página inicial fica simples. Os produtos aparecem somente depois da sua escolha.</p>
              </div>
              <label className="search-field">
                <Search aria-hidden="true" />
                <input type="search" aria-label="Buscar produto em todas as categorias" placeholder="Já sabe o nome? Busque aqui" value={query} onChange={(event) => { setQuery(event.target.value); if (event.target.value) setSelectedCategory(null); }} />
                {query && <button type="button" aria-label="Limpar busca" onClick={() => setQuery('')}><X /></button>}
              </label>
            </div>

            <div className="category-grid">
              {categories.map((category, index) => (
                <button type="button" className="category-card" onClick={() => chooseCategory(category.id)} key={category.id}>
                  <div className="category-number">{String(index + 1).padStart(2, '0')}</div>
                  <div className="category-symbol" aria-hidden="true">{category.shortLabel.slice(0, 2).toUpperCase()}</div>
                  <div className="category-copy"><h3>{category.label}</h3><p>{categoryDescriptions[category.id]}</p></div>
                  <div className="category-meta"><span>{counts[category.id]} {counts[category.id] === 1 ? 'produto' : 'produtos'}</span><ArrowRight /></div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {showResults && (
          <section className="products-section" ref={resultsRef} aria-labelledby="products-title">
            <div className="container">
              <div className="products-heading">
                <button type="button" className="back-button" onClick={resetCatalog}><ArrowLeft /> Todas as categorias</button>
                <div><span>{normalizedQuery ? 'Resultado da busca' : 'Categoria selecionada'}</span><h2 id="products-title">{normalizedQuery ? `“${query.trim()}”` : selectedCategory && categoryLabels[selectedCategory]}</h2></div>
                <strong>{visibleProducts.length} {visibleProducts.length === 1 ? 'produto' : 'produtos'}</strong>
              </div>
              {visibleProducts.length ? <div className="product-grid">{visibleProducts.map((product) => <ProductCard product={product} key={product.id} />)}</div> : (
                <div className="empty-state"><Search /><h3>Nenhum produto encontrado</h3><p>Tente outro nome ou volte para escolher uma categoria.</p><Button onClick={resetCatalog}>Ver categorias</Button></div>
              )}
            </div>
          </section>
        )}

        <section className="journey-section" aria-labelledby="journey-title">
          <div className="container journey-layout">
            <div className="journey-heading">
              <div className="eyebrow"><span /> Simples e direto</div>
              <h2 id="journey-title">Seu pedido em três passos.</h2>
            </div>
            <div className="journey-steps">
              <div><strong>01</strong><span>Explore</span><p>Escolha uma categoria ou busque pelo nome.</p></div>
              <div><strong>02</strong><span>Consulte</span><p>Veja o valor e confirme a disponibilidade.</p></div>
              <div><strong>03</strong><span>Converse</span><p>Finalize o atendimento diretamente no WhatsApp.</p></div>
            </div>
          </div>
        </section>

        <section className="service-section">
          <div className="container service-grid">
            <div className="service-mark"><MessageCircle /></div>
            <div><span>Atendimento pessoal</span><h2>Da escolha ao pedido, fale com a gente.</h2></div>
            <p>Consulte disponibilidade, envio e tire suas dúvidas diretamente com nosso atendimento.</p>
            <Button asChild size="lg"><a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">Chamar no WhatsApp <ArrowRight /></a></Button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-main"><Brand /><p>Catálogo informativo. Preços e disponibilidade podem mudar. Consulte as exigências de prescrição e procure orientação de um profissional de saúde.</p><div className="footer-seal"><ShieldCheck /> Atendimento finalizado pelo WhatsApp</div></div>
        <div className="container footer-bottom"><span>© {new Date().getFullYear()} Marvel Pharms</span><span>Ciência · Performance · Resultados</span></div>
      </footer>

      <a className="floating-whatsapp" href={whatsappUrl()} target="_blank" rel="noopener noreferrer" aria-label="Falar com a Marvel Pharms pelo WhatsApp"><MessageCircle /><span>Atendimento</span></a>
    </div>
  );
}
