import isMobile from 'is-mobile';
import lozad from 'lozad'

document.addEventListener('DOMContentLoaded', function () {
    if (isMobile() === true) {
        import('./module/mobilemenu').then(function ({default: init}) {
            const menu = document.querySelector('.mobile-menu');

            init(menu, document.body);
        });
    }

    const observer = lozad();
    observer.observe();

});
