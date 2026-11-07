import { useEffect, useRef, type ReactNode } from "react"
import { Button } from "../button"
import styles from "./Modal.module.css"

type ModalProps = {
    label: string
    children: ReactNode
    onClose: () => void
}

export function Modal({label, children, onClose}: ModalProps) {
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        const dialog = dialogRef.current;

        if (!dialog) return

        dialog.showModal();

        return () => dialog.close()
    }, [])

    return (
        <dialog
            ref={dialogRef}
            className={styles.modal}
            aria-label={label}
            onClick={((event) => {
                if (event.target === event.currentTarget) {
                    onClose()
                }
            })}
            onCancel={((event) => {
                event.preventDefault()
                onClose()
            })}
        >
            <div className={styles.content}>
                <Button
                    type="button"
                    className={styles.closeButton}
                    aria-label="Закрыть окно"
                    onClick={onClose}
                >
                    <span aria-label="true">×</span>
                </Button>

                {children}
            </div>
        </dialog>
    )
}