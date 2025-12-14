"use client";

import Image from "next/image";
import Link from "next/link";
import { Trash2 } from "lucide-react";
import { Tool } from "@/types/tool";
import { useAuthStore } from "@/store/auth.store";
import styles from "./ToolCard.module.css";

interface ToolCardProps {
    tool: Tool;
    priority?: boolean;
}

export default function ToolCard({ tool, priority = false }: ToolCardProps) {
    const { isAuthenticated } = useAuthStore();

    // Безопасная обработка изображений
    const getMainImage = (): string => {
        const placeholder = "/image/Placeholder Image.png";

        if (!tool.images) return placeholder;

        // Если это строка
        if (typeof tool.images === "string") {
            return tool.images.trim() || placeholder;
        }

        // Если это массив
        if (Array.isArray(tool.images)) {
            const validImage = tool.images.find(
                (img) => img && typeof img === "string" && img.trim()
            );
            return validImage || placeholder;
        }

        return placeholder;
    };

    const mainImage = getMainImage();

    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault();
        // TODO: Реализовать через модальное окно подтверждения
    };

    // Формируем звезды рейтинга
    const renderStars = (rating: number) => {
        const stars = [];
        const roundedRating = Math.round(rating);

        for (let i = 1; i <= 5; i++) {
            stars.push(
                <span
                    key={i}
                    className={
                        i <= roundedRating
                            ? styles.starFilled
                            : styles.starEmpty
                    }
                >
                    ★
                </span>
            );
        }
        return <div className={styles.rating}>{stars}</div>;
    };

    return (
        <div className={styles.card}>
            <div className={styles.imageWrapper}>
                <Image
                    src={mainImage}
                    alt={tool.name}
                    fill
                    className={styles.image}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    priority={priority}
                    onError={(result) => {
                        result.currentTarget.src =
                            "/image/Placeholder Image.png";
                    }}
                />
            </div>

            <div className={styles.content}>
                <div className={styles.header}>
                    <h3 className={styles.title}>{tool.name}</h3>
                    <p className={styles.price}>{tool.pricePerDay} грн/доба</p>
                </div>

                {renderStars(tool.rating)}

                <div className={styles.actions}>
                    {isAuthenticated ? (
                        <>
                            <Link
                                href={`/dashboard/tools/${tool._id}/edit`}
                                className={styles.editButton}
                            >
                                Редагувати
                            </Link>
                            <button
                                type="button"
                                onClick={handleDelete}
                                className={styles.deleteButton}
                                aria-label="Видалити інструмент"
                            >
                                <Trash2 size={20} />
                            </button>
                        </>
                    ) : (
                        <Link
                            href={`/tools/${tool._id}`}
                            className={styles.detailsButton}
                        >
                            Детальніше
                        </Link>
                    )}
                </div>
            </div>
        </div>
    );
}
