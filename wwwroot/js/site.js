// Please see documentation at https://docs.microsoft.com/aspnet/core/client-side/bundling-and-minification
// for details on configuring this project to bundle and minify static web assets.

// Write your JavaScript code.

//头部模块固定
(function fixHeader() {
    const header = document.querySelector('.header')
    const nav = document.querySelector('.nav')
    window.addEventListener('scroll', function () {
        // 固定头部模块
        if (document.documentElement.scrollTop >= header.offsetTop + header.offsetHeight + 20) {
            nav.classList.add('nav-fix')
            header.classList.add('header-fix')
        } else {
            nav.classList.remove('nav-fix')
            header.classList.remove('header-fix')
        }
    })
})();