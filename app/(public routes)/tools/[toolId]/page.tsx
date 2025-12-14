import type { Metadata } from "next";
import { getToolById } from "@/lib/api/tools";
import { Tool } from "@/types/tool";

type Props = { params: { toolId: string } };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const id = params.toolId;
    try {
        const tool: Tool = await getToolById(id);
        const title = `${tool.name} — Оренда інструмента`;
        const description =
            tool.description?.slice(0, 160) ||
            "Інструмент для оренди на ToolNext.";
        const ogImage = tool.images?.[0] || "/image/og-tool.jpg";
        return {
            title,
            description,
            openGraph: {
                title,
                description,
                type: "article",
                images: [{ url: ogImage }],
            },
        };
    } catch {
        return {
            title: "Інструмент — ToolNext",
            description: "Перегляд інструмента",
        };
    }
}

export default async function Page({ params }: Props) {
    // This page content will be implemented later
    return null;
}
