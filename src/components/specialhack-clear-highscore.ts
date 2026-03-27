/** Special-hack to clear highscore
 *  click 3 times fast on title
 */

const SECRET_PASSWORD = 'dopefish';
const TRIPLE_CLICK_MS = 400;

type DetachFn = () => void; //remove listener when done
type SuccessCallback = () => void; //call if hack sucess

export function attachHighscoreHack(
    titleElement: HTMLElement,
    onSuccess: SuccessCallback,
): DetachFn {
    let clicks = 0;
    let resetTimer: number | null = null;

    function handleClick(): void {
        clicks++; // add click-counter when click

        if (resetTimer) clearTimeout(resetTimer); // if running-timer stop
        resetTimer = setTimeout(() => {
            //start new timer if user to slow timer reset clicks
            clicks = 0;
            resetTimer = null;
        }, TRIPLE_CLICK_MS);

        if (clicks >= 3) {
            clicks = 0;
            if (resetTimer) {
                clearTimeout(resetTimer);
                resetTimer = null;
            }
            askForPassword();
        }
    }

    function askForPassword(): void {
        const input = prompt('ENTER SECRET PASSWORD:');
        if (input === null) return;

        if (input.toLowerCase() === SECRET_PASSWORD) {
            onSuccess();
        } else {
            alert('Even the dopefish knows that is wrong');
        }
    }

    titleElement.addEventListener('click', handleClick);
    return () => titleElement.removeEventListener('click', handleClick);
}
