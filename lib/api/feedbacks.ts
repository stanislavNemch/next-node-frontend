export interface UserInfo {
    _id: string;
    name: string;
    avatarUrl?: string;
}

export interface Feedback {
    _id: string;
    rate: number;
    description: string;
    owner: UserInfo;
    toolId?: string;
}

export interface GetFeedbacksParams {
    page?: number;
    limit?: number;
    toolId?: string;
}

export interface GetFeedbacksResponse {
    page: number;
    limit: number;
    totalFeedbacks: number;
    totalPages: number;
    data: Feedback[];
}

const API_URL =
    process.env.NEXT_PUBLIC_API_URL ||
    "https://toolsbackend-zzml.onrender.com/api";

/**
 * Отримання списку відзивів (Public)
 * @param params - параметри фільтрації та пагінації
 */
export const getFeedbacks = async (
    params: GetFeedbacksParams = {}
): Promise<GetFeedbacksResponse> => {
    const query = new URLSearchParams();

    if (params.page) query.append("page", params.page.toString());
    if (params.limit) query.append("limit", params.limit.toString());
    if (params.toolId) query.append("toolId", params.toolId);

    const res = await fetch(`${API_URL}/feedbacks?${query.toString()}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
        next: { revalidate: 60 }, // Кеш на 1 хвилину
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to fetch feedbacks");
    }

    return res.json();
};

/**
 * Створення відзиву об інструменті (Private)
 */
export const createFeedback = async (
    toolId: string,
    rate: number,
    description: string
): Promise<Feedback> => {
    const res = await fetch(`${API_URL}/feedbacks`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            toolId,
            rate,
            description,
        }),
        credentials: "include",
    });

    if (!res.ok) {
        const errorData = await res.json().catch(() => ({}));
        throw new Error(errorData.message || "Failed to create feedback");
    }

    return res.json();
};
