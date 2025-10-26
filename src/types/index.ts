export interface Product {
  id: number;
  title?: string;
  name: string;
  description?: string;
  price: number;
  image?: string;
  category?: string;
  stock?: number;
  createdAt?: string | Date;
  updatedAt?: string | Date;
}
