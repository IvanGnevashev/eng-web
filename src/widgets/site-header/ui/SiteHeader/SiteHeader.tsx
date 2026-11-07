import { useCallback, useEffect, useRef, useState } from "react";
import { Button } from "../../../../shared/ui/button";
import { CatalogPanel } from "../CatalogPanel";
import styles from './SiteHeader.module.css'
import { ProfilePanel } from "../ProfileMenu";
import { Link } from "react-router";

export function SiteHeader() {
    const [isCatalogOpen, setIsCatalogOpen] = useState(false);
    const [isProfileOpen, setIsProfileOpen] = useState(false);

    const headerRef = useRef<HTMLElement>(null);
    const catalogButtonRef = useRef<HTMLButtonElement>(null);
    const profileButtonRef = useRef<HTMLButtonElement>(null);

    const closePanels = useCallback(
        (focusTarget?: HTMLButtonElement | null) => {
            setIsCatalogOpen(false);
            setIsProfileOpen(false);

            focusTarget?.focus()
        }, [],
    )

    useEffect(() => {
        if (!isCatalogOpen && !isProfileOpen) return

        function handlePointerDown(event: PointerEvent) {
            const header = headerRef.current
            const target = event.target;

            if (!header || !(target instanceof Node)) return;
            if (header.contains(target)) return;

            closePanels();
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === 'Escape') closePanels()
        }

        document.addEventListener('pointerdown', handlePointerDown);
        document.addEventListener('keydown', handleKeyDown);

        return () => {
            document.removeEventListener('pointerdown', handlePointerDown);
            document.removeEventListener('keydown', handleKeyDown);
        };
    }, [isCatalogOpen, isProfileOpen, closePanels])

    return (
        <header className={styles.header} ref={headerRef} >
            <div>
                <Button
                    ref={catalogButtonRef}
                    type="button"
                    aria-expanded={isCatalogOpen}
                    onClick={() => setIsCatalogOpen(!isCatalogOpen)}
                >
                    <span>Каталог</span>
                </Button>
                {isCatalogOpen && (
                    <CatalogPanel onClose={() => closePanels(catalogButtonRef.current)} />
                )}
            </div>
            <Link to={"/"} onClick={() => closePanels()}>
                <p>Logo</p>
            </Link>
            <div>
                <Button
                    ref={profileButtonRef}
                    type="button"
                    aria-expanded={isProfileOpen}
                    onClick={() => setIsProfileOpen(!isProfileOpen)}
                >
                    <span>Профиль</span>
                </Button>
                {isProfileOpen && (
                    <ProfilePanel onClose={() => closePanels(profileButtonRef.current)} />
                )}
            </div>
        </header>
    )
}