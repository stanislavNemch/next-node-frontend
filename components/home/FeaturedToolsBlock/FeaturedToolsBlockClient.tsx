"use client";

import { useEffect, useState } from "react";
import { Tool } from "@/types/tool";
import ToolCard from "@/components/tools/ToolCard/ToolCard";
import styles from "./FeaturedToolsBlock.module.css";
import Link from "next/link";

interface FeaturedToolsClientProps {
    initialTools: Tool[];
    error?: string;
}

export default function FeaturedToolsBlockClient({
    initialTools,
    error,
}: FeaturedToolsClientProps) {
    const [tools] = useState<Tool[]>(initialTools);
    const [errorMessage, setErrorMessage] = useState<string | null>(
        error || null
    );

    useEffect(() => {
        if (errorMessage) {
            const timer = setTimeout(() => setErrorMessage(null), 5000);
            return () => clearTimeout(timer);
        }
    }, [errorMessage]);

    if (errorMessage) {
        return (
            <section className={styles.section}>
                <div className="container">
                    <h2 className={styles.heading}>Популярні інструменти</h2>
                    <div className={styles.errorContainer}>
                        <p className={styles.errorMessage}>
                            ⚠️ Помилка при завантаженні інструментів. Спробуйте
                            пізніше.
                        </p>
                    </div>
                </div>
            </section>
        );
    }

    if (!tools || tools.length === 0) {
        return (
            <section className={styles.section}>
                <div className="container">
                    <h2 className={styles.heading}>Популярні інструменти</h2>
                    <p className={styles.emptyMessage}>
                        На жаль, наразі немає доступних інструментів.
                    </p>
                </div>
            </section>
        );
    }

    return (
        <section className={styles.section}>
            <div className="container">
                <h2 className={styles.heading}>Популярні інструменти</h2>

                <div className={styles.grid}>
                    {tools.map((tool, index) => (
                        <ToolCard
                            key={tool._id || index}
                            tool={tool}
                            priority={index < 3}
                        />
                    ))}
                </div>

                <div className={styles.buttonWrapper}>
                    <Link href="/tools" className={styles.viewAllButton}>
                        До всіх інструментів
                    </Link>
                </div>
            </div>
        </section>
    );
}
