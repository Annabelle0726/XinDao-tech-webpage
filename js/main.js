(function () {
    "use strict";

    /**
     * Easy selector helper function
     */
    const select = (el, all = false) => {
        el = el.trim()
        if (all) {
            return [...document.querySelectorAll(el)]
        } else {
            return document.querySelector(el)
        }
    }

    /**
     * Easy event listener function
     */
    const on = (type, el, listener, all = false) => {
        if (all) {
            select(el, all).forEach(e => e.addEventListener(type, listener))
        } else {
            select(el, all).addEventListener(type, listener)
        }
    }

    /**
     * Easy on scroll event listener
     */
    const onscroll = (el, listener) => {
        el.addEventListener('scroll', listener)
    }

    /**
     * Navbar links active state on scroll
     */
    let navbarlinks = select('#navbar .scrollto', true)
    const navbarlinksActive = () => {
        let position = window.scrollY + 200
        navbarlinks.forEach(navbarlink => {
            if (!navbarlink.hash) return
            let section = select(navbarlink.hash)
            if (!section) return
            if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
                navbarlink.classList.add('active')
            } else {
                navbarlink.classList.remove('active')
            }
        })
    }
    window.addEventListener('load', navbarlinksActive)
    onscroll(document, navbarlinksActive)

    /**
     * Scrolls to an element with header offset
     */
    const scrollto = (el) => {
        let header = select('#header')
        let offset = header.offsetHeight

        if (!header.classList.contains('header-scrolled')) {
            offset -= 10
        }

        let elementPos = select(el).offsetTop
        window.scrollTo({
            top: elementPos - offset,
            behavior: 'smooth'
        })
    }

    /**
     * Toggle .header-scrolled class to #header when page is scrolled
     */
    let selectHeader = select('#header')
    if (selectHeader) {
        const headerScrolled = () => {
            if (window.scrollY > 100) {
                selectHeader.classList.add('header-scrolled')
            } else {
                selectHeader.classList.remove('header-scrolled')
            }
        }
        window.addEventListener('load', headerScrolled)
        onscroll(document, headerScrolled)
    }

    /**
     * Back to top button
     */
    let backtotop = select('.back-to-top')
    if (backtotop) {
        const toggleBacktotop = () => {
            if (window.scrollY > 100) {
                backtotop.classList.add('active')
            } else {
                backtotop.classList.remove('active')
            }
        }
        window.addEventListener('load', toggleBacktotop)
        onscroll(document, toggleBacktotop)
    }

    /**
     * Mobile nav toggle
     */
    on('click', '.mobile-nav-toggle', function (e) {
        select('#navbar').classList.toggle('navbar-mobile')
        this.classList.toggle('bi-list')
        this.classList.toggle('bi-x')
    })

    /**
     * Mobile nav dropdowns activate
     */
    on('click', '.navbar .dropdown > a', function (e) {
        if (select('#navbar').classList.contains('navbar-mobile')) {
            e.preventDefault()
            this.nextElementSibling.classList.toggle('dropdown-active')
        }
    }, true)

    /**
     * Scrool with ofset on links with a class name .scrollto
     */
    on('click', '.scrollto', function (e) {
        if (select(this.hash)) {
            e.preventDefault()

            let navbar = select('#navbar')
            if (navbar.classList.contains('navbar-mobile')) {
                navbar.classList.remove('navbar-mobile')
                let navbarToggle = select('.mobile-nav-toggle')
                navbarToggle.classList.toggle('bi-list')
                navbarToggle.classList.toggle('bi-x')
            }
            scrollto(this.hash)
        }
    }, true)

    /**
     * Scroll with ofset on page load with hash links in the url
     */
    window.addEventListener('load', () => {
        if (window.location.hash) {
            if (select(window.location.hash)) {
                scrollto(window.location.hash)
            }
        }
    });

    /**
     * Clients Slider
     */
    new Swiper('.clients-slider', {
        speed: 400,
        loop: true,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        slidesPerView: 'auto',
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        },
        breakpoints: {
            320: {
                slidesPerView: 2,
                spaceBetween: 40
            },
            480: {
                slidesPerView: 3,
                spaceBetween: 60
            },
            640: {
                slidesPerView: 4,
                spaceBetween: 80
            },
            992: {
                slidesPerView: 6,
                spaceBetween: 120
            }
        }
    });


    new Swiper('.portfolio-details-slider', {
        speed: 400,
        autoplay: {
            delay: 5000,
            disableOnInteraction: false
        },
        pagination: {
            el: '.swiper-pagination',
            type: 'bullets',
            clickable: true
        }
    });


    /**
     * Animation on scroll
     */
    function aos_init() {
        AOS.init({
            duration: 1000,
            easing: "ease-in-out",
            once: true,
            mirror: false
        });
    }

    window.addEventListener('load', () => {
        aos_init();
    });

})();

// NavBar
window.addEventListener('DOMContentLoaded', function() {
    const header = document.getElementById('header');
    const megamenuPanel = document.getElementById('megamenuPanel');
    const productCenterDropdown = document.getElementById('productCenterDropdown');
    const mobileToggle = document.querySelector('.mobile-nav-toggle');
    const mobileNav = document.querySelector('.navbar-mobile');
    const toggleTransparentBtn = document.getElementById('toggleTransparent');
    const simulateScrollBtn = document.getElementById('simulateScroll');

    let isTransparent = false;
    let isScrolled = false;

    // 桌面端菜单交互
    if (productCenterDropdown) {
        productCenterDropdown.addEventListener('mouseenter', function() {
            megamenuPanel.style.display = 'block';
        });

        productCenterDropdown.addEventListener('mouseleave', function() {
            setTimeout(function() {
                if (!megamenuPanel.matches(':hover')) {
                    megamenuPanel.style.display = 'none';
                }
            }, 200);
        });

        megamenuPanel.addEventListener('mouseleave', function() {
            megamenuPanel.style.display = 'none';
        });
    }

// 移动端菜单切换
    if (mobileToggle) {
        mobileToggle.addEventListener('click', function() {
            this.classList.toggle('bi-x');
            document.body.classList.toggle('mobile-nav-active');

            // 使用更可靠的方式检查移动菜单是否存在
            const mobileMenuUl = mobileNav.querySelector('ul') || document.createElement('ul');

            // 只在需要时构建菜单
            if (mobileMenuUl.children.length === 0) {
                // 从桌面菜单克隆内容
                const mainNavUl = document.querySelector('.navbar ul');
                if (mainNavUl) {
                    const mainNavClone = mainNavUl.cloneNode(true);

                    // 特殊处理产品中心菜单
                    const productCenterItem = mainNavClone.querySelector('#productCenterDropdown');
                    if (productCenterItem) {
                        const productCenterCloned = productCenterItem.cloneNode(false);

                        // 添加回产品中心菜单项
                        const clonedLink = productCenterItem.querySelector('a').cloneNode(true);
                        productCenterCloned.appendChild(clonedLink);

                        // 添加产品中心的下拉菜单
                        const dropdownContainer = document.createElement('div');
                        dropdownContainer.className = 'dropdown-menu';

                        // 获取所有产品项
                        const products = document.querySelectorAll('#megamenuPanel .col');
                        const productsList = document.createElement('ul');

                        products.forEach(item => {
                            const li = document.createElement('li');
                            const a = item.querySelector('a').cloneNode(true);
                            li.appendChild(a);
                            productsList.appendChild(li);
                        });

                        dropdownContainer.appendChild(productsList);
                        productCenterCloned.appendChild(dropdownContainer);
                        productCenterCloned.classList.add('dropdown');

                        // 替换原来的产品中心项
                        mainNavClone.replaceChild(productCenterCloned, productCenterItem);
                    }

                    // 添加到移动菜单
                    mobileMenuUl.innerHTML = mainNavClone.innerHTML;

                    // 确保有容器
                    if (!mobileMenuUl.parentNode) {
                        mobileNav.appendChild(mobileMenuUl);
                    }
                }
            }

            // 显示移动菜单
            mobileNav.style.display = 'block';
        });
    }
    // 移动端二级菜单切换
    document.addEventListener('click', function(e) {
        if (document.body.classList.contains('mobile-nav-active')) {
            if (e.target.closest('.dropdown > a')) {
                const dropdown = e.target.closest('.dropdown');
                dropdown.classList.toggle('dropdown-active');
            }
        }
    });

    // 透明模式切换
    if (toggleTransparentBtn) {
        toggleTransparentBtn.addEventListener('click', function() {
            isTransparent = !isTransparent;
            header.classList.toggle('transparent', isTransparent);

            if (isTransparent) {
                header.classList.remove('scrolled');
            }
        });
    }

    // 模拟滚动效果
    if (simulateScrollBtn) {
        simulateScrollBtn.addEventListener('click', function() {
            isScrolled = !isScrolled;
            header.classList.toggle('scrolled', isScrolled);
            header.classList.remove('transparent');
            isTransparent = false;
        });
    }

    // 实际滚动效果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 100) {
            header.classList.add('scrolled');
            isScrolled = true;

            if (isTransparent) {
                header.classList.remove('transparent');
                isTransparent = false;
            }
        } else {
            header.classList.remove('scrolled');
            isScrolled = false;
        }
    });
});



// ====================================

// 锚点

document.querySelectorAll('a.scrollto[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetID = this.getAttribute('href').substring(1);
        const targetEl = document.getElementById(targetID);

        if (targetEl) {
            const headerOffset = document.querySelector('#header')?.offsetHeight || 80;
            const elementPosition = targetEl.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.scrollY - headerOffset;

            window.scrollTo({
                top: offsetPosition,
                behavior: 'smooth'
            });
        }
    });
});



