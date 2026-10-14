export type Category =
  | 'peptideos'
  | 'emagrecedores'
  | 'lander-lan'
  | 'lander-lan-gold'
  | 'muscle'
  | 'king'
  | 'bratva'
  | 'pharmacon'
  | 'cooper'
  | 'oxygen'
  | 'canada'
  | 'zphc'
  | 'eminence'
  | 'alpha'
  | 'variados';

export interface Product {
  id: string;
  name: string;
  brand: string;
  category: Category;
  price: number | null;
}

export interface CategoryInfo {
  id: Category;
  label: string;
  shortLabel: string;
}

export const categories: CategoryInfo[] = [
  { id: 'peptideos', label: 'Peptídeos', shortLabel: 'Peptídeos' },
  { id: 'emagrecedores', label: 'Emagrecedores', shortLabel: 'Emagrecedores' },
  { id: 'lander-lan', label: 'Lander Lan', shortLabel: 'Lander Lan' },
  { id: 'lander-lan-gold', label: 'Lander Lan Gold', shortLabel: 'Lander Gold' },
  { id: 'muscle', label: 'Muscle', shortLabel: 'Muscle' },
  { id: 'king', label: 'King', shortLabel: 'King' },
  { id: 'bratva', label: 'Bratva', shortLabel: 'Bratva' },
  { id: 'pharmacon', label: 'Pharmacon', shortLabel: 'Pharmacon' },
  { id: 'cooper', label: 'Cooper', shortLabel: 'Cooper' },
  { id: 'oxygen', label: 'Oxygen', shortLabel: 'Oxygen' },
  { id: 'canada', label: 'Canadá', shortLabel: 'Canadá' },
  { id: 'zphc', label: 'ZPHC', shortLabel: 'ZPHC' },
  { id: 'eminence', label: 'Eminence', shortLabel: 'Eminence' },
  { id: 'alpha', label: 'Alpha', shortLabel: 'Alpha' },
  { id: 'variados', label: 'Variados', shortLabel: 'Variados' },
];

export const categoryLabels = Object.fromEntries(
  categories.map((category) => [category.id, category.label]),
) as Record<Category, string>;

type RawProduct = readonly [name: string, brand: string, price: number | null];

const catalog: Record<Category, RawProduct[]> = {
  peptideos: [
    ['KLOW 80MG', 'USA Importados', 400],
    ['BPC-157 10MG', 'USA Importados', 280],
    ['CJC-1295 sem DAC 10MG', 'USA Importados', 280],
    ['Epithalon 50MG', 'USA Importados', 280],
    ['GHRP-6 5MG', 'USA Importados', 280],
    ['SLU-PP-332 injetável 10MG', 'USA Importados', 280],
    ['HGH Frag 10MG', 'USA Importados', 280],
    ['Selank 10MG', 'USA Importados', 280],
    ['TB-500 10MG', 'USA Importados', 280],
    ['Ipamorelin 5MG', 'USA Importados', 280],
    ['SS-31 10MG', 'USA Importados', 280],
    ['GHK-CU 50MG', 'Core', 380],
    ['BPC-157 + TB-500', 'Core', 480],
    ['BPC-157 5MG', 'Core', 380],
    ['TB-500 5MG', 'Core', 380],
    ['Tesamorelin', 'Core', 380],
    ['SLU-PP-332 mamadeira 30ML', 'Core', 380],
    ['SLU-PP-332 10MG subcutâneo', 'Core', 480],
    ['SLU-PP-332 comprimidos', 'Core', 480],
    ['GHK-CU 50MG', 'Oxygen', 350],
    ['GHK-CU 100MG', 'Oxygen', 450],
    ['GHK-CU 100MG caneta', 'Oxygen', 750],
    ['KPV', 'Oxygen', 380],
    ['MOTS-C', 'Oxygen', 380],
    ['Epithalon', 'Oxygen', 380],
    ['GLOW', 'Oxygen', 950],
    ['PT-141', 'Oxygen', 430],
    ['TB-500 + BPC-157', 'Oxygen', 530],
    ['NAD+ + Vitamina B12', 'Oxygen', 850],
    ['Semax 10MG', 'Oxygen', 450],
    ['Selank 10MG', 'Oxygen', 450],
    ['GHK-CU 100MG', 'Neopep', 500],
    ['GLOW caneta', 'Alluvi', 1700],
    ['KLOW 70MG', 'World', 380],
    ['Selank 10MG', 'World', 380],
    ['Semax 10MG', 'World', 380],
    ['NAD+ 500MG', 'World', 380],
    ['SLU-PP-332 injetável', 'World', 380],
    ['Ipamorelin 10MG', 'World', 380],
    ['CJC-1295 com DAC + Ipamorelin 5MG', 'World', 430],
    ['PT-141 10MG', 'World', 380],
    ['Epitalon 50MG', 'World', 380],
    ['TB-500', 'World', 380],
    ['Tesamorelin 10MG', 'World', 380],
    ['BPC-157 10MG', 'World', 380],
    ['CJC-1295 DAC', 'World', 380],
    ['GHRP-6 5MG', 'World', 380],
    ['MOTS-C caixa', 'Med Plus', 1950],
    ['MOTS-C bujão', 'Med Plus', 520],
    ['BPC-157 caixa', 'Med Plus', 1950],
    ['BPC-157 bujão', 'Med Plus', 520],
    ['TB-500 caixa', 'Med Plus', 1700],
    ['TB-500 bujão', 'Med Plus', 410],
    ['Ipamorelin caixa', 'Med Plus', 1800],
    ['Ipamorelin bujão', 'Med Plus', 450],
    ['AOD-9406 caixa', 'Med Plus', 1950],
    ['AOD-9406 bujão', 'Med Plus', 520],
    ['Tesamorelin caixa', 'Med Plus', 1950],
    ['Tesamorelin bujão', 'Med Plus', 520],
    ['KPV caixa', 'Med Plus', 1800],
    ['KPV bujão', 'Med Plus', 450],
    ['Sermorelin caixa', 'Med Plus', 2100],
    ['Sermorelin bujão', 'Med Plus', 520],
  ],
  emagrecedores: [
    ['Semaglix (Ozempic importado)', 'Importado', 650],
    ['Ozempic', 'ZPHC', 850],
    ['TG', 'Linha Emagrecedores', 750],
    ['Lipoless bujão único', 'Linha Emagrecedores', 750],
    ['Lipoless caixa com 4 bujões', 'Linha Emagrecedores', 750],
    ['Mounjaro 30MG', 'Linha Emagrecedores', 500],
    ['Mounjaro 60MG', 'Linha Emagrecedores', 750],
    ['Tirzec bujão', 'Linha Emagrecedores', 750],
    ['Tirzec 2,5MG bujão com 4 seringas', 'Linha Emagrecedores', 750],
    ['Tirzepatida 60MG bujão único', 'Oxygen', 850],
    ['Tirzepatida 60MG caixa com 4 bujões', 'Oxygen', 950],
    ['Tirzepatida caneta 60MG', 'Oxygen', 1350],
    ['Tirzepatida 50MG', 'ZPHC', 1450],
    ['Retatrutida 60MG caixa com 5 bujões', 'ZPHC', 2650],
    ['Retatrutida 60MG caixa com 2 bujões', 'ZPHC', 2000],
    ['Retatrutida 120MG caixa com 2 bujões', 'ZPHC', 2250],
    ['Retatrutida 120MG caixa com 5 bujões', 'ZPHC', 2450],
    ['Retatrutida 40MG caixa com 4 bujões', 'Oxygen', 1050],
    ['Retatrutida 40MG caneta', 'Oxygen', 1350],
    ['Retatrutida 30MG', 'World', 800],
    ['Retatrutida 60MG', 'World', 1300],
    ['Retatrutida 40MG caneta', 'Synetica', 1250],
    ['Retatrutida 40MG', 'USA Importados', 900],
    ['Retatrutida 60MG', 'USA Importados', 1300],
  ],
  'lander-lan': [
    ['Proviron 10MG - 20 comprimidos', 'Lander Lan', 110],
    ['Masteron comprimidos', 'Lander Lan', 240],
    ['Dianabol', 'Lander Lan', 110],
    ['Decaland 5ML', 'Lander Lan', 95],
    ['Duraland 1ML', 'Lander Lan', 22],
    ['GH Lander 100UI', 'Lander Lan', 1850],
    ['Hemogenin', 'Lander Lan', 110],
    ['Oxandrolona 5MG', 'Lander Lan', 210],
    ['Oxandrolona 10MG', 'Lander Lan', 210],
    ['Stan 15ML', 'Lander Lan', 100],
    ['Stan 30ML', 'Lander Lan', 140],
    ['Stan comprimido', 'Lander Lan', 110],
    ['Testoland 6ML - 3 ampolas', 'Lander Lan', 85],
    ['Testenat 4ML', 'Lander Lan', 85],
    ['Propionato 10ML', 'Lander Lan', 190],
    ['Primabolan injetável 10ML', 'Lander Lan', 350],
    ['Primabolan comprimidos', 'Lander Lan', null],
    ['Clembuterol 50 comprimidos', 'Lander Lan', 130],
  ],
  'lander-lan-gold': [
    ['Deca 10ML - 100MG', 'Lander Lan Gold', 190],
    ['Enantato 10ML - 100MG', 'Lander Lan Gold', 190],
    ['Cipionato 10ML - 100MG', 'Lander Lan Gold', 190],
    ['Boldenona 10ML - 100MG', 'Lander Lan Gold', 190],
    ['Masteron 10ML - 100MG', 'Lander Lan Gold', 240],
    ['Dura 10ML - 100MG', 'Lander Lan Gold', 190],
    ['Trembo Acetato 10ML - 100MG', 'Lander Lan Gold', 220],
    ['Trembo Enantato 10ML - 100MG', 'Lander Lan Gold', 190],
    ['NPP 10ML - 100MG', 'Lander Lan Gold', 190],
    ['Tri-Trembo 10ML - 100MG', 'Lander Lan Gold', 260],
    ['Primabolan 10ML - 100MG', 'Lander Lan Gold', null],
    ['HCG 5000UI', 'Lander Lan Gold', 200],
  ],
  muscle: [
    ['Boldenona 10ML', 'Muscle', 180], ['Cutstack 10ML', 'Muscle', 180],
    ['Deca 10ML', 'Muscle', 180], ['Masteron 10ML', 'Muscle', 180],
    ['Trembo Acetato 10ML', 'Muscle', 180], ['Primabolan 10ML', 'Muscle', 310],
    ['Dura 10ML', 'Muscle', 180], ['Propionato 10ML', 'Muscle', 180],
    ['Enantato 10ML', 'Muscle', 180], ['Cipionato 10ML', 'Muscle', 180],
    ['Turinabol 10ML', 'Muscle', 180], ['Hemogenin injetável 10ML', 'Muscle', 180],
    ['Halotestin 10MG - 30 comprimidos', 'Muscle', 250], ['HCG 5000UI', 'Muscle', 210],
  ],
  king: [
    ['Boldenona 10ML', 'King', 180], ['Cutstack 10ML', 'King', 180],
    ['Deca 10ML', 'King', 180], ['Trembo Enantato (Finaplix) 10ML', 'King', 180],
    ['Masteron 10ML', 'King', 180], ['Masteron Enantato Slow', 'King', 180],
    ['Trembo Acetato 10ML', 'King', 180], ['Parabolan Blend 10ML', 'King', 250],
    ['Primabolan 10ML', 'King', 310], ['Propionato 10ML', 'King', 180],
    ['Dura 10ML', 'King', 180], ['Cipionato 10ML', 'King', 180],
    ['Enantato 10ML', 'King', 180], ['Oxandrolona 10MG - 50 comprimidos', 'King', 180],
  ],
  bratva: [
    ['Dura 10ML', 'Bratva', 170], ['Dura 1ML - caixa com 10 ampolas', 'Bratva', 220],
    ['Deca 10ML', 'Bratva', 170], ['Deca 1ML - caixa com 10 ampolas', 'Bratva', 220],
    ['Enantato 10ML', 'Bratva', 180], ['Enantato 1ML - caixa com 10 ampolas', 'Bratva', 220],
    ['Masteron 10ML', 'Bratva', 220], ['Masteron 1ML - caixa com 10 ampolas', 'Bratva', 230],
    ['Cutstack 10ML', 'Bratva', 190], ['Trembo Acetato', 'Bratva', 200],
    ['Trembo Acetato 1ML - caixa com 10 ampolas', 'Bratva', 220],
    ['Dianabol 10MG - 50 comprimidos', 'Bratva', 110],
    ['Stan 10MG - 50 comprimidos', 'Bratva', 60], ['Stan 10MG - 100 comprimidos', 'Bratva', 100],
    ['Stan injetável', 'Bratva', 140], ['Hemogenin 25 comprimidos', 'Bratva', 110],
    ['Oxandrolona 10MG - 50 comprimidos', 'Bratva', 180], ['Primabolan 10ML', 'Bratva', 330],
    ['GH 100UI', 'Bratva', 1500],
  ],
  pharmacon: [
    ['Diana 10MG - 50 comprimidos', 'Pharmacon', 180], ['Boldenona 10ML', 'Pharmacon', 430],
    ['Cipionato 250MG', 'Pharmacon', 320], ['Propionato', 'Pharmacon', 320],
    ['Deca 300MG', 'Pharmacon', 350], ['Deca 600MG', 'Pharmacon', 650],
    ['Dura 250MG', 'Pharmacon', 310], ['Dura 300MG', 'Pharmacon', 330],
    ['Dura 500MG', 'Pharmacon', 420], ['Enantato 250MG', 'Pharmacon', 320],
    ['Enantato 300MG', 'Pharmacon', 340], ['Enantato 500MG', 'Pharmacon', 450],
    ['Masteron', 'Pharmacon', 550], ['Mix 1', 'Pharmacon', 450], ['Mix 2', 'Pharmacon', 500],
    ['Mix 3', 'Pharmacon', null], ['Mix 4', 'Pharmacon', null], ['Mix 5', 'Pharmacon', null],
    ['Mix 6', 'Pharmacon', null], ['Propionato', 'Pharmacon', 240],
    ['Stan injetável 10ML', 'Pharmacon', 190], ['Stan oral', 'Pharmacon', 150],
    ['Trembo Acetato', 'Pharmacon', 400], ['Trembo Enantato', 'Pharmacon', 400],
    ['Turinabol', 'Pharmacon', 310], ['Halotestin', 'Pharmacon', 610],
    ['Oxandrolona 10MG - 50 comprimidos', 'Pharmacon', 400], ['Primabolan', 'Pharmacon', 900],
    ['DBOL 100MG', 'Pharmacon', 250], ['Hemogenin', 'Pharmacon', 250],
    ['NPP', 'Pharmacon', 350], ['GH 100UI', 'Pharmacon', 1800],
  ],
  cooper: [
    ['HGH', 'Cooper', 2000], ['HG Frag', 'Cooper', 2300], ['HG CJC-1295 DAC', 'Cooper', 2000],
    ['Boldenona 250MG', 'Cooper', 350], ['Cipionato 250MG', 'Cooper', 320],
    ['Dianabol 10MG - 50 comprimidos', 'Cooper', 200], ['Deca 250MG', 'Cooper', 320],
    ['Undecanoato de Testosterona 1000MG', 'Cooper', 450],
    ['Masteron Enantato 100MG', 'Cooper', 600],
    ['Masteron Propionato (Masterbolic) 250MG', 'Cooper', null],
    ['Enantato 250MG', 'Cooper', 320], ['Primabolan (Metbolic)', 'Cooper', null],
    ['NPP (Nambolic)', 'Cooper', 320], ['Propionato (Probolic)', 'Cooper', 320],
    ['Dura (Susbolic)', 'Cooper', 320], ['Trembo Acetato 5ML (Trenombolic)', 'Cooper', 250],
    ['Trembo Enantato', 'Cooper', 450], ['Hemogenin 10MG - 50 comprimidos', 'Cooper', 280],
    ['Turinabol 10MG - 50 comprimidos', 'Cooper', 145], ['Stan (Winobolic)', 'Cooper', 210],
    ['Clembuterol (Clembolic)', 'Cooper', 230], ['Proviron (Flubolic) 5MG - 50 comprimidos', 'Cooper', 230],
    ['Oxandrolona', 'Cooper', 260], ['T3 injetável', 'Cooper', 260],
    ['Tamoxifeno', 'Cooper', 200], ['Anastrazol', 'Cooper', 200],
  ],
  oxygen: [
    ['Masteron', 'Oxygen', 550], ['Primabolan', 'Oxygen', null], ['Enantato', 'Oxygen', 240],
    ['Trembo Acetato', 'Oxygen', null], ['Deca', 'Oxygen', 240], ['Propionato', 'Oxygen', 240],
    ['Dura', 'Oxygen', 240], ['Stan injetável', 'Oxygen', 200], ['NPP', 'Oxygen', 240],
    ['Cipionato', 'Oxygen', 240],
  ],
  canada: [
    ['Oxandrolona injetável', 'Canadá', 300], ['Hemogenin injetável', 'Canadá', 300],
  ],
  zphc: [
    ['Deca bujão', 'ZPHC', 320], ['Deca ampolas', 'ZPHC', 320],
    ['Masteron Propionato', 'ZPHC', 360], ['Masteron Enantato', 'ZPHC', 600],
    ['Primabolan', 'ZPHC', 900], ['Dura', 'ZPHC', 320], ['Enantato 400MG', 'ZPHC', 160],
    ['Enantato 250MG', 'ZPHC', 320], ['Trembo Acetato', 'ZPHC', 350],
    ['Cipionato', 'ZPHC', 320], ['Clembuterol', 'ZPHC', 220], ['CYT3', 'ZPHC', 330],
    ['Boldenona', 'ZPHC', 320], ['Hemogenin', 'ZPHC', 300], ['GH 80UI', 'ZPHC', 1300],
    ['GH 32UI', 'ZPHC', 550], ['GH 200UI', 'ZPHC', 2150], ['GH 320UI', 'ZPHC', 3100],
  ],
  eminence: [
    ['Dura', 'Eminence', 280], ['Enantato', 'Eminence', 280], ['Deca', 'Eminence', 280],
    ['Masteron', 'Eminence', null], ['Trembo Acetato', 'Eminence', null],
    ['Trembo Enantato', 'Eminence', null], ['Primabolan', 'Eminence', 580],
    ['Cipionato', 'Eminence', 280], ['Proviron', 'Eminence', 300],
    ['Clembuterol', 'Eminence', 160], ['Dianabol', 'Eminence', 280],
    ['Oxandrolona', 'Eminence', 280],
  ],
  alpha: [
    ['Dura', 'Alpha', 360], ['Masteron Propionato', 'Alpha', null],
    ['Masteron Enantato', 'Alpha', null], ['Deca', 'Alpha', 420], ['Enantato', 'Alpha', 360],
    ['Primabolan', 'Alpha', null], ['Cipionato', 'Alpha', 360], ['Proviron', 'Alpha', 250],
    ['Boldenona', 'Alpha', 650], ['Clembuterol', 'Alpha', 230], ['Turinabol', 'Alpha', 290],
    ['Stan', 'Alpha', 210], ['HCG 15.000UI', 'Alpha', 550],
  ],
  variados: [
    ['Pré-treino Panic', 'Variados', 140], ['Pré-treino Psicoty', 'Variados', 225],
    ['Roacutan genérico Isotretinoína 20MG - 30 comprimidos', 'Variados', 125],
    ['Roacutan genérico Ranbaxy 20MG - 30 comprimidos', 'Variados', 125],
    ['Zolpidem', 'Variados', 65], ['Clembuterol cartela - 10 unidades', 'Variados', 22],
    ['Clembuterol gel 500ML', 'Variados', 185], ['Deca farmácia original', 'Variados', 55],
    ['GH Hormotrop', 'Variados', 110], ['Dura farmácia (Aspen)', 'Variados', 55],
    ['Tadalafila Digran 20MG - 10 comprimidos', 'Variados', 40],
    ['Tadalafila Pramil - 25 comprimidos', 'Variados', 40], ['Lipostabil', 'Variados', 120],
    ['Ritalina genérica 10MG - 30 comprimidos', 'Variados', 110],
    ['Ritalina original 10MG - 30 comprimidos', 'Variados', 110],
    ['Sibutramina original', 'Variados', 70], ['Testogar', 'Variados', 90],
    ['Oxandrolona RGL manipulada 10MG - 120 comprimidos', 'Variados', 180],
    ['Oxandrolona RGL manipulada 20MG - 120 comprimidos', 'Variados', 190],
    ['Composto Oxan + Propionato + Stan - 30 comprimidos', 'Variados', 200],
    ['Super Composto TPC - 60 comprimidos', 'Variados', 150],
    ['Composto Oxan 20MG + Ioimbina 5MG + Tribulus 500MG', 'Variados', 200],
    ['Minoxidil', 'Variados', 160], ['HCG Chorulon', 'Variados', 185],
    ['Moder Diet', 'Variados', 150], ['Moder Black', 'Variados', 150],
    ['T3 manipulado 25MG - 30 comprimidos', 'Variados', 100],
    ['Anastrazol manipulado - 30 comprimidos', 'Variados', 100],
    ['Tamoxifeno manipulado - 30 comprimidos', 'Variados', 100],
    ['Proviron manipulado', 'Variados', 100], ['Lipo HD 20ML', 'Variados', 200],
    ['Lipo 6 Black importado - 60 comprimidos', 'Variados', 170],
    ['Botox 100UI', 'Variados', 600], ['Botox Dysport', 'Variados', 850],
    ['Testosterona gel', 'Variados', 130], ['Deposteron farmácia', 'Variados', 45],
    ['Gestrinona 50ML', 'Variados', 100], ['Venvanse importado 30MG', 'Variados', 300],
    ['Venvanse importado 50MG', 'Variados', 400], ['Ventrembolona Enantato G', 'Variados', 500],
    ['Venvanse original 70MG', 'Variados', 700], ['Black Mamba', 'Variados', 250],
    ['Stimerex - 90 comprimidos', 'Variados', 250], ['Synadrene', 'Variados', 200],
    ['OxyElite', 'Variados', 200], ['Xpel diurético - 60 comprimidos', 'Variados', 150],
    ['Lipodrene - 90 comprimidos', 'Variados', 235], ['Lipodrene Xtreme', 'Variados', 230],
    ['Melatonina 3MG', 'Variados', 90], ['Melatonina 5MG', 'Variados', 100],
    ['DHEA 25MG', 'Variados', 110], ['DHEA 50MG', 'Variados', 120],
    ['Ostarine Dragon Elite', 'Variados', 180], ['Ligandrol Dragon Elite', 'Variados', 180],
    ['Turinabol Dragon Elite', 'Variados', 180], ['Cardarine Dragon Elite', 'Variados', 180],
  ],
};

const slugify = (value: string) =>
  value
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const products: Product[] = categories.flatMap((category) =>
  catalog[category.id].map(([name, brand, price], index) => ({
    id: `${category.id}-${slugify(name)}-${index + 1}`,
    name,
    brand,
    category: category.id,
    price,
  })),
);
