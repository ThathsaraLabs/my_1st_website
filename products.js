const PRODUCTS = [
  {
    id: "p1",
    name: "Ceylon Linen Summer Shirt",
    category: "Linen Collection",
    price: 6800,
    rating: 4.9,
    reviews: 42,
    description: "Embrace the tropical warmth with our premium Ceylon Linen summer shirt. Crafted from 100% locally sourced organic linen, this shirt offers unparalleled breathability and timeless style, featuring a modern slim-fit collar and wooden coconut-shell buttons.",
    details: [
      "Material: 100% Organic Ceylon Linen",
      "Colors dyed with organic, non-toxic pigment",
      "Features real coconut-shell buttons",
      "Handcrafted by local artisans in Sri Lanka",
      "Care: Gentle hand wash or dry clean recommended"
    ],
    images: [
      "assets/ceylon_linen_shirt.png",
      "assets/ceylon_linen_shirt.png" // Fallback hover image
    ],
    colors: [
      { name: "Terracotta", hex: "#C85A32", class: "bg-[#C85A32]" },
      { name: "Monstera Green", hex: "#0A4D42", class: "bg-[#0A4D42]" },
      { name: "Linen Ivory", hex: "#FAF9F6", class: "bg-[#FAF9F6] border border-gray-300" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    trending: true,
    discount: 10 // percentage
  },
  {
    id: "p2",
    name: "Sigiriya Batik Fusion Dress",
    category: "Batik Fusion",
    price: 9500,
    rating: 4.8,
    reviews: 29,
    description: "A breathtaking midi dress that seamlessly blends traditional hand-waxed Sri Lankan batik heritage with a contemporary silhouette. Features an elegant open-back detail, adjustable belt, and an flowy skirt that moves gracefully.",
    details: [
      "Material: 100% Premium Cotton Silk",
      "Handmade Batik using traditional wax-resist dyeing techniques",
      "Every piece is unique due to the hand-dyeing process",
      "Flattering A-line silhouette with adjustable waist tie",
      "Care: Hand wash separately in cold water, do not bleach"
    ],
    images: [
      "assets/batik_fusion_dress.png",
      "assets/batik_fusion_dress.png"
    ],
    colors: [
      { name: "Monstera Green & Terracotta", hex: "#0A4D42", class: "bg-gradient-to-tr from-[#0A4D42] to-[#C85A32]" },
      { name: "Cinnamon Indigo", hex: "#8D4024", class: "bg-gradient-to-tr from-[#8D4024] to-[#1E3A8A]" }
    ],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    trending: true,
    discount: 0
  },
  {
    id: "p3",
    name: "Colombo Streetwear Oversized Tee",
    category: "Streetwear",
    price: 4200,
    rating: 4.7,
    reviews: 58,
    description: "Designed for the urban explorer, this heavyweight oversized t-shirt combines street-style comfort with subtle cultural graphics inspired by Colombo's vibrant lifestyle. Crafted from soft, breathable combed cotton.",
    details: [
      "Material: 100% Combed Cotton (240 GSM)",
      "Oversized boxy fit with dropped shoulders",
      "Premium screen-print graphic on chest and back",
      "Pre-shrunk fabric to prevent shrinking after wash",
      "Care: Machine wash cold inside out, tumble dry low"
    ],
    images: [
      "assets/streetwear_tee.png",
      "assets/streetwear_tee.png"
    ],
    colors: [
      { name: "Marigold Gold", hex: "#F2BB16", class: "bg-[#F2BB16]" },
      { name: "Cinnamon Red", hex: "#8D4024", class: "bg-[#8D4024]" },
      { name: "Charcoal Black", hex: "#1F2937", class: "bg-[#1F2937]" }
    ],
    sizes: ["S", "M", "L", "XL", "XXL"],
    featured: true,
    trending: false,
    discount: 15
  },
  {
    id: "p4",
    name: "Heritage Premium Linen Sarong",
    category: "Linen Collection",
    price: 5900,
    rating: 5.0,
    reviews: 18,
    description: "A modern reimagining of the classic Sri Lankan sarong. Made from highly durable and breathable linen-cotton blend, featuring traditional woven border accents and an innovative pocket-and-tie loop design for extra comfort and utility.",
    details: [
      "Material: 55% Linen, 45% Cotton",
      "Features side utility pocket for smartphones and keys",
      "Unisex styling, adjustable with integrated tie-loops",
      "Woven heritage borders made on traditional handlooms",
      "Care: Warm wash, iron while slightly damp for best finish"
    ],
    images: [
      "assets/heritage_sarong.png",
      "assets/heritage_sarong.png"
    ],
    colors: [
      { name: "Ceylon Cinnamon", hex: "#8D4024", class: "bg-[#8D4024]" },
      { name: "Monstera Green", hex: "#0A4D42", class: "bg-[#0A4D42]" },
      { name: "Terracotta Clay", hex: "#C85A32", class: "bg-[#C85A32]" }
    ],
    sizes: ["One Size"],
    featured: false,
    trending: true,
    discount: 0
  },
  {
    id: "p5",
    name: "Knuckles Range Trekking Overjacket",
    category: "Streetwear",
    price: 11200,
    rating: 4.6,
    reviews: 12,
    description: "Built for versatility and layered styling, this lightweight outer jacket is inspired by treks through the Knuckles Range. Equipped with wind-resistant canvas fabric, multiple utility pockets, and adjustable cuff snaps.",
    details: [
      "Material: 100% Cotton Canvas (Lightweight)",
      "Four front utility pockets and one internal pocket",
      "Adjustable drawstring waist and snap cuffs",
      "Distressed organic dye wash",
      "Care: Dry clean or cold machine wash, air dry"
    ],
    images: [
      "assets/heritage_sarong.png", // Reusing image with color filters or styling
      "assets/heritage_sarong.png"
    ],
    colors: [
      { name: "Monstera Green", hex: "#0A4D42", class: "bg-[#0A4D42]" },
      { name: "Terracotta", hex: "#C85A32", class: "bg-[#C85A32]" }
    ],
    sizes: ["M", "L", "XL"],
    featured: false,
    trending: false,
    discount: 0
  },
  {
    id: "p6",
    name: "Ella Tea-Trails Silk Kimono",
    category: "Batik Fusion",
    price: 8800,
    rating: 4.9,
    reviews: 31,
    description: "Flowy, elegant, and exceptionally luxurious, this silk-blend kimono features patterns inspired by the cascading tea estates of Ella. Can be styled as a beach cover-up, loungewear, or layered over streetwear.",
    details: [
      "Material: 30% Silk, 70% Viscose",
      "Intricate botanical tea-leaf patterns printed digitally",
      "Relaxed flowy fit with wide sleeves and side slits",
      "Includes matching silk waist sash",
      "Care: Delicate wash bag, cold water only"
    ],
    images: [
      "assets/batik_fusion_dress.png",
      "assets/batik_fusion_dress.png"
    ],
    colors: [
      { name: "Ceylon Cinnamon", hex: "#8D4024", class: "bg-[#8D4024]" },
      { name: "Marigold Gold", hex: "#F2BB16", class: "bg-[#F2BB16]" }
    ],
    sizes: ["S/M", "L/XL"],
    featured: true,
    trending: false,
    discount: 5
  },
  {
    id: "p7",
    name: "Southern Coast Linen Shorts",
    category: "Linen Collection",
    price: 4900,
    rating: 4.8,
    reviews: 22,
    description: "Keep it casual and classy. These lightweight linen shorts are tailored with a modern drawcord elastic waist, side pockets, and a button-fastened back pocket. Perfect for coastal getaways and relaxed weekends.",
    details: [
      "Material: 100% French Linen",
      "Elasticated waistband with thick cotton drawcord",
      "Regular fit, mid-rise with pre-washed softness",
      "Reinforced double stitching for high durability",
      "Care: Machine wash cold, tumble dry low"
    ],
    images: [
      "assets/ceylon_linen_shirt.png",
      "assets/ceylon_linen_shirt.png"
    ],
    colors: [
      { name: "Linen Ivory", hex: "#FAF9F6", class: "bg-[#FAF9F6] border border-gray-300" },
      { name: "Terracotta", hex: "#C85A32", class: "bg-[#C85A32]" },
      { name: "Monstera Green", hex: "#0A4D42", class: "bg-[#0A4D42]" }
    ],
    sizes: ["S", "M", "L", "XL"],
    featured: false,
    trending: true,
    discount: 10
  },
  {
    id: "p8",
    name: "Galle Fort Evening Wrap Dress",
    category: "Evening Wear",
    price: 12500,
    rating: 4.9,
    reviews: 15,
    description: "An sophisticated wrap dress designed for warm evening dinners and cocktail parties in the historic Galle Fort. Made from premium modal-satin that drapes beautifully, emphasizing a flattering silhouette.",
    details: [
      "Material: 100% Modal Satin",
      "Wrap-around style with adjustable inner and outer ties",
      "Subtle satin sheen under warm lighting",
      "Elegant V-neckline with pleated sleeve cuffs",
      "Care: Gentle machine wash in mesh bag, iron low inside out"
    ],
    images: [
      "assets/batik_fusion_dress.png",
      "assets/batik_fusion_dress.png"
    ],
    colors: [
      { name: "Monstera Green", hex: "#0A4D42", class: "bg-[#0A4D42]" },
      { name: "Cinnamon Red", hex: "#8D4024", class: "bg-[#8D4024]" }
    ],
    sizes: ["S", "M", "L", "XL"],
    featured: true,
    trending: true,
    discount: 0
  }
];

// Helper functions for operations
function getProductById(id) {
  return PRODUCTS.find(p => p.id === id);
}

function getRelatedProducts(productId, limit = 4) {
  const current = getProductById(productId);
  if (!current) return [];
  return PRODUCTS.filter(p => p.id !== productId && p.category === current.category).slice(0, limit);
}
