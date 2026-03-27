import { state } from '../../state/gamestate';
import { render } from '../../main';
import './about-scene.scss';

const sceneWrapper = document.getElementById(
    'sceneWrapper',
) as HTMLDivElement | null;

export function renderAboutScene() {
    if (!sceneWrapper) {
        console.error('sceneWrapper element not found');
        return;
    }
    sceneWrapper.innerHTML = ''; // reset

    // Container
    const aboutContainer = document.createElement('div');
    aboutContainer.classList.add('about-container');

    // Title
    const title = document.createElement('h2');
    title.textContent = 'About Stranger Woods';
    aboutContainer.append(title);

    // Story
    const storySection = document.createElement('section');
    const storyTitle = document.createElement('h3');
    storyTitle.textContent = 'The Story';

    const storyText = document.createElement('p');
    storyText.textContent =
        'Stranger Woods is a digital escape room experience set in a mysterious woodland filled with secrets and wonders. Legend has it that those who enter may never return — but brave souls who dare to venture in may discover incredible things. The game consists of 6 interconnected rooms. The first five each conceal hidden artifacts, and collecting them is the key to unlocking and conquering the *Final Room* and claiming your escape.';
    storySection.append(storyTitle, storyText); //TODO: Lägg till mer story senare

    // How to play
    const instrSection = document.createElement('section');
    const instrTitle = document.createElement('h3');
    instrTitle.textContent = 'How to Play';
    const instrList = document.createElement('ul');

    const instructions = [
        'Keep an eye on the timer - you have a 50-minute total timer to escape the forest. Every second counts.',
        'Each room has its own individual timer, solve the room before time runs out. If you fail, you must replay it and the lost time is deducted from your total.',
        'Collect the artifacts hidden in each of the first five rooms. The artifacts are required to complete the Final Room.',
        'Complete the game fast enough and you may earn a place on the Top 10 Highscore — and share your results with the world.',
        'Log in with a username to start the game.',
        'If you leave the game, your progress and remaining time are automatically saved so you can pick up exactly where you left off.',
        'To start over or play under a different username, simply start a new game.',
    ];

    instructions.forEach((text) => {
        const li = document.createElement('li');
        li.textContent = text;
        instrList.append(li);
    });

    instrSection.append(instrTitle, instrList);

    // Credits (gruppmedlemmar & bilder)
    const creditSection = document.createElement('section');
    const creditTitle = document.createElement('h3');
    creditTitle.classList.add('credits-font');
    creditTitle.textContent = 'Credits';

    const devText = document.createElement('p');
    devText.classList.add('credits-font');
    devText.innerHTML =
        'Created by: <a href="https://github.com/MidnattLantern" target="_blank">Alma Isaksson</a>, <a href="https://github.com/aldacat-fed" target="_blank">Alda Catovic</a>, <a href="https://github.com/isabelletherese" target="_blank">Isabelle Reynolds</a>, <a href="https://github.com/Prxjec-t" target="_blank">Kimi Leminaho</a>, <a href="https://github.com/Linboe" target="_blank">Linn Boekhout</a> and <a href="https://github.com/RasmusFranssonHub" target="_blank">Rasmus Andreas Fransson</a>';

    const photoCredits = document.createElement('p');
    photoCredits.classList.add('credits-font');
    photoCredits.innerHTML = `<em>Images: 
        <a href="https://www.peakpx.com/en/hd-wallpaper-desktop-ervkg" target="_blank">Wallpaper via Peakpx.</a>,
        <a href="https://x.com/Giorgio51589046/status/2030344017657954455" target="_blank">Background Room1 by [Stazio Koppenberg]</a>, 
        <a href="https://se.pinterest.com/pin/602567625183196158/" target="_blank">Background Room2 via Pinterest</a>,
        <a href="https://www.tumblr.com/thewoodbetween/185853037261/passion-amongst-the-palms-phil-lockwood" target="_blank">Background Room3 by [Phil Lockwood]</a>,
        <a href="https://wbb.gallery/refugium/?lang=en" target="_blank">Background Room4 by via WBB GALLERY</a>,
        <a href="https://se.pinterest.com/pin/441915782208002774/" target="_blank">Background Room5 via Pinterest</a>,
        <a href="https://www.pexels.com/photo/dramatic-peak-view-in-italian-dolomites-32563286/" target="_blank">Background Room6 by [Alexandre Moreira]</a>,
        <a href="https://uk.pinterest.com/pin/1100848702683454160/" target="_blank">Amethyst via Pinterest</a>, 
        <a href="https://se.pinterest.com/pin/23081016834121350/" target="_blank">Feather via Pinterest</a>,
        <a href="https://www.zbrushcentral.com/t/betta-fish/207981" target="_blank">Fish-statue by [xueshuai0810]</a>,
        <a href="https://www.magicalomaha.com/p/967-Dragon-Eye-Key-Wall-Plaque.aspx" target="_blank">Key via magicalomaha</a>,
        <a href="https://lawlovepqr.click/product_details/16579977.html" target="_blank">Ladder by lawlovepqr</a>,
        <a href="https://www.ubuy.com.se/en/product/FNLFXU46G-wonuu-car-rubber-duck-yellow-duck-decoration-dashboard-with-sun-hat-swim-ring-necklace-sunglasses-for-car-dashboard-decorations-white-spots-black-co?ref=hm-google-redirect" target="_blank">Rubber-duck via Ubuy</a>,
        <a href="https://cults3d.com/en/3d-model/game/living-jar-pot-boy-plant-pot-from-elden-ring" target="_blank">Walking-pot via Cults3d.</a>,
        <a href="https://wall.alphacoders.com/big.php?i=585535" target="_blank">Dragon by [Xiaodi Jin]</a>, 
        <a href="https://es.pinterest.com/pin/827114287843767261/" target="_blank">Red Dragon via Pinterest</a>,
        <a href="https://se.pinterest.com/pin/319051954871960990/" target="_blank">Tiger by [Wenqing Yan] via Pinterest</a>,
        <a href="https://uk.pinterest.com/pin/4644405861263709/" target="_blank">Deer via Pinterest</a>,
        <a href="https://uk.pinterest.com/pin/12173861489614146/" target="_blank">Fawn via Pinterest</a>,
        <a href="https://x.com/StephenGeoRae/status/1980280037447254490" target="_blank">Fox by [Stephanie Bayles]</a>,
        <a href="https://se.pinterest.com/pin/653936808430811517/" target="_blank">Horse via Pinterest</a>,
        <a href="https://se.pinterest.com/pin/13370130139310807/" target="_blank">Fairys via Pinterest</a>,
        <a href="https://i.pinimg.com/736x/3a/ae/86/3aae86896045c9c523b50fefa80de41f.jpg" target="_blank">Celestial night sky via Pinterest</a>
</em>`;

    creditSection.append(creditTitle, devText, photoCredits);

    // Back button
    const backBtn = document.createElement('button');
    backBtn.id = 'backToMenuBtn';
    backBtn.textContent = 'Back to main menu';
    backBtn.addEventListener('click', () => {
        state.screen = 'menu';
        render();
    });

    // Lägg till alla sektioner i containern och sedan i wrapper
    aboutContainer.append(storySection, instrSection, creditSection, backBtn);
    sceneWrapper.append(aboutContainer);
}
