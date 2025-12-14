"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthStore } from "@/store/auth.store";
import MobileMenu from "../MobileMenu/MobileMenu";
import styles from "./Header.module.css";

interface NavItem {
    label: string;
    href: string;
}

const guestNav: NavItem[] = [
    { label: "Головна", href: "/" },
    { label: "Інструменти", href: "/tools" },
];

const authNav: NavItem[] = [
    { label: "Головна", href: "/" },
    { label: "Інструменти", href: "/tools" },
    { label: "Мій профіль", href: "/profile" },
    { label: "Опублікувати оголошення", href: "/create" },
];

export default function Header() {
    const pathname = usePathname();
    const { isAuthenticated, user } = useAuthStore();
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const navItems = isAuthenticated ? authNav : guestNav;

    const displayName = user?.name || user?.email?.split("@")[0] || "User";
    const initial = displayName.charAt(0).toUpperCase();

    const handleLogout = () => {
        // TODO: вызвать ConfirmationModal перед выходом
        console.log("logout clicked");
    };

    useEffect(() => {
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") setIsMenuOpen(false);
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, []);

    const renderNavLinks = () => (
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
                        >
                            {item.label}
                        </Link>
                    </li>
                ))}
            </ul>
        </nav>
    );

    return (
        <header className={styles.header}>
            <div className="container">
                <div className={styles.inner}>
                    <div className={styles.left}>
                        <Link href="/" className={styles.logo}>
                            <Image
                                src="/svg/logo.svg"
                                alt="ToolNext"
                                width={124}
                                height={20}
                                priority
                            />
                        </Link>
                    </div>

                    <div className={styles.right}>
                        <div className={styles.desktopNav}>{renderNavLinks()}</div>

                        {!isAuthenticated && (
                            <div className={styles.actions}>
                                <Link href="/auth/login" className={styles.linkButton}>
                                    Увійти
                                </Link>
                                <Link href="/auth/register" className={styles.primaryButton}>
                                    Зареєструватися
                                </Link>
                            </div>
                        )}

                        {isAuthenticated && (
                            <div className={styles.userBlock}>
                                <div className={styles.avatar}>{initial}</div>
                                <div className={styles.userName}>{displayName}</div>
                                <button
                                    type="button"
                                    className={styles.logoutButton}
                                    onClick={handleLogout}
                                >
                                    Вихід
                                </button>
                            </div>
                        )}

                        <button
                            type="button"
                            aria-label="Меню"
                            className={styles.burger}
                            onClick={() => setIsMenuOpen(true)}
                        >
                            <span />
                            <span />
                            <span />
                        </button>
                    </div>
                </div>
            </div>

            <MobileMenu
                isOpen={isMenuOpen}
                onClose={() => setIsMenuOpen(false)}
                navItems={navItems}
                isAuthenticated={isAuthenticated}
                displayName={displayName}
                initial={initial}
                onLogout={handleLogout}
            />
        </header>
    );
}
