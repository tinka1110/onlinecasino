// Välj alla miniatyrbilder
const thumbnails = document.querySelectorAll('.thumbnail img');
// Hämta lightbox och dess innehåll
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-btn');

// Lägg till en lyssnare för varje miniatyrbild
thumbnails.forEach(img => {
    img.addEventListener('click', (e) => {
        const largeImageUrl = e.target.getAttribute('data-full'); 
        lightboxImg.src = largeImageUrl; 
        lightbox.classList.add('show'); // Visa lightbox
    });
});

// Stäng lightbox när "X"-knappen klickas
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('show'); // Dölj lightbox
    lightboxImg.src = ''; // Töm lightbox-bilden
});

// Stäng lightbox när användaren klickar på bakgrunden
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) { 
        lightbox.classList.remove('show'); 
        lightboxImg.src = ''; 
    }
});

// Säkerställ att lightbox är dold när sidan laddas
window.addEventListener('load', () => {
    lightbox.classList.remove('show');
    lightboxImg.src = '';
});
