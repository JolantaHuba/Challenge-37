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