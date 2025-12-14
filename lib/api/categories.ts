import { Tool } from "@/types/tool";

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://toolsbackend-zzml.onrender.com/api";

export interface GetCategoriesResponse {
    _id: string;
    title: string;
    description?: string;
    keywords?: string;
}

/**
 * Отримання списку всіх категорій (Public)
 */
export const getCategories = async (): Promise<GetCategoriesResponse[]> => {
    const res = await fetch(`${API_URL}/categories`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: { revalidate: 3600 }, // Кеш на 1 час
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch categories");
    }

    return res.json();
};
