import klow from '@/assets/klow.jpg';
import bpc from '@/assets/bpc.jpg';
import anabolizante from '@/assets/anabolizante.jpg';

export type Category = 'peptideos' | 'anabolizantes';

export interface Product {
  id: string;
  name: string;
  detail: string;
  brand: string;
  category: Category;
  price: number | null; // null = esgotado
  image: string;
}

const a = (id: string, name: string, detail: string, brand: string, price: number | null): Product => ({
  id, name, detail, brand, category: 'anabolizantes', price, image: anabolizante,
});

export const products: Product[] = [
  { id: 'klow', name: 'KLOW', detail: '80MG', brand: 'USA Importados', category: 'peptideos', price: 400, image: klow },
  { id: 'bpc', name: 'BPC-157', detail: '10MG', brand: 'USA Importados', category: 'peptideos', price: 280, image: bpc },

  // LANDER LAN
  a('ll-proviron', 'Proviron', '10mg · 20 comp', 'Lander Lan', 110),
  a('ll-masteron-comp', 'Masteron', 'Comprimidos', 'Lander Lan', 240),
  a('ll-dianabol', 'Dianabol', '', 'Lander Lan', 110),
  a('ll-decaland', 'Decaland', '5ml', 'Lander Lan', 95),
  a('ll-duraland', 'Duraland', '1ml', 'Lander Lan', 22),
  a('ll-gh', 'GH Lander', '100UI', 'Lander Lan', 1850),
  a('ll-hemogenin', 'Hemogenin', '', 'Lander Lan', 110),
  a('ll-oxa-5', 'Oxandrolona', '5mg', 'Lander Lan', 210),
  a('ll-oxa-10', 'Oxandrolona', '10mg', 'Lander Lan', 210),
  a('ll-stan-15', 'Stan', '15ml', 'Lander Lan', 100),
  a('ll-stan-30', 'Stan', '30ml', 'Lander Lan', 140),
  a('ll-stan-comp', 'Stan', 'Comprimido', 'Lander Lan', 110),
  a('ll-testoland', 'Testoland', '6ml · 3 ampolas', 'Lander Lan', 85),
  a('ll-testenat', 'Testenat', '4ml', 'Lander Lan', 85),
  a('ll-propionato', 'Propionato', '10ml', 'Lander Lan', 190),
  a('ll-prima-inj', 'Primabolan', 'Injetável 10ml', 'Lander Lan', 350),
  a('ll-prima-comp', 'Primabolan', 'Comprimidos', 'Lander Lan', null),
  a('ll-clem', 'Clembuterol', '50 comp', 'Lander Lan', 130),

  // LANDER LAN GOLD
  a('llg-deca', 'Deca', '10ml · 100mg', 'Lander Lan Gold', 190),
  a('llg-enantato', 'Enantato', '10ml · 100mg', 'Lander Lan Gold', 190),
  a('llg-cipionato', 'Cipionato', '10ml · 100mg', 'Lander Lan Gold', 190),
  a('llg-boldenona', 'Boldenona', '10ml · 100mg', 'Lander Lan Gold', 190),
  a('llg-masteron', 'Masteron', '10ml · 100mg', 'Lander Lan Gold', 240),
  a('llg-dura', 'Dura', '10ml · 100mg', 'Lander Lan Gold', 190),
  a('llg-trembo-ac', 'Trembo Acetato', '10ml · 100mg', 'Lander Lan Gold', 220),
  a('llg-trembo-en', 'Trembo Enantato', '10ml · 100mg', 'Lander Lan Gold', 190),
  a('llg-npp', 'NPP', '10ml · 100mg', 'Lander Lan Gold', 190),
  a('llg-tri-trembo', 'Tri-Trembo', '10ml · 100mg', 'Lander Lan Gold', 260),
  a('llg-prima', 'Primabolan', '10ml · 100mg', 'Lander Lan Gold', null),
  a('llg-hcg', 'HCG', '5000UI', 'Lander Lan Gold', 200),

  // MUSCLE
  a('mu-boldenona', 'Boldenona', '10ml', 'Muscle', 180),
  a('mu-cutstack', 'Cutstack', '10ml', 'Muscle', 180),
  a('mu-deca', 'Deca', '10ml', 'Muscle', 180),
  a('mu-masteron', 'Masteron', '10ml', 'Muscle', 180),
  a('mu-trembo-ac', 'Trembo Acetato', '10ml', 'Muscle', 180),
  a('mu-prima', 'Primabolan', '10ml', 'Muscle', 310),
  a('mu-dura', 'Dura', '10ml', 'Muscle', 180),
  a('mu-propionato', 'Propionato', '10ml', 'Muscle', 180),
  a('mu-enantato', 'Enantato', '10ml', 'Muscle', 180),
  a('mu-cipionato', 'Cipionato', '10ml', 'Muscle', 180),
  a('mu-turinabol', 'Turinabol', '10ml', 'Muscle', 180),
  a('mu-hemogenin', 'Hemogenin', 'Injetável 10ml', 'Muscle', 180),
  a('mu-halotestin', 'Halotestin', '10mg · 30 comp', 'Muscle', 250),
  a('mu-hcg', 'HCG', '5000UI', 'Muscle', 210),

  // KING
  a('ki-boldenona', 'Boldenona', '10ml', 'King', 180),
  a('ki-cutstack', 'Cutstack', '10ml', 'King', 180),
  a('ki-deca', 'Deca', '10ml', 'King', 180),
  a('ki-trembo-en', 'Trembo Enantato (Finaplix)', '10ml', 'King', 180),
  a('ki-masteron', 'Masteron', '10ml', 'King', 180),
  a('ki-masteron-slow', 'Masteron Enantato Slow', '', 'King', 180),
  a('ki-trembo-ac', 'Trembo Acetato', '10ml', 'King', 180),
  a('ki-parabolan', 'Parabolan Blend', '10ml', 'King', 250),
  a('ki-prima', 'Primabolan', '10ml', 'King', 310),
  a('ki-propionato', 'Propionato', '10ml', 'King', 180),
  a('ki-dura', 'Dura', '10ml', 'King', 180),
  a('ki-cipionato', 'Cipionato', '10ml', 'King', 180),
  a('ki-enantato', 'Enantato', '10ml', 'King', 180),
  a('ki-oxa', 'Oxandrolona', '10mg · 50 comp', 'King', 180),

  // BRATVA
  a('br-dura', 'Dura', '10ml', 'Bratva', 170),
  a('br-dura-amp', 'Dura', '1ml · cx c/ 10 ampolas', 'Bratva', 220),
  a('br-deca', 'Deca', '10ml', 'Bratva', 170),
  a('br-deca-amp', 'Deca', '1ml · cx c/ 10 ampolas', 'Bratva', 220),
  a('br-enantato', 'Enantato', '10ml', 'Bratva', 180),
  a('br-enantato-amp', 'Enantato', '1ml · cx c/ 10 ampolas', 'Bratva', 220),
  a('br-masteron', 'Masteron', '10ml', 'Bratva', 220),
  a('br-masteron-amp', 'Masteron', '1ml · cx c/ 10 ampolas', 'Bratva', 230),
  a('br-cutstack', 'Cutstack', '10ml', 'Bratva', 190),
  a('br-trembo-ac', 'Trembo Acetato', '10ml', 'Bratva', 200),
  a('br-trembo-amp', 'Trembo Acetato', '1ml · cx c/ 10 ampolas', 'Bratva', 220),
  a('br-dianabol', 'Dianabol', '10mg · 50 comp', 'Bratva', 110),
  a('br-stan-50', 'Stan', '10mg · 50 comp', 'Bratva', 60),
  a('br-stan-100', 'Stan', '10mg · 100 comp', 'Bratva', 100),
  a('br-stan-inj', 'Stan', 'Injetável', 'Bratva', 140),
  a('br-hemogenin', 'Hemogenin', '25 comp', 'Bratva', 110),
  a('br-oxa', 'Oxandrolona', '10mg · 50 comp', 'Bratva', 180),
  a('br-prima', 'Primabolan', '10ml', 'Bratva', 330),
  a('br-gh', 'GH', '100UI', 'Bratva', 1500),

  // PHARMACON
  a('ph-diana', 'Diana', '10mg · 50 comp', 'Pharmacon', 180),
  a('ph-boldenona', 'Boldenona', '10ml', 'Pharmacon', 430),
  a('ph-cipionato', 'Cipionato', '250mg', 'Pharmacon', 320),
  a('ph-propionato-320', 'Propionato', '', 'Pharmacon', 320),
  a('ph-deca-300', 'Deca', '300mg', 'Pharmacon', 350),
  a('ph-deca-600', 'Deca', '600mg', 'Pharmacon', 650),
  a('ph-dura-250', 'Dura', '250mg', 'Pharmacon', 310),
  a('ph-dura-300', 'Dura', '300mg', 'Pharmacon', 330),
  a('ph-dura-500', 'Dura', '500mg', 'Pharmacon', 420),
  a('ph-enantato-250', 'Enantato', '250mg', 'Pharmacon', 320),
  a('ph-enantato-300', 'Enantato', '300mg', 'Pharmacon', 340),
  a('ph-enantato-500', 'Enantato', '500mg', 'Pharmacon', 450),
  a('ph-masteron', 'Masteron', '', 'Pharmacon', 550),
  a('ph-mix1', 'Mix 1', '', 'Pharmacon', 450),
  a('ph-mix2', 'Mix 2', '', 'Pharmacon', 500),
  a('ph-mix3', 'Mix 3', '', 'Pharmacon', null),
  a('ph-mix4', 'Mix 4', '', 'Pharmacon', null),
  a('ph-mix5', 'Mix 5', '', 'Pharmacon', null),
  a('ph-mix6', 'Mix 6', '', 'Pharmacon', null),
  a('ph-propionato-240', 'Propionato', '', 'Pharmacon', 240),
  a('ph-stan-inj', 'Stan', 'Injetável 10ml', 'Pharmacon', 190),
  a('ph-stan-oral', 'Stan', 'Oral', 'Pharmacon', 150),
  a('ph-trembo-ac', 'Trembo Acetato', '', 'Pharmacon', 400),
  a('ph-trembo-en', 'Trembo Enantato', '', 'Pharmacon', 400),
  a('ph-turinabol', 'Turinabol', '', 'Pharmacon', 310),
  a('ph-halotestin', 'Halotestin', '', 'Pharmacon', 610),
  a('ph-oxa', 'Oxandrolona', '10mg · 50 comp', 'Pharmacon', 400),
  a('ph-prima', 'Primabolan', '', 'Pharmacon', 900),
  a('ph-dbol', 'Dbol', '100mg', 'Pharmacon', 250),
  a('ph-hemogenin', 'Hemogenin', '', 'Pharmacon', 250),
  a('ph-npp', 'NPP', '', 'Pharmacon', 350),
  a('ph-gh', 'GH', '100UI', 'Pharmacon', 1800),

  // COOPER
  a('co-hgh', 'HGH', '', 'Cooper', 2000),
  a('co-hg-frag', 'HG Frag', '', 'Cooper', 2300),
  a('co-hg-cjc', 'HG CJC-1295 DAC', '', 'Cooper', 2000),
  a('co-boldenona', 'Boldenona', '250mg', 'Cooper', 350),
  a('co-cipionato', 'Cipionato', '250mg', 'Cooper', 320),
  a('co-dianabol', 'Dianabol', '10mg · 50 comp', 'Cooper', 200),
  a('co-deca', 'Deca', '250mg', 'Cooper', 320),
  a('co-undecanoato', 'Undecanoato de Testosterona', '1000mg', 'Cooper', 450),
  a('co-masteron-en', 'Masteron Enantato', '100mg', 'Cooper', 600),
  a('co-masteron-prop', 'Masteron Propionato (Masterbolic)', '250mg', 'Cooper', null),
  a('co-enantato', 'Enantato', '250mg', 'Cooper', 320),
  a('co-prima', 'Primabolan (Metbolic)', '', 'Cooper', null),
  a('co-npp', 'NPP (Nambolic)', '', 'Cooper', 320),
  a('co-propionato', 'Propionato (Probolic)', '', 'Cooper', 320),
  a('co-dura', 'Dura (Susbolic)', '', 'Cooper', 320),
  a('co-trembo-ac', 'Trembo Acetato (Trenombolic)', '5ml', 'Cooper', 250),
  a('co-trembo-en', 'Trembo Enantato', '', 'Cooper', 450),
  a('co-hemogenin', 'Hemogenin', '10mg · 50 comp', 'Cooper', 280),
  a('co-turinabol', 'Turinabol', '10mg · 50 comp', 'Cooper', 145),
  a('co-stan', 'Stan (Winobolic)', '', 'Cooper', 210),
  a('co-clem', 'Clembuterol (Clembolic)', '', 'Cooper', 230),
  a('co-proviron', 'Proviron (Flubolic)', '5mg · 50 comp', 'Cooper', 230),
  a('co-oxa', 'Oxandrolona', '', 'Cooper', 260),
  a('co-t3', 'T3', 'Injetável', 'Cooper', 260),
  a('co-tamoxifeno', 'Tamoxifeno', '', 'Cooper', 200),
  a('co-anastrazol', 'Anastrazol', '', 'Cooper', 200),

  // OXYGEN
  a('ox-masteron', 'Masteron', '', 'Oxygen', 550),
  a('ox-prima', 'Primabolan', '', 'Oxygen', null),
  a('ox-enantato', 'Enantato', '', 'Oxygen', 240),
  a('ox-trembo-ac', 'Trembo Acetato', '', 'Oxygen', null),
  a('ox-deca', 'Deca', '', 'Oxygen', 240),
  a('ox-propionato', 'Propionato', '', 'Oxygen', 240),
  a('ox-dura', 'Dura', '', 'Oxygen', 240),
  a('ox-stan', 'Stan', 'Injetável', 'Oxygen', 200),
  a('ox-npp', 'NPP', '', 'Oxygen', 240),
  a('ox-cipionato', 'Cipionato', '', 'Oxygen', 240),

  // CANADÁ
  a('ca-oxa', 'Oxandrolona', 'Injetável', 'Canadá', 300),
  a('ca-hemogenin', 'Hemogenin', 'Injetável', 'Canadá', 300),

  // ZPHC
  a('zp-deca-bujao', 'Deca', 'Bujão', 'ZPHC', 320),
  a('zp-deca-amp', 'Deca', 'Ampolas', 'ZPHC', 320),
  a('zp-masteron-prop', 'Masteron Propionato', '', 'ZPHC', 360),
  a('zp-masteron-en', 'Masteron Enantato', '', 'ZPHC', 600),
  a('zp-prima', 'Primabolan', '', 'ZPHC', 900),
  a('zp-dura', 'Dura', '', 'ZPHC', 320),
  a('zp-enantato-400', 'Enantato', '400mg', 'ZPHC', 160),
  a('zp-enantato-250', 'Enantato', '250mg', 'ZPHC', 320),
  a('zp-trembo-ac', 'Trembo Acetato', '', 'ZPHC', 350),
  a('zp-cipionato', 'Cipionato', '', 'ZPHC', 320),
  a('zp-clem', 'Clembuterol', '', 'ZPHC', 220),
  a('zp-cyt3', 'Cyt3', '', 'ZPHC', 330),
  a('zp-boldenona', 'Boldenona', '', 'ZPHC', 320),
  a('zp-hemogenin', 'Hemogenin', '', 'ZPHC', 300),
  a('zp-gh-80', 'GH', '80UI', 'ZPHC', 1300),
  a('zp-gh-32', 'GH', '32UI', 'ZPHC', 550),
  a('zp-gh-200', 'GH', '200UI', 'ZPHC', 2150),
  a('zp-gh-320', 'GH', '320UI', 'ZPHC', 3100),

  // EMINENCE
  a('em-dura', 'Dura', '', 'Eminence', 280),
  a('em-enantato', 'Enantato', '', 'Eminence', 280),
  a('em-deca', 'Deca', '', 'Eminence', 280),
  a('em-masteron', 'Masteron', '', 'Eminence', null),
  a('em-trembo-ac', 'Trembo Acetato', '', 'Eminence', null),
  a('em-trembo-en', 'Trembo Enantato', '', 'Eminence', null),
  a('em-prima', 'Primabolan', '', 'Eminence', 580),
  a('em-cipionato', 'Cipionato', '', 'Eminence', 280),
  a('em-proviron', 'Proviron', '', 'Eminence', 300),
  a('em-clem', 'Clembuterol', '', 'Eminence', 160),
  a('em-dianabol', 'Dianabol', '', 'Eminence', 280),
  a('em-oxa', 'Oxandrolona', '', 'Eminence', 280),

  // ALPHA
  a('al-dura', 'Dura', '', 'Alpha', 360),
  a('al-masteron-prop', 'Masteron Propionato', '', 'Alpha', null),
  a('al-masteron-en', 'Masteron Enantato', '', 'Alpha', null),
  a('al-deca', 'Deca', '', 'Alpha', 420),
  a('al-enantato', 'Enantato', '', 'Alpha', 360),
  a('al-prima', 'Primabolan', '', 'Alpha', null),
  a('al-cipionato', 'Cipionato', '', 'Alpha', 360),
  a('al-proviron', 'Proviron', '', 'Alpha', 250),
  a('al-boldenona', 'Boldenona', '', 'Alpha', 650),
  a('al-clem', 'Clembuterol', '', 'Alpha', 230),
  a('al-turinabol', 'Turinabol', '', 'Alpha', 290),
  a('al-stan', 'Stan', '', 'Alpha', 210),
  a('al-hcg', 'HCG', '15.000UI', 'Alpha', 550),
];

export const categoryLabels: Record<Category, string> = {
  peptideos: 'Peptídeos',
  anabolizantes: 'Anabolizantes',
};
