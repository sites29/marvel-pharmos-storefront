import { createFileRoute } from '@tanstack/react-router';
import { useEffect, useRef, useState } from 'react';
import { ArrowDown, ArrowUpRight, FlaskConical, Plus, Search, X, Info, Dumbbell, LayoutGrid } from 'lucide-react';
import { Button } from '@/components/ui/button';
import hero from '@/assets/pharmacy-hero.jpg';
import { products, categoryLabels, type Product, type Category } from '@/data/products';

export const Route = createFileRoute('/')({
  head: () => ({ meta: [
    { title: 'Marvel Pharmos | Peptídeos e Anabolizantes' },
    { name: 'description', content: 'Catálogo Marvel Pharmos: peptídeos e anabolizantes das marcas Lander Lan, Muscle, King, Bratva, Pharmacon, Cooper, Oxygen, ZPHC, Eminence, Alpha e mais.' },
    { property: 'og:title', content: 'Marvel Pharmos | Peptídeos e Anabolizantes' },
    { property: 'og:description', content: 'Explore o catálogo Marvel Pharmos de peptídeos e anabolizantes e consulte os valores.' },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ] }),
  component: Index,
});

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
    <img src={product.image} width={1024} height={1024} alt={`${product.name} ${product.detail}, imagem ilustrativa`} />
    <div className="section-label">{categoryLabels[product.category]} · {product.brand}</div>
    <h2 id="product-detail-title">{product.name} {product.detail && <span className="dose">{product.detail}</span>}</h2>
    {product.price !== null
      ? <div className="price"><small>R$</small>{currency(product.price)}</div>
      : <div className="price"><small>Esgotado</small></div>}
    <p>Imagem ilustrativa. Consulte um profissional de saúde sobre indicação, utilização e eventuais restrições.</p>
    <p>A compra online ainda não está disponível.</p>
  </div></div>;
}

type Filter = 'todos' | Category;

function Index() {
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('todos');
  const [selected, setSelected] = useState<Product | null>(null);
  const catalog = useRef<HTMLElement>(null);
  const term = query.trim().toLocaleLowerCase('pt-BR');
  const visible = products.filter(p =>
    (filter === 'todos' || p.category === filter) &&
    `${p.name} ${p.detail} ${p.brand} ${categoryLabels[p.category]}`.toLocaleLowerCase('pt-BR').includes(term));
  const count = (f: Filter) => f === 'todos' ? products.length : products.filter(p => p.category === f).length;
  const scrollCatalog = () => catalog.current?.scrollIntoView({ behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
  return <>
    <div className="announcement">Marvel Pharmos · Seu cuidado começa aqui.</div>
    <header className="header container"><Brand /><nav className="header-nav" aria-label="Navegação principal"><span>Ciência e cuidado, lado a lado.</span><Button variant="ghost" onClick={scrollCatalog}>Nossos produtos <ArrowUpRight /></Button></nav></header>
    <main>
      <section className="hero"><img className="hero-image" src={hero} alt="Frascos de laboratório em ambiente claro" width={1536} height={1024} fetchPriority="high" /><div className="container hero-content"><div className="eyebrow">Uma nova perspectiva de cuidado</div><h1>Marvel Pharmos<span>Ciência. Cuidado. Você.</span></h1><p>Conheça nossas linhas de peptídeos e anabolizantes e encontre os produtos do nosso catálogo.</p><Button size="lg" className="hero-cta" onClick={scrollCatalog}>Explorar produtos <ArrowDown /></Button></div></section>
      <section className="container catalog" ref={catalog} aria-labelledby="catalog-title"><div className="catalog-top"><div><div className="section-label">Catálogo Marvel Pharmos</div><h2 id="catalog-title">Nossos produtos</h2></div><label className="search"><Search size={17} /><input aria-label="Buscar produtos" placeholder="Buscar um produto..." value={query} onChange={e => setQuery(e.target.value)} />{query && <Button variant="ghost" size="icon" aria-label="Limpar busca" onClick={() => setQuery('')}><X /></Button>}</label></div>
        <div className="catalog-filter" role="group" aria-label="Filtrar por categoria">
          <Button variant={filter === 'todos' ? 'secondary' : 'ghost'} size="sm" onClick={() => setFilter('todos')}><LayoutGrid /> Todos <span>{count('todos')}</span></Button>
          <Button variant={filter === 'peptideos' ? 'secondary' : 'ghost'} size="sm" onClick={() => setFilter('peptideos')}><FlaskConical /> Peptídeos <span>{count('peptideos')}</span></Button>
          <Button variant={filter === 'anabolizantes' ? 'secondary' : 'ghost'} size="sm" onClick={() => setFilter('anabolizantes')}><Dumbbell /> Anabolizantes <span>{count('anabolizantes')}</span></Button>
          <small aria-live="polite">{visible.length} {visible.length === 1 ? 'produto' : 'produtos'}</small>
        </div>
        <div className="product-grid">{visible.map(product => <article className="product" key={product.id}><div className="product-image"><span className="product-tag">{categoryLabels[product.category]}</span><img src={product.image} alt={`Frasco ilustrativo de ${product.name} ${product.detail}`} loading="lazy" width={1024} height={1024} /></div><div className="product-body"><div className="section-label">{product.brand}</div><div className="product-title"><h3>{product.name}</h3>{product.detail && <span className="dose">{product.detail}</span>}</div><div className="product-bottom">{product.price !== null ? <div className="price"><small>R$</small>{currency(product.price)}</div> : <div className="price"><small>Esgotado</small></div>}<Button variant="outline" onClick={() => setSelected(product)} aria-label={`Ver detalhes de ${product.name}`}>Ver produto <ArrowUpRight /></Button></div></div></article>)}</div>
        {!visible.length && <div className="empty">Nenhum produto encontrado para “{query}”.</div>}
        <div className="catalog-note"><Info size={14} /><span>Imagens ilustrativas. O uso de produtos deve seguir orientação de um profissional de saúde.</span></div>
      </section>
    </main>
    <footer className="footer"><div className="container footer-inner"><Brand /><p>© {new Date().getFullYear()} Marvel Pharmos. Todos os direitos reservados.<br />Ciência e cuidado em cada detalhe.</p></div></footer>
    {selected && <ProductDetails product={selected} close={() => setSelected(null)} />}
  </>;
}
