"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";
import { usePathname } from "next/navigation";
import styles from "./MobileMenu.module.css";

interface NavItem {
    label: string;
    href: string;
}

interface Props {
    isOpen: boolean;
    onClose: () => void;
    navItems: NavItem[];
    isAuthenticated: boolean;
    displayName: string;
    initial: string;
    onLogout: () => void;
}

export default function MobileMenu({
    isOpen,
    onClose,
    navItems,
    isAuthenticated,
    displayName,
    initial,
    onLogout,
}: Props) {
    const pathname = usePathname();

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        if (isOpen) {
            window.addEventListener("keydown", onKey);
        }
        return () => window.removeEventListener("keydown", onKey);
    }, [isOpen, onClose]);

    if (!isOpen) return null;

    return (
        <div className={styles.overlay}>
            <div className={styles.panel}>
                <div className={styles.topBar}>
                    <div className={styles.logoWrap}>
                        <Link href="/" onClick={onClose}>
                            <Image
                                src="/svg/logo.svg"
                                alt="ToolNext"
                                width={124}
                                height={20}
                            />
                        </Link>
                    </div>

                    <button
                        type="button"
                        aria-label="Закрити меню"
                        className={styles.closeButton}
                        onClick={onClose}
                    >
                        ✕
                    </button>
                </div>

                {isAuthenticated && (
                    <div className={styles.userBlock}>
                        <div className={styles.avatar}>{initial}</div>
                        <div className={styles.userName}>{displayName}</div>
                        <button
                            type="button"
                            className={styles.logoutButton}
                            onClick={() => {
                                onLogout();
                                onClose();
                            }}
                        >
                            Вихід
                        </button>
                    </div>
                )}

                <nav className={styles.nav}>
                    <ul className={styles.navList}>
                        {navItems.map((item) => (
                            <li key={item.href}>
                                <Link
                                    href={item.href}
                                    className={
                                        pathname === item.href
                                            ? styles.navLinkActive
                                            : styles.navLink
                                    }
                                    onClick={onClose}
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </nav>

                {!isAuthenticated && (
                    <div className={styles.actions}>
                        <Link
                            href="/auth/login"
                            className={styles.linkButton}
                            onClick={onClose}
                        >
                            Увійти
                        </Link>
                        <Link
                            href="/auth/register"
                            className={styles.primaryButton}
                            onClick={onClose}
                        >
                            Зареєструватися
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
