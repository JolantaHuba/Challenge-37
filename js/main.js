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
const home = document.querySelector('.home');
const about = document.querySelector('.about');
const services = document.querySelector('.services');
const process = document.querySelector('.process');
const team = document.querySelector('.team');
const clients = document.querySelector('.clients');
const contact = document.querySelector('.contact');
const navLinks = document.querySelectorAll('.nav__link');


const showCurrentSection = () => {
    const scrollPos = window.scrollY;

    if (scrollPos < 100) {
        navLinks.forEach(navLink => {
            navLink.classList.remove('current');
        });
    } else if (scrollPos < home.offsetHeight) {
        navLinks.forEach(navLink => {
            if (navLink.dataset.name !== 'home') navLink.classList.remove('current');
        });
        document.querySelector('[data-link=home]').classList.add('current');
    } else if (scrollPos < about.offsetTop + about.offsetHeight - 10) {
        navLinks.forEach(navLink => {
            if (navLink.dataset.name !== 'about') navLink.classList.remove('current');
        });
        document.querySelector('[data-link=about]').classList.add('current');
    } else if (scrollPos < services.offsetTop + services.offsetHeight - 10) {
        navLinks.forEach(navLink => {
            if (navLink.dataset.name !== 'services') navLink.classList.remove('current');
        });
        document.querySelector('[data-link=services]').classList.add('current');
    } else if (scrollPos < process.offsetTop + process.offsetHeight - 10) {
        navLinks.forEach(navLink => {
            if (navLink.dataset.name !== 'process') navLink.classList.remove('current');
        });
        document.querySelector('[data-link=process]').classList.add('current');
    } else if (scrollPos < team.offsetTop + team.offsetHeight - 10) {
        navLinks.forEach(navLink => {
            if (navLink.dataset.name !== 'team') navLink.classList.remove('current');
        });
        document.querySelector('[data-link=team]').classList.add('current');
    } else if (scrollPos < clients.offsetTop + clients.offsetHeight - 10) {
        navLinks.forEach(navLink => {
            if (navLink.dataset.name !== 'clients') navLink.classList.remove('current');
        });
        document.querySelector('[data-link=clients]').classList.add('current');
    }

    if (scrollPos > document.body.clientHeight - window.innerHeight - 100) {
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
}

carouselItems.forEach(item => {
    item.addEventListener('click', changeSlide);
});
prevArrow.addEventListener('click', changeSlide);
nextArrow.addEventListener('click', changeSlide);

// testimonials

const thumbnails = document.querySelectorAll('.clients__small-img');
const mainImg = document.querySelector('.clients__main-img');
const activeQuote = document.querySelector('.clients__quote');
let quotes = null; // loaded from testimonials.json using ajax

const loadTestimonials = () => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', 'js/testimonials.json', true);
    xhr.onload = () => {
        if (xhr.status == 200) {
            const data = JSON.parse(xhr.responseText);
            return quotes = data;
        }
    }
    xhr.send();
}

const changeThumbnail = (activeImage) => {
    thumbnails.forEach(thumbnail => {
        if (thumbnail.parentNode.classList.contains('active')) {
            thumbnail.parentNode.classList.remove('active');
        }

        if (thumbnail.dataset.author === activeImage.dataset.author) {
            thumbnail.parentNode.classList.add('active');
        }
    });
}

const changeQuote = function () {
    const activeImage = this;

    mainImg.classList.add('active');
    activeQuote.classList.add('active');

    // Load quotes from JSON file
    loadTestimonials();

    setTimeout(() => {
        quotes.forEach(quote => {
            if (activeImage.dataset.author === quote.author) {
                mainImg.src = quote.imgSrc;
                activeQuote.innerHTML = `${quote.text}
                <cite class="clients__quote-author">
                ${quote.author}, ${quote.author_job}
                </cite>`;
            }
        });
    }, 200);

    setTimeout(() => {
        mainImg.classList.remove('active');
        activeQuote.classList.remove('active');
    }, 400);

    // changeThumbnail
    changeThumbnail(activeImage);
}


thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', changeQuote);
});