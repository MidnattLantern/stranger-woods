export function enableKeyboardNavigation() {
    document.addEventListener('keydown', (event) => {
        const focused = document.activeElement as HTMLElement;

        if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            const buttons = Array.from(
                document.querySelectorAll<HTMLButtonElement>(
                    '#sceneWrapper button:not(:disabled), .room-intro-overlay button:not(:disabled)'
                )
            ).filter(btn => {
                const rect = btn.getBoundingClientRect();
                return rect.width > 0 && rect.height > 0;
            });

            const currentIndex = buttons.indexOf(focused as HTMLButtonElement);

            if (event.key === 'ArrowDown') {
                const next = buttons[currentIndex + 1] ?? buttons[0];
                next?.focus();
                next?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            } else {
                const prev = buttons[currentIndex - 1] ?? buttons[buttons.length - 1];
                prev?.focus();
                prev?.scrollIntoView({ behavior: 'smooth', block: 'center' });
            }
        }

        if (event.key === 'Enter') {
            if (focused?.tagName === 'BUTTON' && !focused.hasAttribute('disabled')) {
                event.preventDefault();
                event.stopPropagation();
                focused.click();
            }
        }
    }, true);

    // const observer = new MutationObserver(() => {
    //     setTimeout(() => {
    //         const firstBtn = document.querySelector<HTMLButtonElement>(
    //             '#sceneWrapper button:not(:disabled), .room-intro-overlay button:not(:disabled)'
    //         );
    //         if (document.activeElement === document.body || document.activeElement === null) {
    //             firstBtn?.focus();
    //         }
    //     }, 300);
    // });

    // observer.observe(sceneWrapper ?? document.body, { childList: true, subtree: true });
}