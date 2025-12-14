import { Tool } from "@/types/tool";
import { getTools } from "@/lib/api/tools";
import styles from "./FeaturedToolsBlock.module.css";
import FeaturedToolsBlockClient from "./FeaturedToolsBlockClient";

// Функция для получения данных на сервере
async function getFeaturedTools(): Promise<{
    tools: Tool[];
    error?: string;
}> {
    try {
        const data = await getTools({ page: 1, limit: 8 });
        // API возвращает поле "tools", а не "data"
        const tools = Array.isArray(data.tools) ? data.tools : [];
        console.log("Loaded tools:", tools.length);
        return { tools };
    } catch (error) {
        console.error("Error fetching featured tools:", error);
        return {
            tools: [],
            error: "Failed to load tools",
        };
    }
}

export default async function FeaturedToolsBlock() {
    const { tools, error } = await getFeaturedTools();

    return (
        <FeaturedToolsBlockClient initialTools={tools} error={error} />
    );
}
