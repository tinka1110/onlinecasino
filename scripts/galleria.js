// Välj alla miniatyrbilder
// Valitse kaikki pikkukuvat
const thumbnails = document.querySelectorAll('.thumbnail img');

// Hämta lightbox och dess innehåll
// Hae lightbox ja sen sisältö
const lightbox = document.getElementById('lightbox');
const lightboxImg = document.getElementById('lightbox-img');
const closeBtn = document.getElementById('close-btn');

// Lägg till en lyssnare för varje miniatyrbild
// Lisää kuuntelija jokaiselle pikkukuvalla
thumbnails.forEach(img => {
    img.addEventListener('click', (e) => {
        const largeImageUrl = e.target.getAttribute('data-full'); 
        lightboxImg.src = largeImageUrl; 
        lightbox.classList.add('show'); // Visa lightbox
        // Näytä lightbox
    });
});

// Stäng lightbox när "X"-knappen klickas
// Sulje lightbox, kun "X"-painiketta klikataan
closeBtn.addEventListener('click', () => {
    lightbox.classList.remove('show'); // Dölj lightbox
    // Piilota lightbox
    lightboxImg.src = ''; // Töm lightbox-bilden
    // Tyhjennä lightboxin kuva
});

// Stäng lightbox när användaren klickar på bakgrunden
// Sulje lightbox, kun käyttäjä klikkaa taustaa
lightbox.addEventListener('click', (e) => {
    if (e.target === lightbox) { 
        lightbox.classList.remove('show'); 
        lightboxImg.src = ''; 
    }
});

// Säkerställ att lightbox är dold när sidan laddas
// Varmista, että lightbox on piilotettu, kun sivu ladataan
window.addEventListener('load', () => {
    lightbox.classList.remove('show');
    lightboxImg.src = '';
});
