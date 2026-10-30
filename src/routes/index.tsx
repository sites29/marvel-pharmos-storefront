import { createFileRoute } from "@tanstack/react-router";
import { useCallback, useEffect, useMemo, useRef, useState, type CSSProperties } from "react";
import {
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  Check,
  ChevronRight,
  MapPin,
  MessageCircle,
  Minus,
  Plus,
  Search,
  ShieldCheck,
  ShoppingBag,
  Trash2,
  X,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import Scanner from "@/components/Scanner";
import { categories, categoryLabels, products, type Category, type Product } from "@/data/products";

function WhatsAppIcon() {
  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.966-.273-.099-.471-.148-.67.15-.198.296-.767.965-.94 1.164-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.787-1.48-1.758-1.653-2.055-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.52.149-.174.198-.298.297-.496.099-.198.05-.371-.025-.52-.074-.149-.669-1.611-.916-2.206-.242-.579-.487-.5-.669-.51-.173-.009-.371-.01-.57-.01-.198 0-.52.074-.792.371s-1.04 1.015-1.04 2.478 1.065 2.875 1.213 3.073c.149.198 2.096 3.2 5.078 4.487.709.306 1.263.489 1.694.625.712.227 1.36.195 1.872.118.571-.085 1.758-.718 2.006-1.412.248-.694.248-1.288.173-1.412-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.002-5.44 4.428-9.866 9.871-9.866a9.8 9.8 0 0 1 6.977 2.89 9.8 9.8 0 0 1 2.889 6.981c-.002 5.44-4.428 9.867-9.863 9.867m8.411-19.801A11.79 11.79 0 0 0 12.05 0C5.495 0 .16 5.335.158 11.893c0 2.096.547 4.143 1.588 5.946L.057 24l6.305-1.654a11.88 11.88 0 0 0 5.683 1.448h.005c6.557 0 11.892-5.335 11.895-11.893A11.82 11.82 0 0 0 20.4 3.488 11.82 11.82 0 0 0 12.05 0" />
    </svg>
  );
}

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Marvel Pharms | Catálogo de produtos" },
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

const WHATSAPP_NUMBER = "553175566615";

const DELIVERY_CITIES = [
  "Belo Horizonte",
  "Baldim",
  "Betim",
  "Brumadinho",
  "Caeté",
  "Capim Branco",
  "Confins",
  "Contagem",
  "Esmeraldas",
  "Florestal",
  "Ibirité",
  "Igarapé",
  "Itaguara",
  "Itatiaiuçu",
  "Jaboticatubas",
  "Juatuba",
  "Lagoa Santa",
  "Mário Campos",
  "Mateus Leme",
  "Matozinhos",
  "Nova Lima",
  "Nova União",
  "Pedro Leopoldo",
  "Raposos",
  "Ribeirão das Neves",
  "Rio Acima",
  "Rio Manso",
  "Sabará",
  "Santa Luzia",
  "São Joaquim de Bicas",
  "São José da Lapa",
  "Sarzedo",
  "Taquaraçu de Minas",
  "Vespasiano",
] as const;
const CATEGORY_GROUP_SIZE = 5;
const categoryGroups = Array.from({ length: 3 }, (_, index) =>
  categories.slice(index * CATEGORY_GROUP_SIZE, (index + 1) * CATEGORY_GROUP_SIZE),
);

type Cart = Record<string, number>;
type DeliveryDetails = {
  firstName: string;
  lastName: string;
  postalCode: string;
  street: string;
  number: string;
  neighborhood: string;
  complement: string;
};
type ProductVisual = {
  image: string;
  accent: string;
  isReal: boolean;
  isReference?: boolean;
  isIllustrativeVial?: boolean;
  isEditedReference?: boolean;
};

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
  "Oxygen|GHK-CU 50MG": "/images/products/peptides/real/oxygen-br-ghk-cu-50.png",
  "Oxygen|GHK-CU 100MG": "/images/products/peptides/real/oxygen-br-ghk-cu-100.png",
  "Oxygen|GHK-CU 100MG caneta": "/images/products/peptides/real/oxygen-br-ghk-cu-100-pen.png",
  "Oxygen|KPV": "/images/products/peptides/real/oxygen-br-kpv.png",
  "Oxygen|MOTS-C": "/images/products/peptides/real/oxygen-br-mots-c.png",
  "Oxygen|Epithalon": "/images/products/peptides/real/oxygen-br-epithalon.png",
  "Oxygen|GLOW": "/images/products/peptides/real/oxygen-br-glow.png",
  "Oxygen|PT-141": "/images/products/peptides/real/oxygen-br-pt-141.png",
  "Oxygen|TB-500 + BPC-157": "/images/products/peptides/real/oxygen-br-tb-bpc.png",
  "Oxygen|NAD+ + Vitamina B12": "/images/products/peptides/real/oxygen-br-nad-b12.png",
  "Oxygen|Semax 10MG": "/images/products/peptides/real/oxygen-br-semax.png",
  "Oxygen|Selank 10MG": "/images/products/peptides/real/oxygen-br-selank.png",
  "Alluvi|GLOW caneta": "/images/products/peptides/real/alluvi-glow-caneta-transparent.png",
  "World|Selank 10MG": "/images/products/peptides/real/peptidesworld-selank-10.png",
  "World|Ipamorelin 10MG": "/images/products/peptides/real/peptidesworld-ipamorelin-10.png",
  "World|PT-141 10MG": "/images/products/peptides/real/peptidesworld-pt-141-10.png",
  "World|TB-500": "/images/products/peptides/real/peptidesworld-tb-500-10.png",
  "World|BPC-157 10MG": "/images/products/peptides/real/peptidesworld-bpc-157-10.png",
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

const referencePeptideImages: Record<string, string> = {
  "Core|SLU-PP-332 comprimidos": "/images/products/peptides/real/core-slu-pp-332-comprimidos-reference.png",
  "Core|SLU-PP-332 mamadeira 30ML": "/images/products/peptides/real/core-slu-pp-332-mamadeira-30ml-reference.png",
  "Core|SLU-PP-332 10MG subcutâneo": "/images/products/peptides/real/core-slu-pp-332-10mg-subcutaneo-reference.png",
  "USA Importados|KLOW 80MG": "/images/products/peptides/real/pepsynth-klow-80.webp",
  "USA Importados|BPC-157 10MG": "/images/products/peptides/real/pepsynth-bpc-157-10.webp",
  "USA Importados|Selank 10MG": "/images/products/peptides/real/pepsynth-selank-10.png",
  "Neopep|GHK-CU 100MG": "/images/products/peptides/cutouts/neopep.png",
  "World|Semax 10MG": "/images/products/peptides/real/peptidesworld-semax-30.png",
  "World|NAD+ 500MG": "/images/products/peptides/real/peptidesworld-nad-100.png",
  "World|CJC-1295 com DAC + Ipamorelin 5MG": "/images/products/peptides/real/peptidesworld-cjc-ipamorelin-5-5.png",
  "World|Epitalon 50MG": "/images/products/peptides/real/peptidesworld-epitalon-10.png",
  "World|Tesamorelin 10MG": "/images/products/peptides/real/peptidesworld-tesamorelin-5.png",
  "World|CJC-1295 DAC": "/images/products/peptides/real/peptidesworld-cjc-1295-dac-2.png",
  "World|GHRP-6 5MG": "/images/products/peptides/real/peptidesworld-ghrp-6-10.png",
};

const illustrativePeptideImages: Record<string, string> = {
  "USA Importados|CJC-1295 sem DAC 10MG": "/images/products/peptides/real/pepsynth-cjc-no-dac-10-illustrative.png",
  "USA Importados|Epithalon 50MG": "/images/products/peptides/real/pepsynth-epithalon-50-illustrative.png",
  "USA Importados|GHRP-6 5MG": "/images/products/peptides/illustrative/usa-ghrp-6-5mg.png",
  "USA Importados|SLU-PP-332 injetável 10MG": "/images/products/peptides/illustrative/usa-slu-pp-332-injetavel-10mg.png",
  "USA Importados|HGH Frag 10MG": "/images/products/peptides/illustrative/usa-hgh-frag-10mg.png",
  "USA Importados|TB-500 10MG": "/images/products/peptides/real/pepsynth-tb-500-10-illustrative.png",
  "USA Importados|Ipamorelin 5MG": "/images/products/peptides/real/pepsynth-ipamorelin-5-illustrative.png",
  "USA Importados|SS-31 10MG": "/images/products/peptides/illustrative/usa-ss-31-10mg.png",
  "World|KLOW 70MG": "/images/products/peptides/illustrative/world-klow-70mg.png?v=2",
  "World|SLU-PP-332 injetável": "/images/products/peptides/illustrative/world-slu-pp-332-injetavel.png?v=2",
};

const editedPepsynthReferences = new Set([
  "USA Importados|CJC-1295 sem DAC 10MG",
  "USA Importados|Epithalon 50MG",
  "USA Importados|TB-500 10MG",
  "USA Importados|Ipamorelin 5MG",
]);

const weightLossVisuals: Record<string, ProductVisual> = {
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
  "Tirzepatida 30MG": {
    image: "/images/products/weight-loss/real/tirzepatide-usa-30mg-illustrative.png?v=2",
    accent: "#b99a62",
    isReal: false,
  },
  "Tirzepatida 60MG": {
    image: "/images/products/weight-loss/real/tirzepatide-usa-60mg-transparent.png",
    accent: "#b99a62",
    isReal: true,
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
    image: "/images/products/weight-loss/real/oxygen-br-tirzegen-60.png",
    accent: "#416fe7",
    isReal: true,
  },
  "Tirzepatida 60MG caixa com 4 bujões": {
    image: "/images/products/weight-loss/real/oxygen-br-tirzegen-60.png",
    accent: "#416fe7",
    isReal: false,
    isReference: true,
  },
  "Tirzepatida caneta 60MG": {
    image: "/images/products/weight-loss/real/oxygen-br-tirzegen-60-pen.png",
    accent: "#416fe7",
    isReal: true,
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
    image: "/images/products/weight-loss/real/oxygen-br-retagen-40.png",
    accent: "#416fe7",
    isReal: false,
    isReference: true,
  },
  "Retatrutida 40MG caneta": {
    image: "/images/products/weight-loss/real/oxygen-br-retagen-40-pen.png",
    accent: "#416fe7",
    isReal: true,
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

const landerLanGoldVisuals: Record<string, ProductVisual> = {
  "Deca 10ML - 100MG": {
    image: "/images/products/lander-lan-gold/real/deca-reference.png",
    accent: "#c69a2d",
    isReal: false,
    isReference: true,
  },
  "Enantato 10ML - 100MG": {
    image: "/images/products/lander-lan-gold/real/enantato-reference.png",
    accent: "#c69a2d",
    isReal: false,
    isReference: true,
  },
  "Cipionato 10ML - 100MG": {
    image: "/images/products/lander-lan-gold/real/cipionato-reference.png",
    accent: "#c69a2d",
    isReal: false,
    isReference: true,
  },
  "Boldenona 10ML - 100MG": {
    image: "/images/products/lander-lan-gold/real/boldenona-reference.png",
    accent: "#c69a2d",
    isReal: false,
    isReference: true,
  },
  "Masteron 10ML - 100MG": {
    image: "/images/products/lander-lan-gold/real/masteron.png",
    accent: "#c69a2d",
    isReal: true,
  },
  "Dura 10ML - 100MG": {
    image: "/images/products/lander-lan-gold/real/dura-reference.png",
    accent: "#c69a2d",
    isReal: false,
    isReference: true,
  },
  "Trembo Acetato 10ML - 100MG": {
    image: "/images/products/lander-lan-gold/real/trembo-acetato.png",
    accent: "#c69a2d",
    isReal: true,
  },
  "Trembo Enantato 10ML - 100MG": {
    image: "/images/products/lander-lan-gold/real/trembo-enantato-reference.png",
    accent: "#c69a2d",
    isReal: false,
    isReference: true,
  },
  "NPP 10ML - 100MG": {
    image: "/images/products/lander-lan-gold/real/npp.png",
    accent: "#c69a2d",
    isReal: true,
  },
  "Tri-Trembo 10ML - 100MG": {
    image: "/images/products/lander-lan-gold/real/tri-trembo-reference.png",
    accent: "#c69a2d",
    isReal: false,
    isReference: true,
  },
  "Primabolan 10ML - 100MG": {
    image: "/images/products/lander-lan-gold/real/primabolan.png",
    accent: "#c69a2d",
    isReal: true,
  },
  "HCG 5000UI": {
    image: "/images/products/lander-lan-gold/real/hcg-5000ui.png",
    accent: "#c69a2d",
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
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function cartWhatsappUrl(
  items: Array<{ product: Product; quantity: number }>,
  city: string,
  delivery: DeliveryDetails,
) {
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
    "Dados para entrega:",
    `Nome: ${delivery.firstName.trim()} ${delivery.lastName.trim()}`,
    `CEP: ${delivery.postalCode}`,
    `Endereço: ${delivery.street.trim()}, nº ${delivery.number.trim()}`,
    ...(delivery.complement.trim() ? [`Complemento: ${delivery.complement.trim()}`] : []),
    `Bairro: ${delivery.neighborhood.trim()}`,
    `Cidade de entrega: ${city} (MG)`,
    "",
    `Subtotal dos produtos: ${formatCurrency(subtotal)}`,
    "Frete: a confirmar no atendimento",
  ].join("\n");
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}

function getProductVisual(product: Product): ProductVisual | undefined {
  const peptideBase = product.category === "peptideos" ? peptideVisuals[product.brand] : undefined;
  const realImage =
    product.category === "peptideos"
      ? realPeptideImages[`${product.brand}|${product.name}`]
      : undefined;
  const referenceImage =
    product.category === "peptideos"
      ? referencePeptideImages[`${product.brand}|${product.name}`]
      : undefined;
  const illustrativeImage =
    product.category === "peptideos"
      ? illustrativePeptideImages[`${product.brand}|${product.name}`]
      : undefined;

  if (product.category === "lander-lan-gold") {
    return landerLanGoldVisuals[product.name];
  }

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
                              image: realImage ?? referenceImage ?? illustrativeImage ?? peptideBase.image,
                              isReal: Boolean(realImage),
                              isReference: Boolean(referenceImage && !realImage),
                              isIllustrativeVial: Boolean(illustrativeImage && !realImage && !referenceImage),
                              isEditedReference: editedPepsynthReferences.has(`${product.brand}|${product.name}`),
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
          className={`product-visual ${visual.isReal ? "is-real" : "is-pending"} ${visual.isIllustrativeVial ? "is-illustrative-vial" : ""} visual-${visualBrand} presentation-${presentation.kind} variation-${visualVariation}`}
          style={{ "--visual-accent": visual.accent } as CSSProperties}
        >
          <div className="product-visual-badges">
            <span>{product.brand}</span>
            <em>
              {visual.isReal
                ? product.brand === "Oxygen" &&
                  (product.category === "peptideos" || product.category === "emagrecedores")
                  ? "Foto da loja · recorte"
                  : "Foto oficial"
                : visual.isReference
                  ? "Imagem de referência"
                  : visual.isEditedReference
                    ? "Montagem ilustrativa"
                    : "Imagem ilustrativa"}
            </em>
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
                ? product.brand === "Oxygen" &&
                  (product.category === "peptideos" || product.category === "emagrecedores")
                  ? `${product.name} — recorte da foto da loja Oxygen KW Pharma Brasil`
                  : `${product.name} — embalagem real da linha ${product.brand}`
                : visual.isReference
                  ? `${product.name} — imagem de referência da linha ${product.brand}; apresentação pode variar`
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
        {(visual?.isReference || visual?.isIllustrativeVial) &&
          (product.category === "peptideos" || product.category === "emagrecedores") && (
          <small className="product-reference-note">
            {product.brand === "Oxygen" && product.category === "emagrecedores" && visual.isReference
              ? "Foto de referência da caixa com 1 frasco; confirme a apresentação com 4 frascos no atendimento."
              : visual.isEditedReference
              ? "Montagem baseada em foto PepSynth Labs; rótulo e dose alterados digitalmente. Confirme a embalagem real."
              : product.brand === "Core" && product.name.startsWith("SLU-PP-332") && visual.isReference
                ? "Imagem de referência enviada pelo cliente; o frasco mostrado é de outra marca, não da Core."
              : product.brand === "USA Importados" && visual.isReference
                ? "Foto PepSynth Labs de referência; o fabricante do item anunciado não foi confirmado."
                : product.brand === "USA Importados" && visual.isIllustrativeVial
                  ? "Frasco ilustrativo sem fabricante confirmado; a embalagem real pode variar."
                  : visual.isIllustrativeVial
                    ? "Frasco ilustrativo; a embalagem real pode variar."
                    : product.brand === "World"
                ? "Foto de referência da marca; confirme composição, dose e embalagem no atendimento."
                : "Foto de referência; produto e embalagem podem variar."}
          </small>
        )}
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

function CartDrawer({
  open,
  items,
  deliveryCity,
  onDeliveryCityChange,
  onChangeQuantity,
  onRemove,
  onClose,
  onBrowse,
}: {
  open: boolean;
  items: Array<{ product: Product; quantity: number }>;
  deliveryCity: string;
  onDeliveryCityChange: (city: string) => void;
  onChangeQuantity: (productId: string, quantity: number) => void;
  onRemove: (productId: string) => void;
  onClose: () => void;
  onBrowse: () => void;
}) {
  const [deliveryDetails, setDeliveryDetails] = useState<DeliveryDetails>({
    firstName: "",
    lastName: "",
    postalCode: "",
    street: "",
    number: "",
    neighborhood: "",
    complement: "",
  });
  const subtotal = items.reduce(
    (total, item) => total + (item.product.price ?? 0) * item.quantity,
    0,
  );
  const totalUnits = items.reduce((total, item) => total + item.quantity, 0);
  const updateDelivery = (field: keyof DeliveryDetails, value: string) => {
    setDeliveryDetails((current) => ({ ...current, [field]: value }));
  };
  const handleFinishOrder = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length || !DELIVERY_CITIES.some((city) => city === deliveryCity)) return;
    window.open(cartWhatsappUrl(items, deliveryCity, deliveryDetails), "_blank", "noopener,noreferrer");
  };

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
              <div className="cart-empty-art" aria-hidden="true">
                <span className="cart-empty-orbit" />
                <span className="cart-empty-icon"><ShoppingBag /></span>
                <span className="cart-empty-count">00 <small>ITENS</small></span>
              </div>
              <div className="cart-empty-copy">
                <span className="cart-empty-eyebrow">SEU PONTO DE PARTIDA</span>
                <h3>Seu carrinho<br /><span>está vazio.</span></h3>
                <p>Escolha os produtos no catálogo. Eles aparecerão aqui para você revisar antes de falar com a nossa equipe.</p>
              </div>
              <Button type="button" className="cart-empty-cta" onClick={onBrowse}>
                Explorar catálogo <ArrowRight />
              </Button>
              <p className="cart-empty-note">{categories.length} categorias para explorar <span>·</span> Atendimento pelo WhatsApp</p>
            </div>
          )}

          {items.length > 0 && (
            <>
              <section className="cart-destination" aria-labelledby="destination-title">
                <div className="cart-section-title">
                  <MapPin />
                  <div>
                    <h3 id="destination-title">Dados para entrega</h3>
                    <p>Preencha seus dados para enviar o pedido à nossa equipe.</p>
                  </div>
                </div>
                <form id="delivery-form" className="cart-delivery-form" onSubmit={handleFinishOrder}>
                  <div className="cart-field">
                    <label htmlFor="delivery-first-name">Nome</label>
                    <input id="delivery-first-name" name="given-name" autoComplete="given-name" required maxLength={60} value={deliveryDetails.firstName} onChange={(event) => updateDelivery("firstName", event.target.value)} placeholder="Seu nome" />
                  </div>
                  <div className="cart-field">
                    <label htmlFor="delivery-last-name">Sobrenome</label>
                    <input id="delivery-last-name" name="family-name" autoComplete="family-name" required maxLength={80} value={deliveryDetails.lastName} onChange={(event) => updateDelivery("lastName", event.target.value)} placeholder="Seu sobrenome" />
                  </div>
                  <div className="cart-field">
                    <label htmlFor="delivery-postal-code">CEP</label>
                    <input id="delivery-postal-code" name="postal-code" autoComplete="postal-code" inputMode="numeric" required pattern="[0-9]{5}-[0-9]{3}" title="Digite um CEP com 8 números" maxLength={9} value={deliveryDetails.postalCode} onChange={(event) => { const digits = event.target.value.replace(/\D/g, "").slice(0, 8); updateDelivery("postalCode", digits.length > 5 ? `${digits.slice(0, 5)}-${digits.slice(5)}` : digits); }} placeholder="00000-000" />
                  </div>
                  <div className="cart-field">
                    <label htmlFor="delivery-city">Cidade de entrega</label>
                    <select id="delivery-city" name="address-level2" autoComplete="address-level2" required value={deliveryCity} onChange={(event) => onDeliveryCityChange(event.target.value)}>
                      <option value="">Selecione sua cidade</option>
                      {DELIVERY_CITIES.map((city) => (
                        <option value={city} key={city}>{city}</option>
                      ))}
                    </select>
                  </div>
                  <div className="cart-field cart-field-wide">
                    <label htmlFor="delivery-street">Endereço</label>
                    <input id="delivery-street" name="street-address" autoComplete="address-line1" required maxLength={120} value={deliveryDetails.street} onChange={(event) => updateDelivery("street", event.target.value)} placeholder="Rua ou avenida" />
                  </div>
                  <div className="cart-field">
                    <label htmlFor="delivery-number">Número</label>
                    <input id="delivery-number" name="house-number" required maxLength={12} value={deliveryDetails.number} onChange={(event) => updateDelivery("number", event.target.value)} placeholder="Ex.: 123" />
                  </div>
                  <div className="cart-field">
                    <label htmlFor="delivery-neighborhood">Bairro</label>
                    <input id="delivery-neighborhood" name="neighborhood" required maxLength={80} value={deliveryDetails.neighborhood} onChange={(event) => updateDelivery("neighborhood", event.target.value)} placeholder="Seu bairro" />
                  </div>
                  <div className="cart-field cart-field-wide">
                    <label htmlFor="delivery-complement">Complemento <span>(opcional)</span></label>
                    <input id="delivery-complement" name="address-line2" autoComplete="address-line2" maxLength={100} value={deliveryDetails.complement} onChange={(event) => updateDelivery("complement", event.target.value)} placeholder="Apartamento, bloco, casa..." />
                  </div>
                </form>
                <p className="cart-shipping-note">
                  Seus dados serão incluídos na mensagem do pedido. Disponibilidade de entrega e frete são confirmados pelo atendimento no WhatsApp.
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
            <Button type="submit" form="delivery-form" className="cart-finish-button">
              <MessageCircle /> Finalizar pedido
            </Button>
          </div>
        )}
      </aside>
    </div>
  );
}

function CategoryCard({
  category,
  index,
  count,
  onSelect,
}: {
  category: (typeof categories)[number];
  index: number;
  count: number;
  onSelect: (category: Category) => void;
}) {
  return (
    <Button
      variant="ghost"
      type="button"
      className="category-card"
      onClick={() => onSelect(category.id)}
    >
      <div className="category-card-top">
        <span className="category-number">{String(index + 1).padStart(2, "0")} / {String(categories.length).padStart(2, "0")}</span>
        <span className="category-count">{count} {count === 1 ? "produto" : "produtos"}</span>
      </div>
      <div className="category-copy">
        <h3>{category.label}</h3>
        <p>{categoryDescriptions[category.id]}</p>
      </div>
      <div className="category-card-bottom">
        <span>Explorar seleção</span>
        <span className="category-card-arrow"><ArrowRight /></span>
      </div>
    </Button>
  );
}

function CategoryCarousel({
  group,
  groupIndex,
  counts,
  onSelect,
}: {
  group: (typeof categories)[number][];
  groupIndex: number;
  counts: Record<Category, number>;
  onSelect: (category: Category) => void;
}) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const startIndex = groupIndex * CATEGORY_GROUP_SIZE;

  const goTo = (index: number) => {
    const track = trackRef.current;
    const target = track?.children.item(index) as HTMLElement | null;
    const first = track?.children.item(0) as HTMLElement | null;
    if (!track || !target || !first) return;
    track.scrollTo({
      left: target.offsetLeft - first.offsetLeft,
      behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth",
    });
    setActiveIndex(index);
  };

  const updateActiveIndex = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const cards = Array.from(track.children) as HTMLElement[];
    if (cards.length === 0) return;
    const firstOffset = cards[0]?.offsetLeft ?? 0;
    const nextIndex = cards.reduce(
      (closest, card, index) => {
        const closestCard = cards[closest];
        return closestCard &&
          Math.abs(card.offsetLeft - firstOffset - track.scrollLeft) <
            Math.abs(closestCard.offsetLeft - firstOffset - track.scrollLeft)
          ? index
          : closest;
      },
      0,
    );
    setActiveIndex(nextIndex);
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const observer = new ResizeObserver(updateActiveIndex);
    observer.observe(track);
    const frame = window.requestAnimationFrame(updateActiveIndex);
    window.addEventListener("pageshow", updateActiveIndex);
    return () => {
      observer.disconnect();
      window.cancelAnimationFrame(frame);
      window.removeEventListener("pageshow", updateActiveIndex);
    };
  }, [updateActiveIndex]);

  return (
    <section className="category-carousel" aria-label={`Categorias ${startIndex + 1} a ${startIndex + group.length}`}>
      <div className="category-carousel-heading">
        <div>
          <span>SELEÇÃO {String(groupIndex + 1).padStart(2, "0")} / 03</span>
          <strong>Categorias {String(startIndex + 1).padStart(2, "0")}–{String(startIndex + group.length).padStart(2, "0")}</strong>
        </div>
        <div className="category-carousel-controls">
          <span aria-live="polite">{String(activeIndex + 1).padStart(2, "0")} / {String(group.length).padStart(2, "0")}</span>
          <Button variant="ghost" type="button" aria-label={`Categoria anterior da seleção ${groupIndex + 1}`} disabled={activeIndex === 0} onClick={() => goTo(activeIndex - 1)}><ArrowLeft /></Button>
          <Button variant="ghost" type="button" aria-label={`Próxima categoria da seleção ${groupIndex + 1}`} disabled={activeIndex === group.length - 1} onClick={() => goTo(activeIndex + 1)}><ArrowRight /></Button>
        </div>
      </div>
      <div className="category-carousel-track" ref={trackRef} onScroll={updateActiveIndex}>
        {group.map((category, index) => (
          <CategoryCard key={category.id} category={category} index={startIndex + index} count={counts[category.id]} onSelect={onSelect} />
        ))}
      </div>
    </section>
  );
}

function Storefront() {
  const [query, setQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);
  const [cart, setCart] = useState<Cart>({});
  const [cartOpen, setCartOpen] = useState(false);
  const [cartHydrated, setCartHydrated] = useState(false);
  const [deliveryCity, setDeliveryCity] = useState("");
  const [headerScrolled, setHeaderScrolled] = useState(false);
  const [activeNav, setActiveNav] = useState<"inicio" | "categorias">("inicio");
  const [showCatalogReturn, setShowCatalogReturn] = useState(false);
  const resultsRef = useRef<HTMLElement>(null);
  const normalizedQuery = query.trim().toLocaleLowerCase("pt-BR");

  useEffect(() => {
    let frame = 0;
    const updateHeader = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        setHeaderScrolled(window.scrollY > 24);
        const categoryTop = document.querySelector<HTMLElement>("#categorias")?.getBoundingClientRect().top;
        setActiveNav(categoryTop !== undefined && categoryTop <= 160 ? "categorias" : "inicio");
      });
    };
    updateHeader();
    window.addEventListener("scroll", updateHeader, { passive: true });
    window.addEventListener("resize", updateHeader);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateHeader);
      window.removeEventListener("resize", updateHeader);
    };
  }, []);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem("marvel-pharms-cart");
      const savedCity = window.localStorage.getItem("marvel-pharms-delivery-city");
      if (savedCart) setCart(JSON.parse(savedCart) as Cart);
      if (savedCity && DELIVERY_CITIES.some((city) => city === savedCity)) setDeliveryCity(savedCity);
    } catch {
      window.localStorage.removeItem("marvel-pharms-cart");
    } finally {
      setCartHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (!cartHydrated) return;
    window.localStorage.setItem("marvel-pharms-cart", JSON.stringify(cart));
    window.localStorage.setItem("marvel-pharms-delivery-city", deliveryCity);
  }, [cart, deliveryCity, cartHydrated]);

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

  useEffect(() => {
    if (!selectedCategory || !visibleProducts.length) {
      setShowCatalogReturn(false);
      return;
    }

    let frame = 0;
    const updateCatalogReturn = () => {
      if (frame) return;
      frame = window.requestAnimationFrame(() => {
        frame = 0;
        const sectionTop = resultsRef.current?.getBoundingClientRect().top;
        setShowCatalogReturn(sectionTop !== undefined && sectionTop <= -80);
      });
    };

    updateCatalogReturn();
    window.addEventListener("scroll", updateCatalogReturn, { passive: true });
    window.addEventListener("resize", updateCatalogReturn);
    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("scroll", updateCatalogReturn);
      window.removeEventListener("resize", updateCatalogReturn);
    };
  }, [selectedCategory, visibleProducts.length]);

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
    setShowCatalogReturn(false);
    setQuery("");
    window.setTimeout(() => scrollTo(resultsRef.current), 0);
  };

  const resetCatalog = () => {
    setSelectedCategory(null);
    setQuery("");
    window.setTimeout(() => scrollTo(document.querySelector<HTMLElement>("#categorias")), 0);
  };

  return (
    <div className="site-shell" id="inicio">
      <header className={`site-header${headerScrolled ? " is-scrolled" : ""}`}>
        <div className="container header-inner">
          <div className="header-brand">
            <Brand compact />
            <span className="header-edition" aria-hidden="true">SELEÇÃO<br />PERFORMANCE</span>
          </div>
          <nav className="header-links" aria-label="Navegação principal">
            <a href="#inicio" aria-current={activeNav === "inicio" ? "location" : undefined}>Início</a>
            <a href="#categorias" aria-current={activeNav === "categorias" ? "location" : undefined}>Categorias</a>
          </nav>
          <div className="header-actions">
            <Button
              variant="ghost"
              type="button"
              className="header-cart"
              onClick={() => setCartOpen(true)}
              aria-label={`Abrir carrinho com ${cartCount} ${cartCount === 1 ? "item" : "itens"}`}
            >
              <ShoppingBag />
              <span>Carrinho</span>
              <strong aria-live="polite">{cartCount}</strong>
            </Button>
            <a
              className="header-whatsapp"
              href={whatsappUrl()}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Atendimento pelo WhatsApp"
            >
              <WhatsAppIcon /> <span>Atendimento</span>
            </a>
          </div>
        </div>
      </header>

      <main>
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-scanner" aria-hidden="true">
            <Scanner
              color1="#74171e"
              color2="#e31e2b"
              color3="#ff6570"
              speed={0.22}
              sweepSpeed={0.16}
              sweepWidth={1.9}
              ripple={0.16}
              bandDensity={12}
              glow={0.55}
              brightness={1.15}
              vignette={0.48}
              opacity={0.82}
              scanline={false}
              grain={false}
              mouseInteraction={false}
              clickEffect="none"
              intro={false}
              renderMode="css"
            />
          </div>
          <div className="hero-visual" aria-hidden="true">
            <img src="/images/marvel-pharms-athlete-cutout.png" alt="" />
            <span className="hero-visual-index">MARVEL PHARMS / 01</span>
          </div>
          <div className="container hero-layout">
            <div className="hero-copy">
              <div className="eyebrow"><span /> MARVEL PHARMS — CATÁLOGO 2026</div>
              <h1 id="hero-title">A escolha<br />é <span>sua.</span></h1>
              <p>
                Explore o catálogo, descubra as marcas e encontre o que procura.
                Nossa equipe ajuda você com disponibilidade e detalhes pelo WhatsApp.
              </p>
              <div className="hero-actions">
                <Button size="lg" onClick={() => scrollTo(document.querySelector<HTMLElement>("#categorias"))}>
                  Explorar catálogo <ArrowRight />
                </Button>
                <a className="text-link" href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  Falar com a equipe <ChevronRight />
                </a>
              </div>
            </div>
          </div>
        </section>

        <div className="signal-strip" aria-label="Informações do catálogo">
          <div className="signal-track">
            {[0, 1].map((copy) => (
              <div className="signal-group" aria-hidden={copy === 1} key={copy}>
                <span>{products.length} produtos</span>
                <span>{categories.length} categorias</span>
                <span>Atendimento direto</span>
                <span>Consulta de disponibilidade</span>
                <span>Pedidos pelo WhatsApp</span>
              </div>
            ))}
          </div>
        </div>

        <section className="category-section" id="categorias" aria-labelledby="categories-title">
          <div className="container">
            <div className="section-heading category-heading">
              <div>
                <div className="eyebrow">
                  <span /> Navegue do seu jeito
                </div>
                <h2 id="categories-title">Explore o <span>catálogo.</span></h2>
                <p>Explore nossa seleção por objetivo, laboratório ou tipo de produto.</p>
              </div>
              <label className="search-field">
                <Search aria-hidden="true" />
                <input
                  type="search"
                  aria-label="Buscar produto em todas as categorias"
                  placeholder="Buscar produto ou laboratório"
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

            <div className="category-grid category-grid-desktop">
              {categories.map((category, index) => (
                <CategoryCard key={category.id} category={category} index={index} count={counts[category.id]} onSelect={chooseCategory} />
              ))}
            </div>
            <div className="category-carousels">
              {categoryGroups.map((group, groupIndex) => (
                <CategoryCarousel key={groupIndex} group={group} groupIndex={groupIndex} counts={counts} onSelect={chooseCategory} />
              ))}
            </div>
          </div>
        </section>

        {showResults && (
          <section className="products-section" ref={resultsRef} aria-labelledby="products-title">
            <div className="container">
              <div className="products-heading">
                <Button variant="ghost" type="button" className="back-button" onClick={resetCatalog}>
                  <ArrowLeft /> Todas as categorias
                </Button>
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
                <span /> O caminho até seu pedido
              </div>
              <h2 id="journey-title">Sua escolha, <em>do seu jeito.</em></h2>
              <p>Explore com calma. Quando encontrar o que procura, nossa equipe continua a conversa com você.</p>
              <div className="journey-caption"><span>01 — 03</span> UMA EXPERIÊNCIA MAIS PRÓXIMA</div>
            </div>
            <div className="journey-steps">
              <article className="journey-step">
                <div className="journey-step-top"><Search aria-hidden="true" /><strong>01</strong></div>
                <div className="journey-step-copy"><span>Explore</span><p>Navegue pelas categorias e encontre o produto que procura.</p></div>
              </article>
              <article className="journey-step">
                <div className="journey-step-top"><ShoppingBag aria-hidden="true" /><strong>02</strong></div>
                <div className="journey-step-copy"><span>Monte seu pedido</span><p>Adicione ao carrinho e escolha sua cidade de entrega.</p></div>
              </article>
              <article className="journey-step">
                <div className="journey-step-top"><MessageCircle aria-hidden="true" /><strong>03</strong></div>
                <div className="journey-step-copy"><span>Fale com a gente</span><p>Confirme disponibilidade e frete pelo WhatsApp.</p></div>
              </article>
            </div>
          </div>
        </section>

        <section className="service-section">
          <div className="container service-panel">
            <div className="service-copy">
              <span className="service-kicker">ATENDIMENTO MARVEL PHARMS</span>
              <h2>Escolheu? <span>Vamos conversar.</span></h2>
              <p>Confirme o produto, tire suas dúvidas e combine a entrega com nossa equipe.</p>
              <div className="service-tags">
                <span><MapPin aria-hidden="true" /> BH E REGIÃO</span>
                <span><MessageCircle aria-hidden="true" /> PELO WHATSAPP</span>
              </div>
            </div>
            <div className="service-action">
              <MessageCircle className="service-action-icon" aria-hidden="true" />
              <span>SEU PRÓXIMO PASSO</span>
              <p>Uma conversa direta para cuidar dos detalhes do seu pedido.</p>
              <Button asChild size="lg" className="service-button">
                <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
                  Falar com a equipe <ArrowRight aria-hidden="true" />
                </a>
              </Button>
              <small>Disponibilidade e frete confirmados no atendimento.</small>
            </div>
          </div>
        </section>
      </main>

      <footer className="footer">
        <div className="container footer-main">
          <div className="footer-brand">
            <Brand />
            <p>Ciência, performance e resultados em uma seleção feita para você explorar.</p>
          </div>
          <nav className="footer-nav" aria-label="Navegação do rodapé">
            <span>EXPLORE</span>
            <a href="#inicio">Início</a>
            <a href="#categorias">Categorias</a>
          </nav>
          <div className="footer-contact">
            <span>ATENDIMENTO</span>
            <a href={whatsappUrl()} target="_blank" rel="noopener noreferrer">
              Falar no WhatsApp <ArrowRight aria-hidden="true" />
            </a>
            <small>Belo Horizonte e cidades atendidas na região.</small>
          </div>
        </div>
        <div className="container footer-disclaimer">
          <ShieldCheck aria-hidden="true" />
          <p>Catálogo informativo. Preços e disponibilidade podem mudar. Consulte as exigências de prescrição e procure orientação de um profissional de saúde.</p>
        </div>
        <div className="container footer-bottom">
          <span>© {new Date().getFullYear()} Marvel Pharms</span>
          <span>Ciência · Performance · Resultados</span>
        </div>
      </footer>

      {selectedCategory && showCatalogReturn && (
        <Button
          type="button"
          className="floating-catalog-return"
          onClick={resetCatalog}
          aria-label="Voltar ao topo do catálogo"
          title="Voltar ao topo do catálogo"
        >
          <ArrowUp aria-hidden="true" />
          <span>Topo do catálogo</span>
        </Button>
      )}

      <a
        className="floating-whatsapp"
        href={whatsappUrl()}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Falar com a Marvel Pharms pelo WhatsApp"
      >
        <WhatsAppIcon />
        <span>Atendimento</span>
      </a>

      <CartDrawer
        open={cartOpen}
        items={cartItems}
        deliveryCity={deliveryCity}
        onDeliveryCityChange={setDeliveryCity}
        onChangeQuantity={changeCartQuantity}
        onRemove={removeFromCart}
        onClose={() => setCartOpen(false)}
        onBrowse={() => {
          setCartOpen(false);
          window.setTimeout(() => scrollTo(document.querySelector<HTMLElement>("#categorias")), 0);
        }}
      />
    </div>
  );
}
