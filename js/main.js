"use strict"

/* --------- Menu ---------- */
const nav = document.querySelector('.nav');
const burgerBtn = document.querySelector('.nav__burger');
const navList = document.querySelector('.nav__list');
const navOverlay = document.querySelector('.nav__overlay');
const navLinks = document.querySelectorAll('.nav__link');

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

const showCurrentSection = () => {
    const scrollPos = window.scrollY;

    navLinks.forEach(link => {
        let section = document.querySelector(link.hash);

        /* Scroll doesn't reach actual section after clicking it in nav. Move change point up (section.offsetTop - 10) */
        if (scrollPos < 100) {
            link.classList.remove('current');
        } else if (
            scrollPos >= section.offsetTop - 10 &&
            scrollPos < section.offsetTop + section.offsetHeight - 10
        ) {
            link.classList.add('current');
        } else {
            link.classList.remove('current');
        }

        /* If last section < 100vh */
        if (scrollPos >= document.body.clientHeight - window.innerHeight - 50) {
            navLinks[navLinks.length - 2].classList.remove('current');
            navLinks[navLinks.length - 1].classList.add('current');
        }
    });
}

burgerBtn.addEventListener('click', toggleMenu);
navOverlay.addEventListener('click', hideMenu);
navList.addEventListener('click', hideMenu);
document.addEventListener('scroll', scrollMenu);
window.addEventListener('scroll', showCurrentSection);

/* --------- Owl carousel ---------- */

const prevArrow = document.querySelector('.team__prev-arrow');
const nextArrow = document.querySelector('.team__next-arrow');
let carouselItems = document.querySelectorAll('.team__carousel-item');

const currView = {
    left: 0,
    middle: 1,
    right: 2,
}

function changeSlide() {

    isPrev(this) ? goPrevSlide() : goNextSlide();
    renderSlides();


    function isPrev(item) {
        return (
            item.classList.contains('item--left') ||
            item.classList.contains('team__prev-arrow')
        );
    }

    function goPrevSlide() {
        currView.right = currView.middle;
        currView.middle = currView.left;
        currView.left > 0 ?
            currView.left-- : currView.left = carouselItems.length - 1;
    }

    function goNextSlide() {
        currView.left = currView.middle;
        currView.middle = currView.right;
        currView.right < carouselItems.length - 1 ?
            currView.right++ : currView.right = 0;
    }

    function renderSlides() {
        carouselItems.forEach((item, index) => {
            switch (index) {
                case currView.left:
                    item.className = 'team__carousel-item item--left';
                    break;
                case currView.middle:
                    item.className = 'team__carousel-item item--middle';
                    break;
                case currView.right:
                    item.className = 'team__carousel-item item--right';
                    break;
                default:
                    item.className = 'team__carousel-item item--hidden';
            }
        });
    }
}

carouselItems.forEach(item => {
    item.addEventListener('click', changeSlide);
});
prevArrow.addEventListener('click', changeSlide);
nextArrow.addEventListener('click', changeSlide);

/* --------- Testimonials ---------- */

const thumbnails = document.querySelectorAll('.clients__img-wrapper');
const mainImg = document.querySelector('.clients__main-img');
const activeQuote = document.querySelector('.clients__quote');
let quotes = null;

function loadQuotes() {
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

function changeThumbnail(activeImage) {
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

function changeQuote() {
    const activeImage = this.firstElementChild;

    mainImg.classList.add('active');
    activeQuote.classList.add('active');

    loadQuotes();

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

    changeThumbnail(activeImage);
}

thumbnails.forEach(thumbnail => {
    thumbnail.addEventListener('click', changeQuote);
});