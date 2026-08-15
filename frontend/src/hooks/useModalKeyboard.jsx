import { useEffect, useRef } from "react";

const FOCUSABLE_SELECTOR =
  'a[href], button:not([disabled]), textarea:not([disabled]), input:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

/**
 * Maneja el comportamiento de teclado esperado en un modal/dialog:
 * - Escape cierra el modal.
 * - Tab / Shift+Tab quedan atrapados dentro del modal (focus trap).
 * - Al abrir, el foco se mueve al primer elemento enfocable del modal.
 * - Al cerrar, el foco vuelve al elemento que tenía el foco antes de abrir.
 */
export function useModalKeyboard(onClose) {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const previouslyFocused = document.activeElement;

    const getFocusableElements = () =>
      Array.from(container.querySelectorAll(FOCUSABLE_SELECTOR));

    // Al abrir, mueve el foco al primer campo/boton del modal
    const focusableOnOpen = getFocusableElements();
    (focusableOnOpen[0] || container).focus();

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
        return;
      }

      if (event.key === "Tab") {
        const elements = getFocusableElements();
        if (elements.length === 0) return;

        const first = elements[0];
        const last = elements[elements.length - 1];

        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    }

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      // Devuelve el foco a donde estaba antes de abrir el modal
      if (previouslyFocused instanceof HTMLElement) {
        previouslyFocused.focus();
      }
    };
  }, [onClose]);

  return containerRef;
}
