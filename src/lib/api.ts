
import { Product, Category } from "@/types";

const BASE_URL =
  "https://openapi.programming-hero.com/api/bazardor";

type ApiRecord = Record<string, unknown>;

async function fetchJson(
  url: string,
  revalidate = 60
): Promise<unknown> {
  const response = await fetch(url, {
    next: { revalidate },
  });

  if (!response.ok) {
    throw new Error(
      `API request failed: ${response.status} ${response.statusText} (${url})`
    );
  }

  return response.json();
}


function extractArray(data: unknown): ApiRecord[] {
  if (Array.isArray(data)) {
    return data as ApiRecord[];
  }

  if (data && typeof data === "object") {
    const response = data as ApiRecord;

    for (const key of ["data", "products", "categories", "result"]) {
      if (Array.isArray(response[key])) {
        return response[key] as ApiRecord[];
      }
    }
  }

  return [];
}

function unwrapObject(data: unknown): ApiRecord {
  if (!data || typeof data !== "object") {
    throw new Error("Invalid API response.");
  }

  const response = data as ApiRecord;

  for (const key of ["data", "product", "result"]) {
    const value = response[key];

    if (value && typeof value === "object" && !Array.isArray(value)) {
      return value as ApiRecord;
    }
  }

  return response;
}

function normalizeProduct(p: ApiRecord): Product {
  const id = (p.id ?? p._id ?? "") as string | number;
  const nameBn = String(p.nameBn ?? p.name ?? "");
  const today = Number(p.today ?? p.price ?? 0);
  const yesterday = Number(
    p.yesterday ?? p.previousPrice ?? 0
  );
  const unit = String(p.unit ?? "কেজি");

  const description = String(
    p.description ??
    `${nameBn} - আজকের বাজার দর প্রতি ${unit} ৳${today}`
  );

  return {
    ...(p as unknown as Product),
    id,
    _id: String(id),
    name: nameBn,
    nameBn,
    price: today,
    today,
    previousPrice: yesterday,
    yesterday,
    unit,
    description,
  };
}

function normalizeCategory(c: ApiRecord): Category {
  const id = String(c.id ?? c._id ?? c.slug ?? "");
  const nameBn = String(c.nameBn ?? c.name ?? "");

  return {
    ...(c as unknown as Category),
    id,
    _id: id,
    name: nameBn,
    nameBn,
  };
}

export async function getCategories(): Promise<Category[]> {
  const data = await fetchJson(`${BASE_URL}/categories`, 3600);

  return extractArray(data).map(normalizeCategory);
}

export async function getProducts(
  category?: string
): Promise<Product[]> {
  const url = new URL(`${BASE_URL}/products`);

  if (category) {
    url.searchParams.set("category", category);
  }

  const data = await fetchJson(url.toString(), 60);

  return extractArray(data).map(normalizeProduct);
}

export async function getProductDetails(
  id: string | number
): Promise<Product> {
  const data = await fetchJson(
    `${BASE_URL}/products/${encodeURIComponent(String(id))}`,
    60
  );

  return normalizeProduct(unwrapObject(data));
}
