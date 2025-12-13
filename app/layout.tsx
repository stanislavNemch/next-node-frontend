// app/layout.tsx
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
    weight: ["400", "500", "600", "700"], // Regular, Medium, SemiBold, Bold
    subsets: ["latin", "cyrillic"],
    display: "swap",
    variable: "--font-Inter",
});

export const metadata: Metadata = {
    title: "Tools – Create Tools",
    description: "Create, organize and manage your notes easily with Tools.",
    openGraph: {
        title: "NoteHub – Create Tools",
        description:
            "Create, organize and manage your notes easily with Tools.",
        url: "",
        images: [
            {
                url: "",
                width: 1200,
                height: 630,
                alt: "Tools gifts",
            },
        ],
    },
};

export default function RootLayout({
    children,
    modal,
}: {
    children: React.ReactNode;
    modal: React.ReactNode;
}) {
    return (
        <html lang="en">
            <body className={`${inter.variable}`}>
                <main>{children}</main>
                {modal}
            </body>
        </html>
    );
}
