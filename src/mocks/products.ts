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

export function generateMockProducts(count: number): Product[] {

  const adjectives = ["Premium", "Compact", "Wireless", "Eco-Friendly"];
  const nouns = ["Headphones", "Backpack", "Sneakers", "Book"];

  function getRandom<T>(arr: T[]): T {
    return arr[Math.floor(Math.random() * arr.length)];
  }

  return Array.from({ length: count }, (_, i) => {
    const category = getRandom(categories);
    const name = `${getRandom(adjectives)} ${getRandom(nouns)}`;
    const price = Number((Math.random() * 300 + 10).toFixed(2));
    const stock = Math.floor(Math.random() * 100) + 1;
    const image = `https://picsum.photos/seed/product${i}/400/300`;

    return {
      id: i + 1,
      name,
      description: `The ${name} is a ${category.toLowerCase()} product`,
      price,
      category,
      stock,
      image,
    };
  });
}

