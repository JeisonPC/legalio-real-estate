"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";
import styles from "./Aside.module.css";

type AsideItem = {
    label: string;
    href: string;
};

type AsideProps = {
    items: AsideItem[];
};

export default function Aside({ items }: AsideProps) {
    const pathname = usePathname();

    return (
        <aside className={styles.aside}>
            <ul className={styles.list}>
                {items.map((item) => {
                    const isActive = pathname === item.href;

                    return (
                        <li key={item.href}>
                            <Link
                                href={item.href}
                                className={`${styles.link} ${isActive ? styles.active : ""
                                    }`}
                            >
                                {item.label}
                            </Link>
                        </li>
                    );
                })}
            </ul>
        </aside>
    );
}