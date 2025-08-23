const API_URL = "/api/admin/category";

// fetch all categories
export const fetchCategories = async () => {
  const res = await fetch(API_URL);
  if (!res.ok) throw new Error("Failed to fetch categories");
  const data = await res.json();
  return data.categories;
};

// create a new category
export const createCategory = async (category: { name: string; parent?: string }) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(category),
  });
  if (!res.ok) throw new Error("Failed to create category");
  const data = await res.json();
  return data.category;
};
