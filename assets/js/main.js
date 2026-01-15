/*===== MENU SHOW =====*/ 
const showMenu = (toggleId, navId) =>{
    const toggle = document.getElementById(toggleId),
    nav = document.getElementById(navId)

    if(toggle && nav){
        toggle.addEventListener('click', ()=>{
            nav.classList.toggle('show')
        })
    }
}
showMenu('nav-toggle','nav-menu')

/*==================== REMOVE MENU MOBILE ====================*/
const navLink = document.querySelectorAll('.nav__link')

function linkAction(){
    const navMenu = document.getElementById('nav-menu')
    // When we click on each nav__link, we remove the show-menu class
    navMenu.classList.remove('show')
}
navLink.forEach(n => n.addEventListener('click', linkAction))

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll('section[id]')

const scrollActive = () =>{
    const scrollDown = window.scrollY

  sections.forEach(current =>{
        const sectionHeight = current.offsetHeight,
              sectionTop = current.offsetTop - 58,
              sectionId = current.getAttribute('id'),
              sectionsClass = document.querySelector('.nav__menu a[href*=' + sectionId + ']')
        
        if(scrollDown > sectionTop && scrollDown <= sectionTop + sectionHeight){
            sectionsClass.classList.add('active-link')
        }else{
            sectionsClass.classList.remove('active-link')
        }                                                    
    })
}
window.addEventListener('scroll', scrollActive)

/*===== SCROLL REVEAL ANIMATION =====*/
const sr = ScrollReveal({
    origin: 'top',
    distance: '60px',
    duration: 2000,
    delay: 200,
//     reset: true
});

sr.reveal('.home__data, .about__img, .skills__subtitle, .skills__text',{}); 
sr.reveal('.home__img, .about__subtitle, .about__text, .skills__img',{delay: 400}); 
sr.reveal('.home__social-icon',{ interval: 200}); 
sr.reveal('.skills__data, .work__img, .contact__input',{interval: 200});

/*===== CONTACT FORM SUBMISSION TO GOOGLE SHEETS =====*/
const SHEET_URL = 'https://api.sheetbest.com/sheets/bbaa46d4-c233-4323-b794-894f707d5978'; // Paste your Sheet.best URL

const contactForm = document.getElementById('contact-form');
const formStatus = document.getElementById('form-status');

if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        const submitButton = contactForm.querySelector('input[type="submit"]');
        const originalText = submitButton.value;
        submitButton.value = 'Sending...';
        submitButton.disabled = true;
        
        const formData = new FormData(contactForm);
        const data = {
            Timestamp: new Date().toLocaleString(),
            Name: formData.get('name'),
            Email: formData.get('email'),
            Message: formData.get('message')
        };
        
        try {
            const response = await fetch(SHEET_URL, {
                method: 'POST',
                mode: 'cors',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data)
            });
            
            if (response.ok) {
                formStatus.style.display = 'block';
                formStatus.style.color = 'var(--first-color)';
                formStatus.textContent = 'Message sent successfully! Thank you for contacting me.';
                contactForm.reset();
            } else {
                throw new Error('Failed to send');
            }
        } catch (error) {
            formStatus.style.display = 'block';
            formStatus.style.color = '#ff0000';
            formStatus.textContent = 'Oops! Something went wrong. Please try again or email directly.';
            console.error('Error:', error);
        } finally {
            submitButton.value = originalText;
            submitButton.disabled = false;
            setTimeout(() => {
                formStatus.style.display = 'none';
            }, 5000);
        }
    });
}
