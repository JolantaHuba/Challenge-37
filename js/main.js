"use strict"
const nav = document.querySelector('.nav');
const burgerBtn = document.querySelector('.nav__burger');
const navList = document.querySelector('.nav__list');
const navOverlay = document.querySelector('.nav__overlay');

const toggleMenu = () => {
    burgerBtn.classList.toggle('active');
    navList.classList.toggle('active');
    navOverlay.classList.toggle('active');
}

// const hideMenu = () => {
//     burgerBtn.classList.remove('active');
//     navList.classList.remove('active');
//     navOverlay.classList.remove('active');
// }

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