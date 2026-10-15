import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowRight,
  Check,
  ChevronRight,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { categories, categoryLabels, products, type Category, type Product } from "@/data/products";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marvel Pharms | Catálogo por categorias" },
      {
        name: "description",
        content:
          "Explore o catálogo Marvel Pharms por categorias e consulte produtos, preços e disponibilidade diretamente pelo WhatsApp.",
      },
      { property: "og:title", content: "Marvel Pharms | Ciência, performance e resultados" },
      {
        property: "og:description",
        content: "Escolha uma categoria e fale com a Marvel Pharms pelo WhatsApp.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: Storefront,
});

const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER?.replace(/\D/g, "") ?? "";

const BRAZIL_STATES = [
  ["AC", "Acre"],
  ["AL", "Alagoas"],
  ["AP", "Amapá"],
  ["AM", "Amazonas"],
  ["BA", "Bahia"],
  ["CE", "Ceará"],
  ["DF", "Distrito Federal"],
  ["ES", "Espírito Santo"],
  ["GO", "Goiás"],
  ["MA", "Maranhão"],
  ["MT", "Mato Grosso"],
  ["MS", "Mato Grosso do Sul"],
  ["MG", "Minas Gerais"],
  ["PA", "Pará"],
  ["PB", "Paraíba"],
  ["PR", "Paraná"],
  ["PE", "Pernambuco"],
  ["PI", "Piauí"],
  ["RJ", "Rio de Janeiro"],
  ["RN", "Rio Grande do Norte"],
  ["RS", "Rio Grande do Sul"],
  ["RO", "Rondônia"],
  ["RR", "Roraima"],
  ["SC", "Santa Catarina"],
  ["SP", "São Paulo"],
  ["SE", "Sergipe"],
  ["TO", "Tocantins"],
] as const;

type Cart = Record<string, number>;
type ProductVisual = { image: string; accent: string; isReal: boolean };

const categoryDescriptions: Record<Category, string> = {
  peptideos: "Protocolos e compostos selecionados",
  emagrecedores: "Linhas voltadas ao controle de peso",
  "lander-lan": "Linha completa Lander Lan",
  "lander-lan-gold": "Seleção premium Lander Gold",
  muscle: "Catálogo completo Muscle Labs",
  king: "Catálogo completo King Pharma",
  bratva: "Catálogo completo Bratva Labs",
  pharmacon: "Catálogo completo Pharmacon",
  cooper: "Produtos da linha Cooper",
  oxygen: "Catálogo completo Oxygen",
  canada: "Seleção da linha Canadá",
  zphc: "Produtos da linha ZPHC",
  eminence: "Catálogo completo Eminence",
  alpha: "Produtos da linha Alpha",
  variados: "Acessórios e produtos diversos",
};

const featuredProducts = [
  {
    product: products.find(
      (product) => product.category === "lander-lan" && product.name === "GH Lander 100UI",
    )!,
    image: "/images/products/landertropin-100ui-transparent.png",
    label: "Destaque da linha",
    source: "Landerlan",
  },
  {
    product: products.find(
      (product) => product.category === "lander-lan" && product.name === "Testenat 4ML",
    )!,
    image: "/images/products/testenat-4ml-transparent.png",
    label: "Mais procurado",
    source: "Landerlan",
  },
  {
    product: products.find(
      (product) => product.category === "lander-lan" && product.name === "Decaland 5ML",
    )!,
    image: "/images/products/decaland-5ml-transparent.png",
    label: "Seleção Marvel",
    source: "Landerlan",
  },
  {
    product: products.find(
      (product) => product.category === "lander-lan-gold" && product.name === "HCG 5000UI",
    )!,
    image: "/images/products/hcg-5000ui-transparent.png",
    label: "Lander Gold",
    source: "Landerlan Gold",
  },
];

const peptideVisuals: Record<string, { image: string; accent: string }> = {
  "USA Importados": {
    image: "/images/products/peptides/cutouts/usa-importados.png",
    accent: "#2f87d7",
  },
  Core: { image: "/images/products/peptides/cutouts/core.png", accent: "#d2a54f" },
  Oxygen: { image: "/images/products/peptides/cutouts/oxygen.png", accent: "#416fe7" },
  Neopep: { image: "/images/products/peptides/cutouts/neopep.png", accent: "#24c1d5" },
  Alluvi: { image: "/images/products/peptides/cutouts/alluvi.png", accent: "#f25c9c" },
  World: { image: "/images/products/peptides/cutouts/world.png", accent: "#d7d8dc" },
  "Med Plus": { image: "/images/products/peptides/cutouts/med-plus.png", accent: "#ef3434" },
};

const realPeptideImages: Record<string, string> = {
  "Core|GHK-CU 50MG": "/images/products/peptides/real/core-ghk-cu-50-transparent.png",
  "Core|BPC-157 + TB-500": "/images/products/peptides/real/core-bpc-tb.png",
  "Core|BPC-157 5MG": "/images/products/peptides/real/core-bpc-157-transparent.png",
  "Core|TB-500 5MG": "/images/products/peptides/real/core-tb-500-transparent.png",
  "Core|Tesamorelin": "/images/products/peptides/real/core-tesamorelin-transparent.png",
  "Oxygen|GHK-CU 50MG": "/images/products/peptides/real/oxygen-ghk-cu-50-transparent.png",
  "Oxygen|GHK-CU 100MG": "/images/products/peptides/real/oxygen-ghk-cu-100-transparent.png",
  "Oxygen|KPV": "/images/products/peptides/real/oxygen-kpv-transparent.png",
  "Oxygen|MOTS-C": "/images/products/peptides/real/oxygen-mots-c-transparent.png",
  "Oxygen|Epithalon": "/images/products/peptides/real/oxygen-epithalon-transparent.png",
  "Oxygen|GLOW": "/images/products/peptides/real/oxygen-glow-transparent.png",
  "Oxygen|PT-141": "/images/products/peptides/real/oxygen-pt-141-transparent.png",
  "Oxygen|TB-500 + BPC-157": "/images/products/peptides/real/oxygen-tb-bpc-transparent.png",
  "Oxygen|NAD+ + Vitamina B12": "/images/products/peptides/real/oxygen-nad-b12-transparent.png",
  "Oxygen|Semax 10MG": "/images/products/peptides/real/oxygen-semax-transparent.png",
  "Oxygen|Selank 10MG": "/images/products/peptides/real/oxygen-selank-transparent.png",
  "Alluvi|GLOW caneta": "/images/products/peptides/real/alluvi-glow-caneta-transparent.png",
  "World|Semax 10MG": "/images/products/peptides/real/world-semax-10-transparent.png",
  "World|NAD+ 500MG": "/images/products/peptides/real/world-nad-500-transparent.png",
  "World|PT-141 10MG": "/images/products/peptides/real/world-pt-141-transparent.png",
  "Med Plus|MOTS-C caixa": "/images/products/peptides/real/medplus-mots-c-transparent.png",
  "Med Plus|MOTS-C bujão": "/images/products/peptides/real/medplus-mots-c-transparent.png",
  "Med Plus|BPC-157 caixa": "/images/products/peptides/real/medplus-bpc-157-transparent.png",
  "Med Plus|BPC-157 bujão": "/images/products/peptides/real/medplus-bpc-157-transparent.png",
  "Med Plus|TB-500 caixa": "/images/products/peptides/real/medplus-tb-500-transparent.png",
  "Med Plus|TB-500 bujão": "/images/products/peptides/real/medplus-tb-500-transparent.png",
  "Med Plus|Ipamorelin caixa": "/images/products/peptides/real/medplus-ipamorelin-transparent.png",
  "Med Plus|Ipamorelin bujão": "/images/products/peptides/real/medplus-ipamorelin-transparent.png",
  "Med Plus|AOD-9406 caixa": "/images/products/peptides/real/medplus-aod-9604-transparent.png",
  "Med Plus|AOD-9406 bujão": "/images/products/peptides/real/medplus-aod-9604-transparent.png",
  "Med Plus|Tesamorelin caixa":
    "/images/products/peptides/real/medplus-tesamorelin-transparent.png",
  "Med Plus|Tesamorelin bujão":
    "/images/products/peptides/real/medplus-tesamorelin-transparent.png",
  "Med Plus|KPV caixa": "/images/products/peptides/real/medplus-kpv-transparent.png",
  "Med Plus|KPV bujão": "/images/products/peptides/real/medplus-kpv-transparent.png",
  "Med Plus|Sermorelin caixa": "/images/products/peptides/real/medplus-sermorelin-transparent.png",
  "Med Plus|Sermorelin bujão": "/images/products/peptides/real/medplus-sermorelin-transparent.png",
};

const weightLossVisuals: Record<string, { image: string; accent: string; isReal: boolean }> = {
  "Semaglix (Ozempic importado)": {
    image: "/images/products/weight-loss/real/semaglix-transparent.png",
    accent: "#244a9b",
    isReal: true,
  },
  Ozempic: {
    image: "/images/products/weight-loss/real/zphc-semaglutide-transparent.png",
    accent: "#416fe7",
    isReal: true,
  },
  TG: {
    image: "/images/products/weight-loss/real/tg-5mg-transparent.png",
    accent: "#9f7a14",
    isReal: true,
  },
  "Lipoless bujão único": {
    image: "/images/products/weight-loss/real/lipoless-single-transparent.png",
    accent: "#f28a18",
    isReal: true,
  },
  "Lipoless caixa com 4 bujões": {
    image: "/images/products/weight-loss/real/lipoless-box-transparent.png",
    accent: "#f28a18",
    isReal: true,
  },
  "Mounjaro 30MG": {
    image: "/images/products/peptides/cutouts/core.png",
    accent: "#8f49a9",
    isReal: false,
  },
  "Mounjaro 60MG": {
    image: "/images/products/peptides/cutouts/world.png",
    accent: "#8f49a9",
    isReal: false,
  },
  "Tirzec bujão": {
    image: "/images/products/weight-loss/real/tirzec-vial-transparent.png",
    accent: "#c89a13",
    isReal: true,
  },
  "Tirzec 2,5MG bujão com 4 seringas": {
    image: "/images/products/weight-loss/real/tirzec-syringes-transparent.png",
    accent: "#c89a13",
    isReal: true,
  },
  "Tirzepatida 60MG bujão único": {
    image: "/images/products/peptides/cutouts/oxygen.png",
    accent: "#416fe7",
    isReal: false,
  },
  "Tirzepatida 60MG caixa com 4 bujões": {
    image: "/images/products/peptides/cutouts/oxygen.png",
    accent: "#416fe7",
    isReal: false,
  },
  "Tirzepatida caneta 60MG": {
    image: "/images/products/peptides/cutouts/oxygen.png",
    accent: "#416fe7",
    isReal: false,
  },
  "Tirzepatida 50MG": {
    image: "/images/products/weight-loss/real/zphc-tirze-50-transparent.png",
    accent: "#416fe7",
    isReal: true,
  },
  "Retatrutida 60MG caixa com 5 bujões": {
    image: "/images/products/weight-loss/real/zphc-reta-60-transparent.png",
    accent: "#416fe7",
    isReal: true,
  },
  "Retatrutida 60MG caixa com 2 bujões": {
    image: "/images/products/weight-loss/real/zphc-reta-60-transparent.png",
    accent: "#416fe7",
    isReal: false,
  },
  "Retatrutida 120MG caixa com 2 bujões": {
    image: "/images/products/peptides/cutouts/world.png",
    accent: "#416fe7",
    isReal: false,
  },
  "Retatrutida 120MG caixa com 5 bujões": {
    image: "/images/products/peptides/cutouts/world.png",
    accent: "#416fe7",
    isReal: false,
  },
  "Retatrutida 40MG caixa com 4 bujões": {
    image: "/images/products/peptides/cutouts/oxygen.png",
    accent: "#416fe7",
    isReal: false,
  },
  "Retatrutida 40MG caneta": {
    image: "/images/products/peptides/cutouts/oxygen.png",
    accent: "#416fe7",
    isReal: false,
  },
  "Retatrutida 30MG": {
    image: "/images/products/peptides/cutouts/world.png",
    accent: "#d7d8dc",
    isReal: false,
  },
  "Retatrutida 60MG": {
    image: "/images/products/peptides/cutouts/world.png",
    accent: "#d7d8dc",
    isReal: false,
  },
};

const weightLossBrandOverrides: Record<string, { image: string; accent: string; isReal: boolean }> =
  {
    "Synetica|Retatrutida 40MG caneta": {
      image: "/images/products/weight-loss/real/synedica-reta-40-transparent.png",
      accent: "#65b687",
      isReal: false,
    },
    "USA Importados|Retatrutida 40MG": {
      image: "/images/products/peptides/cutouts/usa-importados.png",
      accent: "#2f87d7",
      isReal: false,
    },
    "USA Importados|Retatrutida 60MG": {
      image: "/images/products/peptides/cutouts/core.png",
      accent: "#2f87d7",
      isReal: false,
    },
  };

const landerLanVisuals: Record<string, { image: string; accent: string; isReal: boolean }> = {
  "Proviron 10MG - 20 comprimidos": {
    image: "/images/products/peptides/cutouts/world.png",
    accent: "#d2a54f",
    isReal: false,
  },
  "Masteron comprimidos": {
    image: "/images/products/lander-lan/real/masteron-comprimidos-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
  Dianabol: {
    image: "/images/products/lander-lan/real/dianabol-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
  "Decaland 5ML": {
    image: "/images/products/lander-lan/real/decaland-5ml-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
  "Duraland 1ML": {
    image: "/images/products/lander-lan/real/duraland-1ml-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
  "GH Lander 100UI": {
    image: "/images/products/lander-lan/real/gh-lander-100ui-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
  Hemogenin: {
    image: "/images/products/peptides/cutouts/core.png",
    accent: "#d2a54f",
    isReal: false,
  },
  "Oxandrolona 5MG": {
    image: "/images/products/lander-lan/real/oxandrolona-5mg-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
  "Oxandrolona 10MG": {
    image: "/images/products/lander-lan/real/oxandrolona-10mg-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
  "Stan 15ML": {
    image: "/images/products/lander-lan/real/stan-15ml-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
  "Stan 30ML": {
    image: "/images/products/lander-lan/real/stan-30ml-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
  "Stan comprimido": {
    image: "/images/products/lander-lan/real/stan-comprimido-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
  "Testoland 6ML - 3 ampolas": {
    image: "/images/products/peptides/cutouts/usa-importados.png",
    accent: "#d2a54f",
    isReal: false,
  },
  "Testenat 4ML": {
    image: "/images/products/lander-lan/real/testenat-4ml-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
  "Propionato 10ML": {
    image: "/images/products/lander-lan/real/propionato-10ml-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
  "Primabolan injetável 10ML": {
    image: "/images/products/lander-lan/real/primabolan-injetavel-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
  "Primabolan comprimidos": {
    image: "/images/products/lander-lan/real/primabolan-comprimidos-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
  "Clembuterol 50 comprimidos": {
    image: "/images/products/lander-lan/real/clembuterol-50-transparent.png",
    accent: "#d2a54f",
    isReal: true,
  },
};

const muscleLabsVisuals: Record<string, { image: string; accent: string; isReal: boolean }> = {
  "Boldenona 200MG/ML - 10ML": {
    image: "/images/products/muscle-labs/real/muscle-boldenona.png",
    accent: "#cf1f2b",
    isReal: true,
  },
  "Cutstack 200MG/ML - 10ML": {
    image: "/images/products/muscle-labs/real/muscle-cutstack.png",
    accent: "#cf1f2b",
    isReal: true,
  },
  "Deca 300MG/ML - 10ML": {
    image: "/images/products/muscle-labs/real/muscle-deca.png",
    accent: "#cf1f2b",
    isReal: true,
  },
  "Masteron 100MG/ML - 10ML": {
    image: "/images/products/muscle-labs/real/muscle-masteron.png",
    accent: "#cf1f2b",
    isReal: true,
  },
  "Trembo Acetato 100MG/ML - 10ML": {
    image: "/images/products/muscle-labs/real/muscle-trembo-acetato.png",
    accent: "#cf1f2b",
    isReal: true,
  },
  "Primabolan 100MG/ML - 10ML": {
    image: "/images/products/muscle-labs/real/muscle-primobolan.png",
    accent: "#cf1f2b",
    isReal: true,
  },
  "Dura 250MG/ML - 10ML": {
    image: "/images/products/muscle-labs/real/muscle-dura.png",
    accent: "#cf1f2b",
    isReal: true,
  },
  "Propionato 100MG/ML - 10ML": {
    image: "/images/products/muscle-labs/real/muscle-propionato.png",
    accent: "#cf1f2b",
    isReal: true,
  },
  "Enantato 250MG/ML - 10ML": {
    image: "/images/products/muscle-labs/real/muscle-enantato.png",
    accent: "#cf1f2b",
    isReal: true,
  },
  "Cipionato 250MG/ML - 10ML": {
    image: "/images/products/muscle-labs/real/muscle-cipionato.png",
    accent: "#cf1f2b",
    isReal: true,
  },
  "Turinabol 10MG - 60 comprimidos": {
    image: "/images/products/muscle-labs/real/muscle-turinabol.png",
    accent: "#cf1f2b",
    isReal: true,
  },
  "Hemogenin (Anadrol) 25MG - 50 comprimidos": {
    image: "/images/products/muscle-labs/real/muscle-hemogenin.png",
    accent: "#cf1f2b",
    isReal: true,
  },
  "Halotestin 10MG - 30 comprimidos": {
    image: "/images/products/muscle-labs/real/muscle-halotestin.png",
    accent: "#cf1f2b",
    isReal: true,
  },
  "HCG 5000UI": {
    image: "/images/products/muscle-labs/real/muscle-hcg.png",
    accent: "#cf1f2b",
    isReal: true,
  },
};

const kingPharmaVisuals: Record<string, { image: string; accent: string; isReal: boolean }> = {
  "Boldabolic (Boldenona 300MG/10ML)": {
    image: "/images/products/king-pharma/real/king-boldabolic.png",
    accent: "#d5a927",
    isReal: true,
  },
  "CutStack (Trembo Ace + Prop + Mast 150MG/10ML)": {
    image: "/images/products/king-pharma/real/king-cutstack.png",
    accent: "#d5a927",
    isReal: true,
  },
  "Deca Durabolin 300MG/10ML": {
    image: "/images/products/king-pharma/real/king-deca.png",
    accent: "#d5a927",
    isReal: true,
  },
  "Finaplix (Trembo Enantato 100MG/10ML)": {
    image: "/images/products/king-pharma/real/king-finaplix.png",
    accent: "#d5a927",
    isReal: true,
  },
  "Masteron 100MG/10ML": {
    image: "/images/products/king-pharma/real/king-masteron.png",
    accent: "#d5a927",
    isReal: true,
  },
  "Masteron Enantato Slow 100MG/10ML": {
    image: "/images/products/king-pharma/real/king-masteron-slow.png",
    accent: "#d5a927",
    isReal: true,
  },
  "Parabolan (Trembo Acetato 100MG/10ML)": {
    image: "/images/products/king-pharma/real/king-parabolan.png",
    accent: "#d5a927",
    isReal: true,
  },
  "Parabolin Blend (Trembolona Hexa 200MG/10ML)": {
    image: "/images/products/king-pharma/real/king-parabolin.png",
    accent: "#d5a927",
    isReal: true,
  },
  "Primobolan 100MG/10ML": {
    image: "/images/products/king-pharma/real/king-primobolan.png",
    accent: "#d5a927",
    isReal: true,
  },
  "Propiobolic (Propionato 200MG/10ML)": {
    image: "/images/products/king-pharma/real/king-propionato.png",
    accent: "#d5a927",
    isReal: true,
  },
  "Sustan (Durateston 250MG/10ML)": {
    image: "/images/products/king-pharma/real/king-sustan.png",
    accent: "#d5a927",
    isReal: true,
  },
  "Testex (Cipionato 250MG/10ML)": {
    image: "/images/products/king-pharma/real/king-testex.png",
    accent: "#d5a927",
    isReal: true,
  },
  "Testoviron (Enantato 250MG/10ML)": {
    image: "/images/products/king-pharma/real/king-testoviron.png",
    accent: "#d5a927",
    isReal: true,
  },
  "Anavar (Oxandrolona 10MG - 50 comprimidos)": {
    image: "/images/products/king-pharma/real/king-anavar.png",
    accent: "#d5a927",
    isReal: true,
  },
};

const bratvaVisuals: Record<string, { image: string; accent: string; isReal: boolean }> = {
  "Sales de Testosterona 250MG/ML - 10ML (Dura)": {
    image: "/images/products/bratva/real/bratva-dura-10ml.png",
    accent: "#353a40",
    isReal: true,
  },
  "Sales de Testosterona 250MG/ML - 10 ampolas de 1ML (Dura)": {
    image: "/images/products/bratva/real/bratva-dura-1ml.png",
    accent: "#353a40",
    isReal: true,
  },
  "Decanoato de Nandrolona 200MG/ML - 10ML (Deca)": {
    image: "/images/products/bratva/real/bratva-deca-10ml.png",
    accent: "#353a40",
    isReal: true,
  },
  "Decanoato de Nandrolona 200MG/ML - 10 ampolas de 1ML (Deca)": {
    image: "/images/products/bratva/real/bratva-deca-1ml.png",
    accent: "#353a40",
    isReal: true,
  },
  "Enantato de Testosterona 250MG/ML - 10ML": {
    image: "/images/products/bratva/real/bratva-enantato-10ml.png",
    accent: "#353a40",
    isReal: true,
  },
  "Enantato de Testosterona 250MG/ML - 10 ampolas de 1ML": {
    image: "/images/products/bratva/real/bratva-enantato-1ml.png",
    accent: "#353a40",
    isReal: true,
  },
  "Propionato de Drostonolona 100MG/ML - 10ML (Masteron)": {
    image: "/images/products/bratva/real/bratva-masteron-10ml.png",
    accent: "#353a40",
    isReal: true,
  },
  "Propionato de Drostonolona 100MG/ML - 10 ampolas de 1ML (Masteron)": {
    image: "/images/products/bratva/real/bratva-masteron-1ml.png",
    accent: "#353a40",
    isReal: true,
  },
  "B-Blend I 150MG/10ML (CutStack)": {
    image: "/images/products/bratva/real/bratva-cutstack-10ml.png",
    accent: "#353a40",
    isReal: true,
  },
  "Acetato de Trembolona 100MG/ML - 10ML": {
    image: "/images/products/bratva/real/bratva-trembo-acetato-10ml.png",
    accent: "#353a40",
    isReal: true,
  },
  "Acetato de Trembolona 100MG/ML - 10 ampolas de 1ML": {
    image: "/images/products/bratva/real/bratva-trembo-acetato-1ml.png",
    accent: "#353a40",
    isReal: true,
  },
  "Metandrostenolona 10MG - 50 comprimidos (Dianabol)": {
    image: "/images/products/bratva/real/bratva-dianabol-10mg-50.png",
    accent: "#353a40",
    isReal: true,
  },
  "Stanozolol 10MG - 50 comprimidos": {
    image: "/images/products/bratva/real/bratva-stan-10mg-50.png",
    accent: "#353a40",
    isReal: true,
  },
  "Stanozolol 10MG - 100 comprimidos": {
    image: "/images/products/bratva/real/bratva-stan-10mg-100.png",
    accent: "#353a40",
    isReal: true,
  },
  "Stanozolol 50MG/ML - 10ML": {
    image: "/images/products/bratva/real/bratva-stan-injetavel.png",
    accent: "#353a40",
    isReal: true,
  },
  "Hemogenin 50MG - 25 comprimidos": {
    image: "/images/products/bratva/real/bratva-hemogenin-25.png",
    accent: "#353a40",
    isReal: true,
  },
  "Oxandrolona 10MG - 50 comprimidos": {
    image: "/images/products/bratva/real/bratva-oxandrolona-10mg-50.png",
    accent: "#353a40",
    isReal: true,
  },
  "Enantato de Metenolona 100MG/ML - 10ML (Primobolan)": {
    image: "/images/products/bratva/real/bratva-primobolan-10ml.png",
    accent: "#353a40",
    isReal: true,
  },
  "Somatroph HGH 100UI (10 frascos de 10UI)": {
    image: "/images/products/bratva/real/bratva-gh-100ui.png",
    accent: "#353a40",
    isReal: true,
  },
};

const pharmaconVisuals: Record<string, { image: string; accent: string; isReal: boolean }> = {
  "Diana 10MG - 50 comprimidos": {
    image: "/images/products/pharmacon/real/pharmacon-diana.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Boldenona 10ML": {
    image: "/images/products/pharmacon/real/pharmacon-boldenona.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Cipionato 250MG": {
    image: "/images/products/pharmacon/real/pharmacon-cipionato-250.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Propionato|320": {
    image: "/images/products/pharmacon/real/pharmacon-propionato-100.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Deca 300MG": {
    image: "/images/products/pharmacon/real/pharmacon-deca-300.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Deca 600MG": {
    image: "/images/products/pharmacon/real/pharmacon-deca-600.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Dura 250MG": {
    image: "/images/products/pharmacon/real/pharmacon-dura-250.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Dura 300MG": {
    image: "/images/products/pharmacon/real/pharmacon-dura-300.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Dura 500MG": {
    image: "/images/products/pharmacon/real/pharmacon-dura-500.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Enantato 250MG": {
    image: "/images/products/pharmacon/real/pharmacon-enantato-250.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Enantato 300MG": {
    image: "/images/products/pharmacon/real/pharmacon-enantato-300.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Enantato 500MG": {
    image: "/images/products/pharmacon/real/pharmacon-enantato-500.png",
    accent: "#1674a5",
    isReal: true,
  },
  Masteron: {
    image: "/images/products/pharmacon/real/pharmacon-masteron.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Mix 1": {
    image: "/images/products/pharmacon/real/pharmacon-mix-1.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Mix 2": {
    image: "/images/products/pharmacon/real/pharmacon-mix-2.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Mix 3": {
    image: "/images/products/pharmacon/real/pharmacon-mix-3.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Mix 4": {
    image: "/images/products/pharmacon/real/pharmacon-mix-4.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Mix 5": {
    image: "/images/products/pharmacon/real/pharmacon-mix-5.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Mix 6": {
    image: "/images/products/pharmacon/real/pharmacon-mix-6.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Propionato|240": {
    image: "/images/products/pharmacon/real/pharmacon-propionato-50.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Stan injetável 10ML": {
    image: "/images/products/pharmacon/real/pharmacon-stan-injetavel.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Stan oral": {
    image: "/images/products/pharmacon/real/pharmacon-stan-oral.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Trembo Acetato": {
    image: "/images/products/pharmacon/real/pharmacon-trembo-acetato.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Trembo Enantato": {
    image: "/images/products/pharmacon/real/pharmacon-trembo-enantato.png",
    accent: "#1674a5",
    isReal: true,
  },
  Turinabol: {
    image: "/images/products/pharmacon/real/pharmacon-turinabol.png",
    accent: "#1674a5",
    isReal: true,
  },
  Halotestin: {
    image: "/images/products/pharmacon/real/pharmacon-halotestin.png",
    accent: "#1674a5",
    isReal: true,
  },
  "Oxandrolona 10MG - 50 comprimidos": {
    image: "/images/products/pharmacon/real/pharmacon-oxandrolona.png",
    accent: "#1674a5",
    isReal: true,
  },
  Primabolan: {
    image: "/images/products/pharmacon/real/pharmacon-primobolan.png",
    accent: "#1674a5",
    isReal: true,
  },
  "DBOL 100MG": {
    image: "/images/products/pharmacon/real/pharmacon-dbol-100.png",
    accent: "#1674a5",
    isReal: true,
  },
  Hemogenin: {
    image: "/images/products/pharmacon/real/pharmacon-hemogenin.png",
    accent: "#1674a5",
    isReal: true,
  },
  NPP: {
    image: "/images/products/pharmacon/real/pharmacon-npp.png",
    accent: "#1674a5",
    isReal: true,
  },
  "GH 100UI": {
    image: "/images/products/pharmacon/real/pharmacon-gh-100ui.png",
    accent: "#1674a5",
    isReal: true,
  },
};

const cooperVisuals: Record<string, { image: string; accent: string; isReal: boolean }> = {
  HGH: { image: "/images/products/cooper/real/cooper-hgh.png", accent: "#1568a8", isReal: true },
  "HG Frag": {
    image: "/images/products/cooper/real/cooper-hg-frag.png",
    accent: "#d5a927",
    isReal: true,
  },
  "HG CJC-1295 DAC": {
    image: "/images/products/cooper/real/cooper-cjc-1295.png",
    accent: "#d5a927",
    isReal: true,
  },
  "Boldenona 250MG": {
    image: "/images/products/cooper/real/cooper-boldenona.png",
    accent: "#1568a8",
    isReal: true,
  },
  "Cipionato 250MG": {
    image: "/images/products/cooper/real/cooper-cipionato.png",
    accent: "#1568a8",
    isReal: true,
  },
  "Dianabol 10MG - 50 comprimidos": {
    image: "/images/products/cooper/real/cooper-dianabol.png",
    accent: "#1568a8",
    isReal: true,
  },
  "Deca 250MG": {
    image: "/images/products/cooper/real/cooper-deca.png",
    accent: "#996515",
    isReal: true,
  },
  "Undecanoato de Testosterona 1000MG": {
    image: "/images/products/cooper/real/cooper-undecanoato.png",
    accent: "#1568a8",
    isReal: true,
  },
  "Masteron Enantato 100MG": {
    image: "/images/products/cooper/real/cooper-masteron-enantato.png",
    accent: "#198754",
    isReal: true,
  },
  "Masteron Propionato (Masterbolic) 250MG": {
    image: "/images/products/cooper/real/cooper-masteron-propionato.png",
    accent: "#1568a8",
    isReal: true,
  },
  "Enantato 250MG": {
    image: "/images/products/cooper/real/cooper-enantato.png",
    accent: "#8c4a9f",
    isReal: true,
  },
  "Primabolan (Metbolic)": {
    image: "/images/products/cooper/real/cooper-primobolan.png",
    accent: "#1568a8",
    isReal: true,
  },
  "NPP (Nambolic)": {
    image: "/images/products/cooper/real/cooper-npp.png",
    accent: "#1568a8",
    isReal: true,
  },
  "Propionato (Probolic)": {
    image: "/images/products/cooper/real/cooper-probolic-generic.png",
    accent: "#1568a8",
    isReal: false,
  },
  "Dura (Susbolic)": {
    image: "/images/products/cooper/real/cooper-dura.png",
    accent: "#198754",
    isReal: true,
  },
  "Trembo Acetato 5ML (Trenombolic)": {
    image: "/images/products/cooper/real/cooper-trembo-acetato.png",
    accent: "#198754",
    isReal: true,
  },
  "Trembo Enantato": {
    image: "/images/products/cooper/real/cooper-trembo-enantato.png",
    accent: "#8c4a9f",
    isReal: true,
  },
  "Hemogenin 10MG - 50 comprimidos": {
    image: "/images/products/cooper/real/cooper-hemogenin.png",
    accent: "#1568a8",
    isReal: true,
  },
  "Turinabol 10MG - 50 comprimidos": {
    image: "/images/products/cooper/real/cooper-turinabol.png",
    accent: "#198754",
    isReal: true,
  },
  "Stan (Winobolic)": {
    image: "/images/products/cooper/real/cooper-stan.png",
    accent: "#1568a8",
    isReal: true,
  },
  "Clembuterol (Clembolic)": {
    image: "/images/products/cooper/real/cooper-clembuterol.png",
    accent: "#0d7f86",
    isReal: true,
  },
  "Proviron (Flubolic) 5MG - 50 comprimidos": {
    image: "/images/products/cooper/real/cooper-proviron.png",
    accent: "#1568a8",
    isReal: true,
  },
  Oxandrolona: {
    image: "/images/products/cooper/real/cooper-oxandrolona.png",
    accent: "#a22d25",
    isReal: true,
  },
  "T3 injetável": {
    image: "/images/products/cooper/real/cooper-t3-injetavel-generic.png",
    accent: "#0d7f86",
    isReal: false,
  },
  Tamoxifeno: {
    image: "/images/products/cooper/real/cooper-tamoxifeno.png",
    accent: "#198754",
    isReal: true,
  },
  Anastrazol: {
    image: "/images/products/cooper/real/cooper-anastrozol.png",
    accent: "#8a1f2d",
    isReal: true,
  },
};

const oxygenVisuals: Record<string, { image: string; accent: string; isReal: boolean }> = {
  Masteron: {
    image: "/images/products/oxygen/real/oxygen-masteron.png",
    accent: "#d62cb0",
    isReal: true,
  },
  Primabolan: {
    image: "/images/products/oxygen/real/oxygen-primobolan.png",
    accent: "#ef168f",
    isReal: true,
  },
  Enantato: {
    image: "/images/products/oxygen/real/oxygen-enantato.png",
    accent: "#19cde7",
    isReal: true,
  },
  "Trembo Acetato": {
    image: "/images/products/oxygen/real/oxygen-trembo-acetato.png",
    accent: "#f1ad16",
    isReal: true,
  },
  Deca: { image: "/images/products/oxygen/real/oxygen-deca.png", accent: "#e0b31f", isReal: true },
  Propionato: {
    image: "/images/products/oxygen/real/oxygen-propionato.png",
    accent: "#24bde7",
    isReal: true,
  },
  Dura: { image: "/images/products/oxygen/real/oxygen-dura.png", accent: "#35d47a", isReal: true },
  "Stan injetável": {
    image: "/images/products/oxygen/real/oxygen-stan-injetavel.png",
    accent: "#e5bd16",
    isReal: false,
  },
  NPP: { image: "/images/products/oxygen/real/oxygen-npp.png", accent: "#ed249a", isReal: true },
  Cipionato: {
    image: "/images/products/oxygen/real/oxygen-cipionato.png",
    accent: "#17cbe7",
    isReal: true,
  },
};

const zphcVisuals: Record<string, { image: string; accent: string; isReal: boolean }> = {
  "Deca bujão": {
    image: "/images/products/zphc/real/zphc-deca-bujao.png",
    accent: "#234bb0",
    isReal: true,
  },
  "Deca ampolas": {
    image: "/images/products/zphc/real/zphc-deca-ampolas.png",
    accent: "#234bb0",
    isReal: true,
  },
  "Masteron Propionato": {
    image: "/images/products/zphc/real/zphc-masteron-propionato.png",
    accent: "#234bb0",
    isReal: true,
  },
  "Masteron Enantato": {
    image: "/images/products/zphc/real/zphc-masteron-enantato.png",
    accent: "#234bb0",
    isReal: true,
  },
  Primabolan: {
    image: "/images/products/zphc/real/zphc-primobolan.png",
    accent: "#234bb0",
    isReal: true,
  },
  Dura: {
    image: "/images/products/zphc/real/zphc-dura.png",
    accent: "#234bb0",
    isReal: true,
  },
  "Enantato 400MG": {
    image: "/images/products/zphc/real/zphc-enantato-400.png",
    accent: "#234bb0",
    isReal: true,
  },
  "Enantato 250MG": {
    image: "/images/products/zphc/real/zphc-enantato-250.png",
    accent: "#234bb0",
    isReal: true,
  },
  "Trembo Acetato": {
    image: "/images/products/zphc/real/zphc-trembo-acetato.png",
    accent: "#d6a81d",
    isReal: true,
  },
  Cipionato: {
    image: "/images/products/zphc/real/zphc-cipionato.png",
    accent: "#234bb0",
    isReal: true,
  },
  Clembuterol: {
    image: "/images/products/zphc/real/zphc-clembuterol.png",
    accent: "#234bb0",
    isReal: true,
  },
  CYT3: {
    image: "/images/products/zphc/real/zphc-cyt3.png",
    accent: "#234bb0",
    isReal: true,
  },
  Boldenona: {
    image: "/images/products/zphc/real/zphc-boldenona.png",
    accent: "#234bb0",
    isReal: true,
  },
  Hemogenin: {
    image: "/images/products/zphc/real/zphc-hemogenin.png",
    accent: "#234bb0",
    isReal: true,
  },
  "GH 80UI": {
    image: "/images/products/zphc/real/zphc-gh-80ui.png",
    accent: "#234bb0",
    isReal: true,
  },
  "GH 32UI": {
    image: "/images/products/zphc/real/zphc-gh-32ui.png",
    accent: "#234bb0",
    isReal: true,
  },
  "GH 200UI": {
    image: "/images/products/zphc/real/zphc-gh-200ui.png",
    accent: "#234bb0",
    isReal: true,
  },
  "GH 320UI": {
    image: "/images/products/zphc/real/zphc-gh-320ui.png",
    accent: "#234bb0",
    isReal: true,
  },
};

const eminenceVisuals: Record<string, { image: string; accent: string; isReal: boolean }> = {
  Dura: {
    image: "/images/products/eminence/real/eminence-dura.png",
    accent: "#6b7785",
    isReal: true,
  },
  Enantato: {
    image: "/images/products/eminence/real/eminence-enantato.png",
    accent: "#20a8c6",
    isReal: true,
  },
  Deca: {
    image: "/images/products/eminence/real/eminence-deca.png",
    accent: "#c92c2c",
    isReal: true,
  },
  Masteron: {
    image: "/images/products/eminence/real/eminence-masteron.png",
    accent: "#d48b24",
    isReal: true,
  },
  "Trembo Acetato": {
    image: "/images/products/eminence/real/eminence-trembo-acetato.png",
    accent: "#6b7785",
    isReal: true,
  },
  "Trembo Enantato": {
    image: "/images/products/eminence/real/eminence-trembo-enantato.png",
    accent: "#302986",
    isReal: true,
  },
  Primabolan: {
    image: "/images/products/eminence/real/eminence-primobolan.png",
    accent: "#cf2879",
    isReal: true,
  },
  Cipionato: {
    image: "/images/products/eminence/real/eminence-cipionato.png",
    accent: "#d4d420",
    isReal: true,
  },
  Proviron: {
    image: "/images/products/eminence/real/eminence-proviron.png",
    accent: "#c72867",
    isReal: true,
  },
  Clembuterol: {
    image: "/images/products/eminence/real/eminence-clembuterol.png",
    accent: "#dfd421",
    isReal: true,
  },
  Dianabol: {
    image: "/images/products/eminence/real/eminence-dianabol.png",
    accent: "#bf2a2e",
    isReal: true,
  },
  Oxandrolona: {
    image: "/images/products/eminence/real/eminence-oxandrolona.png",
    accent: "#1f346c",
    isReal: true,
  },
};

const alphaVisuals: Record<string, { image: string; accent: string; isReal: boolean }> = {
  Dura: {
    image: "/images/products/alpha/real/alpha-dura.png",
    accent: "#245ea9",
    isReal: true,
  },
  "Masteron Propionato": {
    image: "/images/products/alpha/real/alpha-masteron-propionato.png",
    accent: "#245ea9",
    isReal: true,
  },
  "Masteron Enantato": {
    image: "/images/products/alpha/real/alpha-masteron-enantato.png",
    accent: "#245ea9",
    isReal: false,
  },
  Deca: {
    image: "/images/products/alpha/real/alpha-deca.png",
    accent: "#245ea9",
    isReal: true,
  },
  Enantato: {
    image: "/images/products/alpha/real/alpha-enantato.png",
    accent: "#245ea9",
    isReal: true,
  },
  Primabolan: {
    image: "/images/products/alpha/real/alpha-primobolan.png",
    accent: "#245ea9",
    isReal: true,
  },
  Cipionato: {
    image: "/images/products/alpha/real/alpha-cipionato.png",
    accent: "#245ea9",
    isReal: true,
  },
  Proviron: {
    image: "/images/products/alpha/real/alpha-proviron.png",
    accent: "#245ea9",
    isReal: true,
  },
  Boldenona: {
    image: "/images/products/alpha/real/alpha-boldenona.png",
    accent: "#245ea9",
    isReal: true,
  },
  Clembuterol: {
    image: "/images/products/alpha/real/alpha-clembuterol.png",
    accent: "#245ea9",
    isReal: true,
  },
  Turinabol: {
    image: "/images/products/alpha/real/alpha-turinabol.png",
    accent: "#245ea9",
    isReal: true,
  },
  Stan: {
    image: "/images/products/alpha/real/alpha-stan.png",
    accent: "#245ea9",
    isReal: true,
  },
  "HCG 15.000UI": {
    image: "/images/products/alpha/real/alpha-hcg-15000ui.png",
    accent: "#245ea9",
    isReal: true,
  },
};

function peptidePresentation(name: string) {
  const normalized = name.toLocaleLowerCase("pt-BR");
  if (normalized.includes("caneta")) return { kind: "pen", label: "Caneta preenchida" };
  if (normalized.includes("caixa")) return { kind: "box", label: "Apresentação em caixa" };
  if (normalized.includes("mamadeira")) return { kind: "solution", label: "Solução oral · 30 ml" };
  if (normalized.includes("comprimidos")) return { kind: "tablets", label: "Comprimidos" };
  if (normalized.includes("bujão")) return { kind: "vial", label: "Frasco individual" };
  return { kind: "vial", label: "Peptídeo liofilizado" };
}

const formatCurrency = (value: number) =>
  value.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });

function whatsappUrl(product?: Product) {
  const message = product
    ? `Olá! Vim pelo catálogo da Marvel Pharms e gostaria de consultar ${product.name} (${product.brand})${product.price === null ? ", que aparece como esgotado" : `, no valor de ${formatCurrency(product.price)}`}. Pode me ajudar?`
    : "Olá! Vim pelo site da Marvel Pharms e gostaria de atendimento.";
  const destination = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "https://wa.me/";
  return `${destination}?text=${encodeURIComponent(message)}`;
}

function cartWhatsappUrl(items: Array<{ product: Product; quantity: number }>, state: string) {
  const subtotal = items.reduce(
    (total, item) => total + (item.product.price ?? 0) * item.quantity,
    0,
  );
  const lines = items.map(
    ({ product, quantity }) =>
      `• ${quantity}x ${product.name} (${product.brand}) — ${formatCurrency((product.price ?? 0) * quantity)}`,
  );
  const message = [
    "Olá! Vim pelo catálogo da Marvel Pharms e gostaria de finalizar este pedido:",
    "",
    ...lines,
    "",
    `Estado de destino: ${state}`,
    `Subtotal dos produtos: ${formatCurrency(subtotal)}`,
    "Frete: a confirmar no atendimento",
  ].join("\n");
  const destination = WHATSAPP_NUMBER ? `https://wa.me/${WHATSAPP_NUMBER}` : "https://wa.me/";
  return `${destination}?text=${encodeURIComponent(message)}`;
}

function getProductVisual(product: Product): ProductVisual | undefined {
  const peptideBase = product.category === "peptideos" ? peptideVisuals[product.brand] : undefined;
  const realImage =
    product.category === "peptideos"
      ? realPeptideImages[`${product.brand}|${product.name}`]
      : undefined;

  return product.category === "emagrecedores"
    ? (weightLossBrandOverrides[`${product.brand}|${product.name}`] ??
        weightLossVisuals[product.name])
    : product.category === "lander-lan"
      ? landerLanVisuals[product.name]
      : product.category === "muscle"
        ? muscleLabsVisuals[product.name]
        : product.category === "king"
          ? kingPharmaVisuals[product.name]
          : product.category === "bratva"
            ? bratvaVisuals[product.name]
            : product.category === "pharmacon"
              ? (pharmaconVisuals[`${product.name}|${product.price}`] ??
                pharmaconVisuals[product.name])
              : product.category === "cooper"
                ? cooperVisuals[product.name]
                : product.category === "oxygen"
                  ? oxygenVisuals[product.name]
                  : product.category === "zphc"
                    ? zphcVisuals[product.name]
                    : product.category === "eminence"
                      ? eminenceVisuals[product.name]
                      : product.category === "alpha"
                        ? alphaVisuals[product.name]
                        : peptideBase
                          ? {
                              ...peptideBase,
                              image: realImage ?? peptideBase.image,
                              isReal: Boolean(realImage),
                            }
                          : undefined;
}

function Brand({ compact = false }: { compact?: boolean }) {
  return (
    <a
      className={`brand ${compact ? "brand-compact" : ""}`}
      href="#inicio"
      aria-label="Marvel Pharms - início"
    >
      <img src="/images/marvel-pharms-logo-transparent.png" alt="Marvel Pharms" />
    </a>
  );
}

function ProductCard({ product, onAddToCart }: { product: Product; onAddToCart: () => void }) {
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
          className={`product-visual ${visual.isReal ? "is-real" : "is-pending"} visual-${visualBrand} presentation-${presentation.kind} variation-${visualVariation}`}
          style={{ "--visual-accent": visual.accent } as CSSProperties}
        >
          <div className="product-visual-badges">
            <span>{product.brand}</span>
            <em>{visual.isReal ? "Foto oficial" : "Imagem ilustrativa"}</em>
          </div>
          <img
            className="product-visual-logo"
            src="/images/marvel-pharms-monogram.png"
            alt=""
            aria-hidden="true"
          />
          <img
            className="product-packshot"
            src={visual.image}
            alt={
              visual.isReal
                ? `${product.name} — embalagem real da linha ${product.brand}`
                : `${product.name} — imagem ilustrativa da linha ${product.brand}`
            }
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
                <strong>{formatCurrency(product.price)}</strong>
              </>
            )}
          </div>
          {soldOut ? (
            <Button
              asChild
              className="whatsapp-button"
              aria-label={`Consultar reposição de ${product.name} pelo WhatsApp`}
            >
              <a href={whatsappUrl(product)} target="_blank" rel="noopener noreferrer">
                <MessageCircle /> Reposição
              </a>
            </Button>
          ) : (
            <Button
              type="button"
              className="add-to-cart-button"
              aria-label={`Adicionar ${product.name} ao carrinho`}
              onClick={onAddToCart}
            >
              <ShoppingBag /> Adicionar ao carrinho
            </Button>
          )}
        </div>
      </div>
    </article>
  );
}

function FeaturedProductCard({
  item,
  index,
  onAddToCart,
}: {
  item: (typeof featuredProducts)[number];
  index: number;
  onAddToCart: () => void;
}) {
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
          <div className="featured-price">
            <span>A partir de</span>
            <strong>{product.price === null ? "Consulte" : formatCurrency(product.price)}</strong>
          </div>
          <Button
            type="button"
            aria-label={`Adicionar ${product.name} ao carrinho`}
            onClick={onAddToCart}
          >
            Adicionar <ShoppingBag />
          </Button>
        </div>
      </div>
    </article>
  );
}

function CartDrawer({
  open,
  items,
  destinationState,
  onDestinationStateChange,
  onChangeQuantity,
  onRemove,
  onClose,
}: {
  open: boolean;
  items: Array<{ product: Product; quantity: number }>;
  destinationState: string;
  onDestinationStateChange: (state: string) => void;
  onChangeQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onClose: () => void;
}) {
  const subtotal = items.reduce(
    (total, item) => total + (item.product.price ?? 0) * item.quantity,
    0,
  );
  const totalUnits = items.reduce((total, item) => total + item.quantity, 0);
  const canFinish = items.length > 0 && Boolean(destinationState);

  return (
    <div className={`cart-layer ${open ? "is-open" : ""}`} aria-hidden={!open}>
      <button
        className="cart-backdrop"
        type="button"
        aria-label="Fechar carrinho"
        onClick={onClose}
      />
      <aside className="cart-drawer" role="dialog" aria-modal="true" aria-labelledby="cart-title">
        <div className="cart-header">
          <div>
            <span>Finalização assistida</span>
            <h2 id="cart-title">Meu pedido</h2>
          </div>
          <button
            type="button"
            className="cart-close"
            onClick={onClose}
            aria-label="Fechar carrinho"
          >
            <X />
          </button>
        </div>

        <div className="cart-content">
          {items.length ? (
            <div className="cart-items" aria-label="Produtos no carrinho">
              {items.map(({ product, quantity }) => {
                const visual = getProductVisual(product);
                return (
                  <article className="cart-item" key={product.id}>
                    <div className="cart-item-image">
                      <img
                        src={visual?.image ?? "/images/marvel-pharms-monogram.png"}
                        alt=""
                        aria-hidden="true"
                      />
                    </div>
                    <div className="cart-item-copy">
                      <span>{product.brand}</span>
                      <h3>{product.name}</h3>
                      <strong>{formatCurrency(product.price ?? 0)}</strong>
                    </div>
                    <div className="cart-item-actions">
                      <div
                        className="quantity-control"
                        aria-label={`Quantidade de ${product.name}`}
                      >
                        <button
                          type="button"
                          onClick={() => onChangeQuantity(product.id, quantity - 1)}
                          aria-label={`Diminuir quantidade de ${product.name}`}
                        >
                          <Minus />
                        </button>
                        <span aria-live="polite">{quantity}</span>
                        <button
                          type="button"
                          onClick={() => onChangeQuantity(product.id, quantity + 1)}
                          aria-label={`Aumentar quantidade de ${product.name}`}
                        >
                          <Plus />
                        </button>
                      </div>
                      <button
                        className="cart-remove"
                        type="button"
                        onClick={() => onRemove(product.id)}
                        aria-label={`Remover ${product.name} do carrinho`}
                      >
                        <Trash2 /> Remover
                      </button>
                    </div>
                    <div className="cart-item-total">
                      {formatCurrency((product.price ?? 0) * quantity)}
                    </div>
                  </article>
                );
              })}
            </div>
          ) : (
            <div className="cart-empty">
              <ShoppingBag />
              <h3>Seu carrinho está vazio</h3>
              <p>Adicione produtos do catálogo para montar seu pedido.</p>
              <Button type="button" onClick={onClose}>
                Continuar comprando
              </Button>
            </div>
          )}

          {items.length > 0 && (
            <>
              <section className="cart-destination" aria-labelledby="destination-title">
                <div className="cart-section-title">
                  <MapPin />
                  <div>
                    <h3 id="destination-title">Destino do pedido</h3>
                    <p>Informe o estado para preparar o atendimento.</p>
                  </div>
                </div>
                <label htmlFor="destination-state">Estado de destino</label>
                <select
                  id="destination-state"
                  value={destinationState}
                  onChange={(event) => onDestinationStateChange(event.target.value)}
                >
                  <option value="">Selecione seu estado</option>
                  {BRAZIL_STATES.map(([code, name]) => (
                    <option value={`${name} (${code})`} key={code}>
                      {name} ({code})
                    </option>
                  ))}
                </select>
                <p className="cart-shipping-note">
                  O frete será confirmado pelo atendimento no WhatsApp.
                </p>
              </section>

              <section className="cart-summary" aria-label="Resumo do pedido">
                <div>
                  <span>Produtos</span>
                  <strong>
                    {totalUnits} {totalUnits === 1 ? "item" : "itens"}
                  </strong>
                </div>
                <div>
                  <span>Subtotal dos produtos</span>
                  <strong>{formatCurrency(subtotal)}</strong>
                </div>
                <div>
                  <span>Frete</span>
                  <strong>A confirmar</strong>
                </div>
                <div className="cart-grand-total">
                  <span>Total dos produtos</span>
                  <strong>{formatCurrency(subtotal)}</strong>
                </div>
              </section>
            </>
          )}
        </div>

        {items.length > 0 && (
          <div className="cart-footer">
            <div>
              <span>Total dos produtos</span>
              <strong>{formatCurrency(subtotal)}</strong>
            </div>
            {canFinish ? (
              <Button asChild className="cart-finish-button">
                <a
                  href={cartWhatsappUrl(items, destinationState)}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageCircle /> Finalizar pedido
                </a>
              </Button>
            ) : (
              <Button type="button" className="cart-finish-button" disabled>
                <MapPin /> Selecione seu estado
              </Button>
            )}
          </div>
        )}
      </aside>
    </div>
  );
}

function Storefront() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [cartHydrated, setCartHydrated] = useState(false);
  const [destinationState, setDestinationState] = useState("");
  const resultsRef = useRef<HTMLElement>(null);
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem("marvel-pharms-cart");
      const savedState = window.localStorage.getItem("marvel-pharms-destination-state");
      if (savedCart) setCart(JSON.parse(savedCart) as Cart);
      if (savedState) setDestinationState(savedState);
    } catch {
      window.localStorage.removeItem("marvel-pharms-cart");
    } finally {
      setCartHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!cartHydrated) return;
    window.localStorage.setItem("marvel-pharms-cart", JSON.stringify(cart));
    window.localStorage.setItem("marvel-pharms-destination-state", destinationState);
  }, [cart, destinationState, cartHydrated]);

  useEffect(() => {
    if (!cartOpen) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setCartOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [cartOpen]);

  const counts = useMemo(
    () =>
      Object.fromEntries(
        categories.map((category) => [
          category.id,
          products.filter((product) => product.category === category.id).length,
        ]),
      ) as Record<Category, number>,
    [],
  );
  const visibleProducts = useMemo(() => {
    if (!selectedCategory && !normalizedQuery) return [];
    return products.filter((product) => {
      const matchesCategory = !selectedCategory || product.category === selectedCategory;
      const searchable =
        `${product.name} ${product.brand} ${categoryLabels[product.category]}`.toLocaleLowerCase(
          "pt-BR",
        );
      return matchesCategory && searchable.includes(normalizedQuery);
    });
  }, [selectedCategory, normalizedQuery]);

  const showResults = selectedCategory !== null || normalizedQuery.length > 0;
  const cartItems = useMemo(
    () =>
      Object.entries(cart)
        .map(([productId, quantity]) => ({
          product: products.find((product) => product.id === productId),
          quantity,
        }))
        .filter(
          (item): item is { product: Product; quantity: number } =>
            Boolean(item.product) && item.quantity > 0,
        ),
    [cart],
  );
  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  const addToCart = (product: Product) => {
    if (product.price === null) return;
    setCart((current) => ({ ...current, [product.id]: (current[product.id] ?? 0) + 1 }));
    setCartOpen(true);
  };

  const changeCartQuantity = (productId: string, quantity: number) => {
    setCart((current) => {
      const next = { ...current };
      if (quantity <= 0) delete next[productId];
      else next[productId] = quantity;
      return next;
    });
  };

  const removeFromCart = (productId: string) => {
    setCart((current) => {
      const next = { ...current };
      delete next[productId];
      return next;
    });
  };
  const scrollTo = (element: HTMLElement | null) =>
    element?.scrollIntoView({
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
      block: "start",
    });

  const chooseCategory = (category: Category) => {
    setSelectedCategory(category);
    setQuery("");
    window.setTimeout(() => scrollTo(resultsRef.current), 0);
  };

  const resetCatalog = () => {
    setSelectedCategory(null);
    setQuery("");
    window.setTimeout(() => scrollTo(document.querySelector<HTMLElement>("#categorias")), 0);
  };

  return (
    <div className="site-shell">
      <header className="site-header" id="inicio">
        <div className="container header-inner">
          <Brand compact />
          <nav aria-label="Navegação principal">
            <a href="#categorias">Categorias</a>
            <button
              type="button"
              className="header-cart"
              onClick={() => setCartOpen(true)}
              aria-label={`Abrir carrinho com ${cartCount} ${cartCount === 1 ? "item" : "itens"}`}
            >
              <ShoppingBag />
              <span>Carrinho</span>
              <strong aria-live="polite">{cartCount}</strong>
            </button>
            <a
              className="header-whatsapp"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
            >
              <MessageCircle /> Atendimento
            </a>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero">
          <div className="hero-orbit hero-orbit-one" aria-hidden="true" />
          <div className="hero-orbit hero-orbit-two" aria-hidden="true" />
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow">
                <span /> Catálogo Marvel Pharms
              </div>
              <h1>
                Performance começa com a <span>escolha certa.</span>
              </h1>
              <p>
                Navegue pelas categorias, encontre o produto que procura e finalize seu atendimento
                de forma rápida e personalizada pelo WhatsApp.
              </p>
              <div className="hero-actions">
                <Button
                  size="lg"
                  onClick={() => scrollTo(document.querySelector<HTMLElement>("#categorias"))}
                >
                  Explorar categorias <ArrowRight />
                </Button>
                <a
                  className="text-link"
                  href={whatsappUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Falar com um atendente <ChevronRight />
                </a>
              </div>
              <div className="hero-trust">
                <span>
                  <Check /> 333 produtos
                </span>
                <span>
                  <Check /> 15 categorias
                </span>
                <span>
                  <Check /> Atendimento direto
                </span>
              </div>
            </div>
            <div
              className="hero-visual"
              aria-label="Marvel Pharms — Ciência, Performance, Resultados"
            >
              <div className="hero-logo-wrap">
                <img
                  src="/images/marvel-pharms-athlete-hero.png"
                  alt="Atleta em treinamento de alta performance"
                />
                <div className="hero-image-meta" aria-hidden="true">
                  <span>Curadoria especializada</span>
                  <strong>Marvel / 2026</strong>
                </div>
              </div>
              <div className="hero-vertical-label" aria-hidden="true">
                Catálogo de alta performance
              </div>
              <div className="hero-stamp">
                <Sparkles />
                <span>
                  Ciência
                  <br />
                  Performance
                  <br />
                  Resultados
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="signal-strip" aria-label="Informações do catálogo">
          <div className="signal-track">
            <span>333 produtos</span>
            <i />
            <span>15 categorias</span>
            <i />
            <span>Atendimento direto</span>
            <i />
            <span>Consulta de disponibilidade</span>
            <i />
            <span>Pedidos pelo WhatsApp</span>
            <i />
          </div>
        </div>

        <section className="featured-section" aria-labelledby="featured-title">
          <div className="container">
            <div className="featured-heading">
              <div>
                <div className="eyebrow">
                  <span /> Curadoria Marvel
                </div>
                <h2 id="featured-title">Produtos em destaque</h2>
              </div>
              <p>
                Uma seleção do catálogo para você começar. Consulte disponibilidade e finalize o
                atendimento pelo WhatsApp.
              </p>
            </div>
            <div className="featured-grid">
              {featuredProducts.map((item, index) => (
                <FeaturedProductCard
                  item={item}
                  index={index}
                  key={item.product.id}
                  onAddToCart={() => addToCart(item.product)}
                />
              ))}
            </div>
            <div className="featured-note">
              <ShieldCheck /> Imagens de referência. Confirme apresentação, disponibilidade e
              exigência de prescrição com o atendimento.
            </div>
          </div>
        </section>

        <section className="category-section" id="categorias" aria-labelledby="categories-title">
          <div className="container">
            <div className="section-heading">
              <div>
                <div className="eyebrow">
                  <span /> Navegue do seu jeito
                </div>
                <h2 id="categories-title">Escolha uma categoria</h2>
                <p>
                  Explore nossa curadoria por objetivo, laboratório ou tipo de produto.
                </p>
              </div>
              <label className="search-field">
                <Search aria-hidden="true" />
                <input
                  type="search"
                  aria-label="Buscar produto em todas as categorias"
                  placeholder="Já sabe o nome? Busque aqui"
                  value={query}
                  onChange={(event) => {
                    setQuery(event.target.value);
                    if (event.target.value) setSelectedCategory(null);
                  }}
                />
                {query && (
                  <button type="button" aria-label="Limpar busca" onClick={() => setQuery("")}>
                    <X />
                  </button>
                )}
              </label>
            </div>

            <div className="category-grid">
              {categories.map((category, index) => (
                <button
                  type="button"
                  className="category-card"
                  onClick={() => chooseCategory(category.id)}
                  key={category.id}
                >
                  <div className="category-number">{String(index + 1).padStart(2, "0")}</div>
                  <div className="category-symbol" aria-hidden="true">
                    {category.shortLabel.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="category-copy">
                    <h3>{category.label}</h3>
                    <p>{categoryDescriptions[category.id]}</p>
                  </div>
                  <div className="category-meta">
                    <span>
                      {counts[category.id]} {counts[category.id] === 1 ? "produto" : "produtos"}
                    </span>
                    <ArrowRight />
                  </div>
                </button>
              ))}
            </div>
          </div>
        </section>

        {showResults && (
          <section className="products-section" ref={resultsRef} aria-labelledby="products-title">
            <div className="container">
              <div className="products-heading">
                <button type="button" className="back-button" onClick={resetCatalog}>
                  <ArrowLeft /> Todas as categorias
                </button>
                <div>
                  <span>{normalizedQuery ? "Resultado da busca" : "Categoria selecionada"}</span>
                  <h2 id="products-title">
                    {normalizedQuery
                      ? `“${query.trim()}”`
                      : selectedCategory && categoryLabels[selectedCategory]}
                  </h2>
                </div>
                <strong>
                  {visibleProducts.length} {visibleProducts.length === 1 ? "produto" : "produtos"}
                </strong>
              </div>
              {visibleProducts.length ? (
                <div className="product-grid">
                  {visibleProducts.map((product) => (
                    <ProductCard
                      product={product}
                      key={product.id}
                      onAddToCart={() => addToCart(product)}
                    />
                  ))}
                </div>
              ) : (
                <div className="empty-state">
                  <Search />
                  <h3>Nenhum produto encontrado</h3>
                  <p>Tente outro nome ou volte para escolher uma categoria.</p>
                  <Button onClick={resetCatalog}>Ver categorias</Button>
                </div>
              )}
            </div>
          </section>
        )}

        <section className="journey-section" aria-labelledby="journey-title">
          <div className="container journey-layout">
            <div className="journey-heading">
              <div className="eyebrow">
                <span /> Simples e direto
              </div>
              <h2 id="journey-title">Seu pedido em três passos.</h2>
            </div>
            <div className="journey-steps">
              <div>
                <strong>01</strong>
                <span>Explore</span>
                <p>Escolha uma categoria ou busque pelo nome.</p>
              </div>
              <div>
                <strong>02</strong>
                <span>Consulte</span>
                <p>Veja o valor e confirme a disponibilidade.</p>
              </div>
              <div>
                <strong>03</strong>
                <span>Converse</span>
                <p>Finalize o atendimento diretamente no WhatsApp.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="service-section">
          <div className="container service-grid">
            <div className="service-mark">
              <MessageCircle />
            </div>
            <div>
              <span>Atendimento pessoal</span>
              <h2>Da escolha ao pedido, fale com a gente.</h2>
            </div>
            <p>
              Consulte disponibilidade, envio e tire suas dúvidas diretamente com nosso atendimento.
            </p>
            <Button asChild size="lg">
              <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                Chamar no WhatsApp <ArrowRight />
              </a>
            </Button>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-main">
          <Brand />
          <p>
            Catálogo informativo. Preços e disponibilidade podem mudar. Consulte as exigências de
            prescrição e procure orientação de um profissional de saúde.
          </p>
          <div className="footer-seal">
            <ShieldCheck /> Atendimento finalizado pelo WhatsApp
          </div>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Marvel Pharms</span>
          <span>Ciência · Performance · Resultados</span>
        </div>
      </footer>

      <a
        className="floating-whatsapp"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Marvel Pharms pelo WhatsApp"
      >
        <MessageCircle />
        <span>Atendimento</span>
      </a>

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        destinationState={destinationState}
        onDestinationStateChange={setDestinationState}
        onChangeQuantity={changeCartQuantity}
        onRemove={removeFromCart}
        onClose={() => setCartOpen(false)}
      />
    </div>
  );
}
