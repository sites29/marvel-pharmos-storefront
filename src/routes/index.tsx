import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, FlaskConical, Plus, Search, X, Info } from 'lucide-react';
import { Button } from '@/components/ui/button';
import hero from '@/assets/pharmacy-hero.jpg';
import klow from '@/assets/klow.jpg';
import bpc from '@/assets/bpc.jpg';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Marvel Pharmos | Peptídeos' },
    { name: 'description', content: 'Conheça o catálogo da Marvel Pharmos: KLOW 80MG por R$400 e BPC-157 10MG por R$280.' },
    { property: 'og:title', content: 'Marvel Pharmos | Peptídeos' },
    { property: 'og:description', content: 'Explore os peptídeos do catálogo Marvel Pharmos e consulte os valores.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

const products = [
  { id: 'klow', name: 'KLOW', dose: '80MG', price: 400, image: klow },
  { id: 'bpc', name: 'BPC-157', dose: '10MG', price: 280, image: bpc },
];
type Product = typeof products[number];
const currency = (value: number) => value.toLocaleString('pt-BR', { minimumFractionDigits: 2 });

function Brand() {
  return <a href="/" className="brand" aria-label="Marvel Pharmos, início"><span className="brand-icon"><Plus strokeWidth={3} /></span><div><div className="brand-name">MARVEL</div><div className="brand-subtitle">PHARMOS</div></div></a>;
}

function ProductDetails({ product, close }: { product: Product; close: () => void }) {
  const closeRef = useRef<HTMLButtonElement>(null);
  useEffect(() => {
    const previous = document.activeElement;
    closeRef.current?.focus();
    const keydown = (e: KeyboardEvent) => { if (e.key === 'Escape') close(); };
    document.addEventListener('keydown', keydown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.removeEventListener('keydown', keydown); document.body.style.overflow = previousOverflow; if (previous instanceof HTMLElement) previous.focus(); };
  }, [close]);
  return <div className="modal-backdrop" onClick={close}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="product-detail-title" onClick={e => e.stopPropagation()} onKeyDown={e => { if (e.key === 'Tab') { e.preventDefault(); closeRef.current?.focus(); } }}>
    <Button ref={closeRef} variant="ghost" size="icon" className="modal-close" aria-label="Fechar detalhes" onClick={close}><X /></Button>
    <img src={product.image} width={1024} height={1024} alt={`${product.name} ${product.dose}, imagem ilustrativa`} />
    <div className="section-label">Peptídeos</div><h2 id="product-detail-title">{product.name} <span className="dose">{product.dose}</span></h2>
    <div className="price"><small>R$</small>{currency(product.price)}</div>
    <p>Imagem ilustrativa. Consulte um profissional de saúde sobre indicação, utilização e eventuais restrições.</p>
    <p>A compra online ainda não está disponível.</p>
  </div></div>;
}

function Index() {
  const [query, setQuery] = useState('');
  const [selected, setSelected] = useState<Product | null>(null);
  const catalog = useRef<HTMLElement>(null);
  const visible = products.filter(p => `${p.name} ${p.dose} peptídeos`.toLocaleLowerCase('pt-BR').includes(query.trim().toLocaleLowerCase('pt-BR')));
  const scrollCatalog = () => catalog.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  return <>
    <div className="announcement">Marvel Pharmos · Seu cuidado começa aqui.</div>
    <header className="header container"><Brand /><nav className="header-nav" aria-label="Navegação principal"><span>Ciência e cuidado, lado a lado.</span><Button variant="ghost" onClick={scrollCatalog}>Nossos produtos <ArrowUpRight /></Button></nav></header>
    <main>
      <section className="hero"><img className="hero-image" src={hero} alt="Frascos de laboratório em ambiente claro" width={1536} height={1024} fetchPriority="high" /><div className="container hero-content"><div className="eyebrow">Uma nova perspectiva de cuidado</div><h1>Marvel Pharmos<span>Ciência. Cuidado. Você.</span></h1><p>Conheça nossa linha de peptídeos e encontre os produtos do nosso catálogo.</p><Button size="lg" className="hero-cta" onClick={scrollCatalog}>Explorar produtos <ArrowDown /></Button></div></section>
      <section className="container catalog" ref={catalog} aria-labelledby="catalog-title"><div className="catalog-top"><div><div className="section-label">Catálogo Marvel Pharmos</div><h2 id="catalog-title">Nossos peptídeos</h2></div><label className="search"><Search size={17} /><input aria-label="Buscar produtos" placeholder="Buscar um produto..." value={query} onChange={e => setQuery(e.target.value)} />{query && <Button variant="ghost" size="icon" aria-label="Limpar busca" onClick={() => setQuery('')}><X /></Button>}</label></div>
        <div className="catalog-filter"><Button variant="secondary" size="sm"><FlaskConical /> Peptídeos <span>2</span></Button><small aria-live="polite">{visible.length} {visible.length === 1 ? 'produto' : 'produtos'}</small></div>
        <div className="product-grid">{visible.map(product => <article className="product" key={product.id}><div className="product-image"><span className="product-tag">Peptídeo</span><img src={product.image} alt={`Frasco ilustrativo de ${product.name} ${product.dose}`} loading="lazy" width={1024} height={1024} /></div><div className="product-body"><div className="section-label">Marvel Pharmos</div><div className="product-title"><h3>{product.name}</h3><span className="dose">{product.dose}</span></div><div className="product-bottom"><div className="price"><small>R$</small>{currency(product.price)}</div><Button variant="outline" onClick={() => setSelected(product)} aria-label={`Ver detalhes de ${product.name}`}>Ver produto <ArrowUpRight /></Button></div></div></article>)}</div>
        {!visible.length && <div className="empty">Nenhum produto encontrado para “{query}”.</div>}
        <div className="catalog-note"><Info size={14} /><span>Imagens ilustrativas. O uso de produtos deve seguir orientação de um profissional de saúde.</span></div>
      </section>
    </main>
    <footer className="footer"><div className="container footer-inner"><Brand /><p>© {new Date().getFullYear()} Marvel Pharmos. Todos os direitos reservados.<br />Ciência e cuidado em cada detalhe.</p></div></footer>
    {selected && <ProductDetails product={selected} close={() => setSelected(null)} />}
  </>;
}
