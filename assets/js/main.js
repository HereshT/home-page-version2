 (function() {
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
         let selectEl = select(el, all)
         if (selectEl) {
             if (all) {
                 selectEl.forEach(e => e.addEventListener(type, listener))
             } else {
                 selectEl.addEventListener(type, listener)
             }
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
         let elementPos = select(el).offsetTop
         window.scrollTo({
             top: elementPos,
             behavior: 'smooth'
         })
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
     on('click', '.mobile-nav-toggle', function(e) {
         select('body').classList.toggle('mobile-nav-active')
         this.classList.toggle('bi-list')
         this.classList.toggle('bi-x')
     })

     /**
      * Scrool with ofset on links with a class name .scrollto
      */
     on('click', '.scrollto', function(e) {
         if (select(this.hash)) {
             e.preventDefault()

             let body = select('body')
             if (body.classList.contains('mobile-nav-active')) {
                 body.classList.remove('mobile-nav-active')
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
      * Hero type effect
      */
     const typed = select('.typed')
     if (typed) {
         let typed_strings = typed.getAttribute('data-typed-items')
         typed_strings = typed_strings.split(',')
         new Typed('.typed', {
             strings: typed_strings,
             loop: true,
             typeSpeed: 100,
             backSpeed: 50,
             backDelay: 2000
         });
     }

     /**
      * Skills animation
      */
     let skilsContent = select('.skills-content');
     if (skilsContent) {
         new Waypoint({
             element: skilsContent,
             offset: '80%',
             handler: function(direction) {
                 let progress = select('.progress .progress-bar', true);
                 progress.forEach((el) => {
                     el.style.width = el.getAttribute('aria-valuenow') + '%'
                 });
             }
         })
     }

     /**
      * Porfolio isotope and filter
      */
     window.addEventListener('load', () => {
         let portfolioContainer = select('.portfolio-container');
         if (portfolioContainer) {
             let portfolioIsotope = new Isotope(portfolioContainer, {
                 itemSelector: '.portfolio-item'
             });

             let portfolioFilters = select('#portfolio-flters li', true);

             on('click', '#portfolio-flters li', function(e) {
                 e.preventDefault();
                 portfolioFilters.forEach(function(el) {
                     el.classList.remove('filter-active');
                 });
                 this.classList.add('filter-active');

                 portfolioIsotope.arrange({
                     filter: this.getAttribute('data-filter')
                 });
                 portfolioIsotope.on('arrangeComplete', function() {
                     AOS.refresh()
                 });
             }, true);
         }

     });

     /**
      * Initiate portfolio lightbox 
      */
     const portfolioLightbox = GLightbox({
         selector: '.portfolio-lightbox'
     });

     /**
      * Portfolio details slider
      */
     new Swiper('.portfolio-details-slider', {
         speed: 400,
         loop: true,
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
      * Testimonials slider
      */
     new Swiper('.testimonials-slider', {
         speed: 600,
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
                 slidesPerView: 1,
                 spaceBetween: 20
             },

             1200: {
                 slidesPerView: 3,
                 spaceBetween: 20
             }
         }
     });

     /**
      * Animation on scroll
      */
     window.addEventListener('load', () => {
         AOS.init({
             duration: 1000,
             easing: 'ease-in-out',
             once: true,
             mirror: false
         })
     });

     /**
      * Initiate Pure Counter 
      */
     new PureCounter();

 })()
//   
 var Images_link;


 Images_link = ['https://www.celebritycruises.com/blog/content/uploads/2021/06/white-sand-beaches-tivua-island-fiji-1024x683.jpg', 'https://media.fshoq.com/images/117/beautiful-island-with-a-sandy-beach-and-boat-blue-water-117-medium.jpg', 'https://www.celebritycruises.com/blog/content/uploads/2021/06/white-sand-beaches-seven-mile-beach-grand-cayman-1024x683.jpg'];


 document.getElementById('next-image').addEventListener('click', (event) => {
     let element_frame = document.getElementById('frame');
     element_frame.replaceChildren();
     let new_img = document.createElement('img');
     new_img.setAttribute("src", Images_link[0]);

     element_frame.appendChild(new_img);
     Images_link.unshift(Images_link.pop());

 });

 document.getElementById('previous-image').addEventListener('click', (event) => {
     let element_frame2 = document.getElementById('frame');
     element_frame2.replaceChildren();
     let new_img2 = document.createElement('img');
     new_img2.setAttribute("src", Images_link.slice(-1)[0]);

     element_frame2.appendChild(new_img2);
     Images_link.unshift(Images_link.pop());

 });

 // Project: Select a random facilitator

 var names, item;

 function getNumberOrString(value) {
     // Convert a string value to a number if possible
     let number_value = Number(value);
     if (Number.isNaN(number_value)) {
         return value
     } else {
         return number_value
     }
 }


 names = [];


 document.getElementById('button').addEventListener('click', (event) => {
     names.push(getNumberOrString(document.getElementById('names').value));

 });

 document.getElementById('listof-names').addEventListener('click', (event) => {
     let element_list = document.getElementById('list');
     names.forEach((item) => {
         let new_li = document.createElement('li');
         new_li.innerText = item;

         element_list.appendChild(new_li);
     });

 });

 document.getElementById('select-facilitator').addEventListener('click', (event) => {
     let element_random_names = document.getElementById('random-names');
     let new_li2 = document.createElement('li');
     new_li2.innerText = names.reduce((a, b) => a + b, 0);

     element_random_names.appendChild(new_li2);

 });

 // Project: Select a random facilitator



 //

