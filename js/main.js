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
    const activeMenuElements = document.querySelectorAll('.nav .active');
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


const navLinks = [...document.querySelectorAll('.nav__link')];


const showCurrentSection = () => {
    const scrollPos = window.scrollY;

    navLinks.forEach(link => {
        let section = document.querySelector(link.hash);

        /* Scroll doesn't reach actual section after clicking it in nav. Move change point upper (-10), section is reaching faster */
        if (scrollPos < 100) {
            link.classList.remove('current');
        } else if (scrollPos >= section.offsetTop - 10 && scrollPos < section.offsetTop + section.offsetHeight - 10) {
            link.classList.add('current');
        } else {
            link.classList.remove('current');
        }

        // If last section < 100vh
        if (scrollPos >= document.body.clientHeight - window.innerHeight - 50) {
            navLinks[navLinks.length - 2].classList.remove('current');
            navLinks[navLinks.length - 1].classList.add('current')
        }
    });
}

window.addEventListener('scroll', showCurrentSection)

//carousel

const prevArrow = document.querySelector('.team__prev-arrow');
const nextArrow = document.querySelector('.team__next-arrow');
let carouselItems = document.querySelectorAll('.team__carousel-item');

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

    newCarousel.forEach((item, index) => {
        if (index == 0) {
            item.className = 'team__carousel-item item--left';
        } else if (index == 1) {
            item.className = 'team__carousel-item item--middle';
        } else if (index == 2) {
            item.className = 'team__carousel-item item--right';
        } else {
            item.className = 'team__carousel-item item--hidden';
        }
    });

    carouselItems = newCarousel;
}

carouselItems.forEach(item => {
    item.addEventListener('click', changeSlide);
});
prevArrow.addEventListener('click', changeSlide);
nextArrow.addEventListener('click', changeSlide);

// testimonials

const thumbnails = document.querySelectorAll('.clients__img-wrapper');
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
        if (thumbnail.classList.contains('active')) {
            thumbnail.classList.remove('active');
            thumbnail.setAttribute('aria-pressed', 'false');
        }

        if (thumbnail.firstElementChild.dataset.author === activeImage.dataset.author) {
            thumbnail.classList.add('active');
            thumbnail.setAttribute('aria-pressed', 'true');
        }
    });
}

const changeQuote = function () {
    const activeImage = this.firstElementChild;

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