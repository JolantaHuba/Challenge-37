"use strict"
//menu
const nav = document.querySelector('.nav');
const burgerBtn = document.querySelector('.nav__burger');
const navList = document.querySelector('.nav__list');
const navOverlay = document.querySelector('.nav__overlay');

const toggleMenu = () => {
    burgerBtn.classList.toggle('active');
    navList.classList.toggle('active');
    navOverlay.classList.toggle('active');
}

const hideMenu = () => {
    const activeMenuElements = document.querySelectorAll('nav .active');
    activeMenuElements.forEach(element => element.classList.remove('active'));
}

const scrollMenu = () => {
    if (window.scrollY > 50) {
        nav.classList.add('scrolled');
    } else nav.classList.remove('scrolled');
}

burgerBtn.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', hideMenu);
navList.addEventListener('click', hideMenu);
document.addEventListener('scroll', scrollMenu);

//current section in menu
const home = document.querySelector('.home')
const about = document.querySelector('.about');
const services = document.querySelector('.services');
const process = document.querySelector('.process');
const team = document.querySelector('.team');
const clients = document.querySelector('.clients');
const contact = document.querySelector('.contact');

const navLinks = document.querySelectorAll('.nav__link');

const showCurrentSection = () => {
    if (window.scrollY < 100) {
        navLinks.forEach(navLink => {
            navLink.classList.remove('current');
        });
    } else if (window.scrollY < home.offsetHeight) {
        navLinks.forEach(navLink => {
            if (navLink.dataset.name !== 'home') navLink.classList.remove('current');
        });
        document.querySelector('[data-link=home]').classList.add('current');
    } else if (window.scrollY < about.offsetTop + about.offsetHeight - 10) {
        navLinks.forEach(navLink => {
            if (navLink.dataset.name !== 'about') navLink.classList.remove('current');
        });
        document.querySelector('[data-link=about]').classList.add('current');
    } else if (window.scrollY < services.offsetTop + services.offsetHeight - 10) {
        navLinks.forEach(navLink => {
            if (navLink.dataset.name !== 'services') navLink.classList.remove('current');
        });
        document.querySelector('[data-link=services]').classList.add('current');
    } else if (window.scrollY < process.offsetTop + process.offsetHeight - 10) {
        navLinks.forEach(navLink => {
            if (navLink.dataset.name !== 'process') navLink.classList.remove('current');
        });
        document.querySelector('[data-link=process]').classList.add('current');
    } else if (window.scrollY < team.offsetTop + team.offsetHeight - 10) {
        navLinks.forEach(navLink => {
            if (navLink.dataset.name !== 'team') navLink.classList.remove('current');
        });
        document.querySelector('[data-link=team]').classList.add('current');
    } else if (window.scrollY < clients.offsetTop + clients.offsetHeight - 10) {
        navLinks.forEach(navLink => {
            if (navLink.dataset.name !== 'clients') navLink.classList.remove('current');
        });
        document.querySelector('[data-link=clients]').classList.add('current');
    }

    if (window.scrollY > document.body.clientHeight - window.innerHeight - 100) {
        navLinks.forEach(navLink => {
            if (navLink.dataset.name !== 'contact') navLink.classList.remove('current');
        });
        document.querySelector('[data-link=contact]').classList.add('current');
    }

}

window.addEventListener('scroll', showCurrentSection)

//carousel

const prevArrow = document.querySelector('.team__prev-arrow');
const nextArrow = document.querySelector('.team__next-arrow');
let carouselItems = [...document.querySelectorAll('.team__carousel-item')];


const changeSlide = function () {
    const newCarousel = [];

    if (this.classList.contains('item--left') || this.classList.contains('team__prev-arrow')) {
        for (let i = 0; i < carouselItems.length; i++) {
            if (i > 0) {
                newCarousel[i] = carouselItems[i - 1];
            } else newCarousel[i] = carouselItems[carouselItems.length - 1];
        }
    } else {
        for (let i = 0; i < carouselItems.length; i++) {
            if (i < carouselItems.length - 1) {
                newCarousel[i] = carouselItems[i + 1];
            } else newCarousel[i] = carouselItems[0];
        }
    }

    carouselItems = newCarousel;

    carouselItems.forEach((item, index) => {
        if (index == 0) {
            item.className = 'team__carousel-item item--left';
        } else if (index == 1) {
            item.className = 'team__carousel-item item--middle';
        } else if (index == 2) {
            item.className = 'team__carousel-item item--right';
        } else item.className = 'team__carousel-item item--hidden';
    });


    // console.log(newCarousel);
}

carouselItems.forEach(item => {
    item.addEventListener('click', changeSlide);
});

prevArrow.addEventListener('click', changeSlide);
nextArrow.addEventListener('click', changeSlide);

// testimonials

const quotes = [{
        imgSrc: 'images/person4.jpg',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas praesentium magnam assumenda quae ipsa illo hic, id sunt eveniet at accusamus rerum autem unde.',
        author: 'Jinny Snow, Company CEO',
    },
    {
        imgSrc: 'images/person3.jpg',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas praesentium magnam assumenda quae ipsa illo hic.',
        author: 'John Snow, Company CTO',
    },
    {
        imgSrc: 'images/person1.jpg',
        text: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quas praesentium magnam assumenda quae ipsa illo hic, id sunt eveniet at accusamus rerum autem unde. Quas praesentium magnam assumenda quae.',
        author: 'Jenny Smith, Company CEO',
    }
];

const thumbnails = document.querySelectorAll('.clients__img');
const mainImg = document.querySelector('.clients__main-img');
const activeQuote = document.querySelector('.clients__quote');

const changeQuote = function () {
    const activeImage = this;

    mainImg.classList.add('active');
    activeQuote.classList.add('active');

    setTimeout(() => {
        mainImg.src = activeImage.getAttribute('src');
        quotes.forEach(quote => {
            if (quote.imgSrc === activeImage.getAttribute('src')) {
                activeQuote.innerHTML = `${quote.text}
                <cite class="clients__quote-author">
                ${quote.author}
                </cite>`;
            }
        });
    }, 200);

    setTimeout(() => {
        mainImg.classList.remove('active');
        activeQuote.classList.remove('active');
    }, 400);


    // changeThumbnail
    thumbnails.forEach(thumbnail => {
        if (thumbnail.parentNode.classList.contains('active')) {
            thumbnail.parentNode.classList.remove('active');
        }

        if (thumbnail.getAttribute('src') === activeImage.getAttribute('src')) {
            thumbnail.parentNode.classList.add('active');
        }
    });
}

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', changeQuote);
});