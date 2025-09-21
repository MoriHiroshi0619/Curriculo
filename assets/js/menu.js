(function () {
    const btnMobile = document.querySelector('.btn-mobile');
    const nav = document.querySelector('.menu');

    if (!btnMobile || !nav) return;
    btnMobile.setAttribute('aria-expanded', 'false');

    let lastToggle = 0;
    const DEBOUNCE_MS = 350;

    function lockScroll() {
        document.documentElement.style.overflow = 'hidden';
        document.body.style.overflow = 'hidden';
    }
    function unlockScroll() {
        document.documentElement.style.overflow = '';
        document.body.style.overflow = '';
    }

    function openMenu() {
        nav.classList.add('active');
        btnMobile.classList.add('active');
        btnMobile.setAttribute('aria-expanded', 'true');
        lockScroll();
    }

    function closeMenu() {
        nav.classList.remove('active');
        btnMobile.classList.remove('active');
        btnMobile.setAttribute('aria-expanded', 'false');
        unlockScroll();
    }

    function toggleMenu(event) {
        const now = Date.now();
        if (now - lastToggle < DEBOUNCE_MS) {
            if (event && event.preventDefault) event.preventDefault();
            return;
        }
        lastToggle = now;

        if (nav.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    }

    const usePointer = window.PointerEvent !== undefined;

    const primaryHandler = function (e) {
        if (e instanceof PointerEvent && e.pointerType === 'mouse' && e.button !== 0) return;
        toggleMenu(e);
    };

    if (usePointer) {
        btnMobile.addEventListener('pointerup', primaryHandler);
    } else {
        btnMobile.addEventListener('click', function (e) {
            toggleMenu(e);
        }, { passive: false });
    }

    btnMobile.addEventListener('keydown', function (e) {
        if (e.key === 'Enter' || e.key === ' ' || e.code === 'Space') {
            e.preventDefault();
            toggleMenu(e);
        }
    });

    document.addEventListener('click', function (e) {
        if (!nav.classList.contains('active')) return;
        const target = e.target;
        if (target.closest('.menu')) return;
        if (target.closest('.btn-mobile')) return;
        closeMenu();
    });

    document.addEventListener('keydown', function (e) {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMenu();
        }
    });

    window.addEventListener('resize', function () {
        if (window.innerWidth > 700 && nav.classList.contains('active')) {
            closeMenu();
        }
    });
})();
