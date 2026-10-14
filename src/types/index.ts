export interface MarketPrice {
  market: string;
  division: string;
  min: number;
  max: number;
}

export interface Product {
  id: number | string;
  _id?: string;
  slug: string;
  nameBn: string;
  name: string;
  category: string;
  categoryNameBn?: string;
  categoryIcon?: string;
  unit: string;
  image: string;
  today: number;
  price: number;
  yesterday: number;
  previousPrice: number;
  lastWeek?: number;
  lastMonth?: number;
  change?: {
    dir: "up" | "down" | "flat" | string;
    pct: number;
  };
  description?: string;
  markets?: MarketPrice[];
  priceHistory?: { date: string; price: number }[];
}

export interface Category {
  id: string;
  _id?: string;
  slug: string;
  nameBn: string;
  name: string;
  icon?: string;
}