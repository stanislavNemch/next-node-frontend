import FeaturedToolsBlock from "@/components/home/FeaturedToolsBlock/FeaturedToolsBlock";
import Header from "@/components/layout/Header/Header";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "ToolNext — Оренда інструментів",
    description:
        "Знайдіть потрібний інструмент або здайте свій в оренду на ToolNext.",
    openGraph: {
        title: "ToolNext — Оренда інструментів",
        description:
            "Каталог інструментів для оренди. Додавайте свої та знаходьте потрібні.",
        url: "https://toolnext.example/",
        type: "website",
        images: [
            {
                url: "/image/og-home.jpg",
                width: 1200,
                height: 630,
                alt: "ToolNext Home",
            },
        ],
    },
    icons: {
        icon: "/favicon.ico",
    },
};

export default function HomePage() {
    return (
        <main>
            <FeaturedToolsBlock />
        </main>
    );
}
