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

//轮播图脚本
(function carouselSlide() {
    // 图片信息
    const imgData = [
        { url: 'images/carousel-slide0.jpg', title: '111', color: 'rgba(100,67,68,0.9)', source: 'https://www.pixiv.net/artwork/' },
        { url: 'images/carousel-slide1.jpg', title: '222', color: 'rgba(102,67,68,0.9)', source: 'https://www.pixiv.net/artwork/' },
        { url: 'images/carousel-slide2.jpg', title: '333', color: 'rgba(100,57,56,0.9)', source: 'https://www.pixiv.net/artwork/' },
        { url: 'images/carousel-slide3.jpg', title: '444', color: 'rgba(100,67,74,0.9)', source: 'https://www.pixiv.net/artwork/' },
        { url: 'images/carousel-slide4.jpg', title: '555', color: 'rgba(100,42,68,0.9)', source: 'https://www.pixiv.net/artwork/' },
        { url: 'images/carousel-slide5.jpg', title: '666', color: 'rgba(190,67,68,0.9)', source: 'https://www.pixiv.net/artwork/' },
        { url: 'images/carousel-slide6.jpg', title: '777', color: 'rgba(100,21,68,0.9)', source: 'https://www.pixiv.net/artwork/' }
    ]

    // 获取初始渲染所需Dom节点
    const slider = document.querySelector('.carousel-slide') // 外容器
    const wrapper = document.getElementsByClassName('carousel-slide-wrapper')[0] //轮播图容器
    const radius = document.getElementsByClassName('carousel-slide-indicator')[0] //圆点容器 

    // 0.1 动态添加图片
    wrapper.style.width = imgData.length * 100 + '%'
    for (let i = 0; i < imgData.length; i++) {
        let li = document.createElement("li")
        let img = document.createElement("img")
        img.src = imgData[i].url
        wrapper.appendChild(li)
        wrapper.children[i].appendChild(img)
    }

    // 0.2 动态添加圆点
    for (let i = 0; i < imgData.length; i++) {
        let li = document.createElement("li")
        radius.appendChild(li)
    }
    radius.children[0].classList.add('radius-active')
    radius.children[0].classList.add('radiusAnimation')

    // 获取剩余Dom节点
    const prev = document.querySelector('.prev') // 左按钮
    const next = document.querySelector('.next') // 右按钮
    const mask = document.querySelector('.carousel-slide-mask') // 遮罩层
    const imgLink = document.querySelector('.carousel-slide-mask-link') //遮罩层链接
    const p = document.querySelector('.carousel-slide-footer-title') // 下栏标题
    let imgWidth = wrapper.children[0].offsetWidth //图片宽度
    let wrapIndex = 0 // 播放总指针  

    // 1. 渲染
    function toggle() {
        // 计算移动后位置并输出
        let target = wrapIndex * imgWidth
        // 渲染对应数据
        // wrapper.style.left = -target + 'px' // 设置left以移动
        wrapper.style.transform = 'translate(-' + target + 'px)' // 设置transform以移动
        p.innerHTML = imgData[wrapIndex].title // 下栏标题
        mask.style.backgroundColor = imgData[wrapIndex].color // 下栏颜色
        imgLink.href = imgData[wrapIndex].source
    }
    toggle()
    function radiusAction(e) {
        // 移除类名
        for (var i = 0; i < radius.children.length; i++)  radius.children[i].className = "";
        // 添加radius-active圆点
        document.querySelector(`.carousel-slide-indicator li:nth-child(${wrapIndex + 1})`).classList.add('radius-active')
        // 添加radiusAnimation圆点
        if (e > 0 && e < imgData.length - 1 || e <= -imgData.length + 1) document.querySelector(`.carousel-slide-indicator li:nth-child(${wrapIndex + 1})`).classList.add('radiusAnimation')
        else if (e < 0 && e > -imgData.length + 1 || e >= imgData - 1) document.querySelector(`.carousel-slide-indicator li:nth-child(${wrapIndex + 1})`).classList.add('radiusAnimation2')
        else return
    }

    // 2. 按钮业务
    next.addEventListener('click', function () {
        // 使i从0-6循环
        wrapIndex = (wrapIndex + 1) % imgData.length
        toggle();
        radiusAction(1)
    })
    prev.addEventListener('click', function () {
        wrapIndex = (wrapIndex + imgData.length - 1) % imgData.length
        toggle();
        radiusAction(-1)
    })

    // 3. 圆点控制业务
    for (let i = 0; i < radius.children.length; i++) {
        radius.children[i].addEventListener('click', function () {
            var delta = i - wrapIndex
            wrapIndex = i
            toggle()
            radiusAction(delta)
        })
    }

    // 4. 自动播放
    let timerId = setInterval(function () {
        next.click()
    }, 2000)

    // 5. 控制鼠标悬停时暂停-开关定时器
    slider.addEventListener('mouseenter', function () {
        clearInterval(timerId)
    })
    slider.addEventListener('mouseleave', function () {
        clearInterval(timerId)
        timerId = setInterval(function () {
            next.click()
        }, 2000)
    })
})()