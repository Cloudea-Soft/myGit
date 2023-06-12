//头部模块固定
(function fixHeader() {
    const header = document.querySelector('.header')
    const nav = document.querySelector('.nav')
    const main = document.querySelector('.main')
    window.addEventListener('scroll', function () {
        // 固定头部模块
        if (document.documentElement.scrollTop >= header.offsetTop + header.offsetHeight + 20) {
            nav.classList.add('nav-fix')
            main.classList.add('main-fix')
        } else {
            nav.classList.remove('nav-fix')
            main.classList.remove('main-fix')
        }
    })
})();