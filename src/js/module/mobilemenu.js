import '../../scss/components/mobile-menu-icon.scss';
import '../../scss/blocks/mobile-menu.scss';

let items = [];
let icon;
let menu;
let container;

export default function (_menu, _container) {
    const map = Array.prototype.map || throw new TypeError('Map is not supported');

    menu = _menu;
    container = _container;

    items = menu.querySelectorAll('.mobile-menu__item');
    icon = menu.querySelector('.mobile-menu__icon');

    const toggleItems = () => items::map(item => item.classList.toggle('state--hide'));

    toggleItems();

    icon.classList.remove('state--hide');
    icon.addEventListener('click', (evt) => {
        evt.preventDefault();

        icon.classList.toggle('menu-icon_animate_criss-cross');
        icon.classList.toggle('menu-icon--active');
        icon.classList.toggle('mobile-menu__icon_state--open');
        menu.classList.toggle('mobile-menu_state--open');
        container.classList.toggle('state--no-scroll');

        toggleItems();
    });
}