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


    console.log(newCarousel);
}

carouselItems.forEach(item => {
    item.addEventListener('click', changeSlide);
});

prevArrow.addEventListener('click', changeSlide);
nextArrow.addEventListener('click', changeSlide);