import { Product } from "@/types";

export const categories = [
  "Fiction",
  "Non-Fiction",
  "Science",
  "Technology",
  "Business",
  "Health",
  "History",
  "Art",
];

export const MOCK_PRODUCTS: Product[] = [
  {
    id: 1,
    name: "The Great Gatsby",
    description: "A classic tale of the American Dream in the Jazz Age",
    price: 12.99,
    category: "Fiction",
    stock: 45,
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
  },
  {
    id: 2,
    name: "Sapiens",
    description: "A brief history of humankind",
    price: 18.99,
    category: "History",
    stock: 32,
    image: "https://covers.openlibrary.org/b/id/8235557-L.jpg"
  },
  {
    id: 3,
    name: "Clean Code",
    description: "A handbook of agile software craftsmanship",
    price: 45.99,
    category: "Technology",
    stock: 28,
    image: "https://covers.openlibrary.org/b/id/8227858-L.jpg"
  },
  {
    id: 4,
    name: "Atomic Habits",
    description: "Tiny changes, remarkable results",
    price: 16.99,
    category: "Business",
    stock: 60,
    image: "https://covers.openlibrary.org/b/id/10958382-L.jpg"
  },
  {
    id: 5,
    name: "1984",
    description: "A dystopian social science fiction novel",
    price: 14.99,
    category: "Fiction",
    stock: 50,
    image: "https://covers.openlibrary.org/b/id/7222246-L.jpg"
  },
  {
    id: 6,
    name: "Thinking, Fast and Slow",
    description: "The two systems that drive the way we think",
    price: 19.99,
    category: "Science",
    stock: 38,
    image: "https://covers.openlibrary.org/b/id/7897643-L.jpg"
  },
  {
    id: 7,
    name: "The Lean Startup",
    description: "How constant innovation creates radically successful businesses",
    price: 22.99,
    category: "Business",
    stock: 42,
    image: "https://covers.openlibrary.org/b/id/7280888-L.jpg"
  },
  {
    id: 8,
    name: "Brief History of Time",
    description: "From the Big Bang to black holes",
    price: 17.99,
    category: "Science",
    stock: 35,
    image: "https://covers.openlibrary.org/b/id/8235557-L.jpg"
  }
];

// Book title variations by category
const bookTitleTemplates = {
  Fiction: [
    "The {adjective} {noun}",
    "{noun} of {place}",
    "The Last {noun}",
    "{adjective} Dreams",
    "Beyond the {noun}",
  ],
  History: [
    "{adjective} History of {topic}",
    "The Rise of {topic}",
    "{topic}: A Journey",
    "Understanding {topic}",
    "{topic} Through the Ages",
  ],
  Technology: [
    "{adjective} Code",
    "Mastering {topic}",
    "The Art of {topic}",
    "{topic} Patterns",
    "Modern {topic}",
  ],
  Business: [
    "{adjective} {noun}",
    "The {number} Laws of {topic}",
    "{topic} Mastery",
    "From Zero to {topic}",
    "The {topic} Playbook",
  ],
  Science: [
    "{adjective} {topic}",
    "The Science of {topic}",
    "{topic} Explained",
    "A Brief {topic}",
    "Thinking About {topic}",
  ],
  "Non-Fiction": [
    "{adjective} {noun}",
    "The Power of {topic}",
    "{topic} Revolution",
    "Living {adjective}",
    "The {topic} Effect",
  ],
  Health: [
    "{adjective} Body",
    "The {topic} Method",
    "Heal with {topic}",
    "{topic} for Life",
    "The Science of {topic}",
  ],
  Art: [
    "The {adjective} Canvas",
    "{topic} Masterclass",
    "Creating {adjective} Art",
    "{topic} Techniques",
    "The Art of {topic}",
  ],
};

// Words to fill templates
const adjectives = [
  "Silent", "Hidden", "Lost", "Eternal", "Modern", "Ancient", 
  "Ultimate", "Complete", "Essential", "Revolutionary", "Practical"
];

const nouns = [
  "Journey", "Story", "Mystery", "Adventure", "Legend", 
  "Challenge", "Revolution", "Transformation", "Discovery"
];

const places = [
  "Tomorrow", "Yesterday", "Paradise", "Shadows", "Dawn", 
  "Midnight", "Heaven", "Time", "Dreams"
];

const topics = [
  "Innovation", "Leadership", "Creativity", "Success", "Productivity",
  "Mind", "Learning", "Change", "Growth", "Excellence"
];

const numbers = ["3", "5", "7", "10", "12", "21"];

// Description templates by category
const descriptionTemplates = {
  Fiction: [
    "A captivating tale of {topic} and {topic2}",
    "An unforgettable journey through {place}",
    "{adjective} story that will keep you turning pages",
    "A masterpiece of contemporary fiction",
  ],
  History: [
    "A comprehensive exploration of {topic}",
    "Discover the untold story of {topic}",
    "From ancient times to the modern era",
    "The definitive history of {topic}",
  ],
  Technology: [
    "Master the fundamentals of {topic}",
    "A practical guide to {topic} excellence",
    "Learn industry best practices and techniques",
    "Essential knowledge for modern developers",
  ],
  Business: [
    "Transform your approach to {topic}",
    "Proven strategies for success in {topic}",
    "Build better habits and achieve more",
    "The ultimate guide to {topic}",
  ],
  Science: [
    "Explore the fascinating world of {topic}",
    "Understanding the universe through {topic}",
    "Complex concepts made simple",
    "A journey through scientific discovery",
  ],
  "Non-Fiction": [
    "Life-changing insights on {topic}",
    "Practical wisdom for everyday life",
    "Transform your {topic} today",
    "Essential reading for personal growth",
  ],
  Health: [
    "Improve your wellness through {topic}",
    "Natural approaches to better health",
    "Science-based strategies for {topic}",
    "Transform your body and mind",
  ],
  Art: [
    "Master the techniques of great artists",
    "From beginner to expert in {topic}",
    "Unlock your creative potential",
    "The complete guide to {topic}",
  ],
};

function getRandom<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function fillTemplate(template: string): string {
  return template
    .replace("{adjective}", getRandom(adjectives))
    .replace("{noun}", getRandom(nouns))
    .replace("{place}", getRandom(places))
    .replace("{topic}", getRandom(topics))
    .replace("{topic2}", getRandom(topics))
    .replace("{number}", getRandom(numbers));
}

// Generate products using real books as templates
export function generateMockProducts(count: number): Product[] {
  return Array.from({ length: count }, (_, i) => {
    // Pick a random template book
    const templateBook = MOCK_PRODUCTS[i % MOCK_PRODUCTS.length];
    const category = templateBook.category as keyof typeof bookTitleTemplates;
    
    // Generate title using category-specific templates
    const titleTemplates = bookTitleTemplates[category] || bookTitleTemplates["Non-Fiction"];
    const titleTemplate = getRandom(titleTemplates);
    const name = fillTemplate(titleTemplate);
    
    // Generate description using category-specific templates
    const descTemplates = descriptionTemplates[category] || descriptionTemplates["Non-Fiction"];
    const descTemplate = getRandom(descTemplates);
    const description = fillTemplate(descTemplate);
    
    // Price based on template book's price range (±30%)
    const priceVariation = 0.3;
    const minPrice = templateBook.price * (1 - priceVariation);
    const maxPrice = templateBook.price * (1 + priceVariation);
    const price = Number((Math.random() * (maxPrice - minPrice) + minPrice).toFixed(2));
    
    // Stock similar to template
    const stockVariation = 20;
    const templateStock = templateBook.stock ?? 1;
    const stock = Math.max(
      1, 
      templateStock + Math.floor(Math.random() * stockVariation * 2) - stockVariation
    );

    // Use template book's image with variation
    const imageId = 7222246 + Math.floor(Math.random() * 100000);
    const image = `https://covers.openlibrary.org/b/id/${imageId}-L.jpg`;
    
    return {
      id: i + 1,
      name,
      description,
      price,
      category: templateBook.category,
      stock,
      image,
    };
  });
}

// Generate only additional products beyond the base 8
export function generateAdditionalProducts(additionalCount: number): Product[] {
  const generated = generateMockProducts(additionalCount);
  // Adjust IDs to start after MOCK_PRODUCTS
  return generated.map((p, i) => ({
    ...p,
    id: MOCK_PRODUCTS.length + i + 1,
  }));
}

// Get real products + generated ones
export function getAllProducts(totalCount: number): Product[] {
  if (totalCount <= MOCK_PRODUCTS.length) {
    return MOCK_PRODUCTS.slice(0, totalCount);
  }
  
  const additionalCount = totalCount - MOCK_PRODUCTS.length;
  const additionalProducts = generateAdditionalProducts(additionalCount);
  
  return [...MOCK_PRODUCTS, ...additionalProducts];
}