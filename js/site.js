// Mobile menu: toggle open/closed and close after choosing a section.
(function () {
    var toggle = document.getElementById('navToggle');
    var menu = document.getElementById('navMenu');
    if (!toggle || !menu) return;

    function setOpen(open) {
        menu.classList.toggle('open', open);
        toggle.setAttribute('aria-expanded', String(open));
        toggle.textContent = open ? 'Close' : 'Menu';
    }

    toggle.addEventListener('click', function () {
        setOpen(!menu.classList.contains('open'));
    });

    menu.addEventListener('click', function (event) {
        if (event.target.closest('a')) setOpen(false);
    });

    document.addEventListener('keydown', function (event) {
        if (event.key === 'Escape' && menu.classList.contains('open')) {
            setOpen(false);
            toggle.focus();
        }
    });
})();
