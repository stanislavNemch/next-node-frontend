"use client";
import { useEffect, useState } from "react";
import styles from "./Toast.module.css";

interface ToastProps {
    message?: string;
    duration?: number;
}

export default function Toast({ message = "", duration = 3000 }: ToastProps) {
    const [visible, setVisible] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        if (!message) return;
        setText(message);
        setVisible(true);
        const t = setTimeout(() => setVisible(false), duration);
        return () => clearTimeout(t);
    }, [message, duration]);

    return (
        <div
            className={visible ? styles.toast : styles.hide}
            role="status"
            aria-live="polite"
        >
            {text}
        </div>
    );
}
