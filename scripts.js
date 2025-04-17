const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const navLinks = document.querySelectorAll('nav ul li a');
const header = document.querySelector('header');
const contactForm = document.querySelector('.contact-form');
const backToTop = document.querySelector('.back-to-top');
const sections = document.querySelectorAll('section');

menuToggle.addEventListener('click', () => {
    nav.classList.toggle('active');
    menuToggle.classList.toggle('fa-times');
    menuToggle.classList.toggle('fa-bars');
});

navLinks.forEach(link => {
    link.addEventListener('click', () => {
        nav.classList.remove('active');
        menuToggle.classList.remove('fa-times');
        menuToggle.classList.add('fa-bars');
    });
});

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            const headerHeight = header.offsetHeight;
            const targetPosition = targetElement.offsetTop - headerHeight;
            
            window.scrollTo({
                top: targetPosition,
                behavior: 'smooth'
            });
        }
    });
});

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
    
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - header.offsetHeight - 100;
        const sectionHeight = section.offsetHeight;
        
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        alert('Thank you for your message! I will get back to you soon.');
        
        contactForm.reset();
    });
}

class TypeWriter {
    constructor(txtElement, words, wait = 3000) {
        this.txtElement = txtElement;
        this.words = words;
        this.txt = '';
        this.wordIndex = 0;
        this.wait = parseInt(wait, 10);
        this.type();
        this.isDeleting = false;
    }
    
    type() {
        
        const current = this.wordIndex % this.words.length;
        
        const fullTxt = this.words[current];
        

        if(this.isDeleting) {
            
            this.txt = fullTxt.substring(0, this.txt.length - 1);
        } else {
            
            this.txt = fullTxt.substring(0, this.txt.length + 1);
        }
        
        
        this.txtElement.innerHTML = this.txt;
        
        
        let typeSpeed = 100;
        
        if(this.isDeleting) {
            typeSpeed /= 2;
        }
        
        if(!this.isDeleting && this.txt === fullTxt) {
            typeSpeed = this.wait;
            this.isDeleting = true;
        } else if(this.isDeleting && this.txt === '') {
            this.isDeleting = false;
            this.wordIndex++;
          typeSpeed = 500;
        }
        
        setTimeout(() => this.type(), typeSpeed);
    }
}

document.addEventListener('DOMContentLoaded', init);
function init() {
    const txtElement = document.getElementById('typed');
    const words = ['Web Developer', 'Designer', 'Freelancer', 'Creator'];
    const wait = 2000;
    new TypeWriter(txtElement, words, wait);
    
    const animateElements = document.querySelectorAll('.glass-card, .skill-item');
    
    function checkScroll() {
        animateElements.forEach(el => {
            const rect = el.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            
            if (rect.top <= windowHeight * 0.8) {
                el.classList.add('visible');
            }
        });
    }
    
    checkScroll();
    
    window.addEventListener('scroll', checkScroll);
}