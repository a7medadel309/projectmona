export interface PerfumeItem {
  id: number
  brand: string
  title: string
  body: string
  price: number
  volume: string
  topNotes: string
  heartNotes: string
  baseNotes: string
}

export const allPerfumes: PerfumeItem[] = [
  // Hawas Collection
  {
    id: 1,
    brand: "Hawas",
    title: "Hawas for Him",
    body: "Fresh aquatic freshness mixed with cinnamon, apple, plum, and warm ambergris trail.",
    price: 1850,
    volume: "100ml EDP",
    topNotes: "Apple, Bergamot, Lemon, Cinnamon",
    heartNotes: "Plum, Orange Blossom, Cardamom",
    baseNotes: "Ambergris, Musk, Patchouli, Driftwood"
  },
  {
    id: 2,
    brand: "Hawas",
    title: "Hawas Elixir",
    body: "Rich intense woody base, smoky vanilla accords, and deep balsamic presence.",
    price: 2150,
    volume: "100ml Extrait",
    topNotes: "Pink Pepper, Nutmeg, Lavender",
    heartNotes: "Balsamic Resins, Smoky Amber",
    baseNotes: "Bourbon Vanilla, Cedar, Tonka Bean"
  },
  {
    id: 3,
    brand: "Hawas",
    title: "Hawas Tropical",
    body: "Burst of crushed passion fruit, juicy pineapple, coconut husk, and cool cedarwood.",
    price: 1950,
    volume: "100ml EDP",
    topNotes: "Pineapple, Passion Fruit, Mint",
    heartNotes: "Coconut Water, Sea Salt, Ginger",
    baseNotes: "Cedarwood, Solar Amber, Musk"
  },
  {
    id: 4,
    brand: "Hawas",
    title: "Hawas Black",
    body: "Dark spicy aura, roasted tonka bean, dark patchouli, and clean seductive woods.",
    price: 2200,
    volume: "100ml EDP",
    topNotes: "Grapefruit, Cardamom, Clary Sage",
    heartNotes: "Cedar Needle, Roasted Tonka",
    baseNotes: "Dark Patchouli, Vetiver, Amber"
  },

  // Assaf Collection
  {
    id: 5,
    brand: "Assaf",
    title: "Liquid Brun",
    body: "Spiced pralines, creamy Madagascar vanilla, bourbon tobacco, and warm cinnamon bark.",
    price: 2400,
    volume: "100ml EDP",
    topNotes: "Cinnamon Bark, Orange Blossom, Cardamom",
    heartNotes: "Bourbon Vanilla, Caramelized Praline",
    baseNotes: "Aged Oak, Tobacco Leaf, Tonka"
  },
  {
    id: 6,
    brand: "Assaf",
    title: "Wild Colt",
    body: "Airy aromatic saffron, dry leather saddle, fresh pink pepper, and lingering amber.",
    price: 2100,
    volume: "100ml EDP",
    topNotes: "Saffron Threads, Pink Pepper, Mint",
    heartNotes: "Tuscan Leather, Frankincense",
    baseNotes: "Dry Amber, Vetiver, Cashmeran"
  },
  {
    id: 7,
    brand: "Assaf",
    title: "Miss Assaf",
    body: "Soft powdery Bulgarian rose, white jasmine petals, and comforting cashmere musk.",
    price: 1900,
    volume: "100ml EDP",
    topNotes: "Italian Bergamot, Pear, Peony",
    heartNotes: "Bulgarian Rose, White Jasmine",
    baseNotes: "Cashmere Musk, Amber, Sandalwood"
  },
  {
    id: 8,
    brand: "Assaf",
    title: "Nuit d'Orient",
    body: "Smoked agarwood notes blended with spiced frankincense, labdanum, and amber tears.",
    price: 2600,
    volume: "100ml Extrait",
    topNotes: "Incense, Black Pepper, Nutmeg",
    heartNotes: "Labdanum, Smoky Agarwood",
    baseNotes: "Amber Tears, Benzoin, Cedar"
  },

  // Ibraq Collection
  {
    id: 9,
    brand: "Ibraq",
    title: "Sovereign Oud",
    body: "Rare Cambodian aged oud enveloped in wild taif roses, sweet amber, and leather.",
    price: 2800,
    volume: "100ml Extrait",
    topNotes: "Taif Rose, Saffron, Thyme",
    heartNotes: "Cambodian Oud, Birch Tar",
    baseNotes: "Leather Accord, Sweet Amber, Civet"
  },
  {
    id: 10,
    brand: "Ibraq",
    title: "Velvet Sillage",
    body: "Velvety smooth white amber, sunlit musk, dried plum, and creamy sandalwood.",
    price: 2300,
    volume: "100ml EDP",
    topNotes: "Dried Plum, Bergamot, Pink Berry",
    heartNotes: "White Amber, Orris Root",
    baseNotes: "Creamy Sandalwood, Clean Musk"
  },
  {
    id: 11,
    brand: "Ibraq",
    title: "Emerald Soul",
    body: "Crisp Italian bergamot, fresh violet leaf, clean patchouli, and golden ambergris.",
    price: 2450,
    volume: "100ml EDP",
    topNotes: "Italian Bergamot, Violet Leaf, Mint",
    heartNotes: "Clean Patchouli, Geranium",
    baseNotes: "Golden Ambergris, Cedarwood, Oakmoss"
  },
  {
    id: 12,
    brand: "Ibraq",
    title: "Royal Tobacco",
    body: "Cured blond tobacco leaves steeped in clover honey, smoky tonka, and dried spices.",
    price: 2750,
    volume: "100ml Extrait",
    topNotes: "Blond Tobacco, Anise, Clove",
    heartNotes: "Wild Honey, Cocoa, Tonka Bean",
    baseNotes: "Smoked Vanilla, Dried Fruits, Guaiac Wood"
  }
]