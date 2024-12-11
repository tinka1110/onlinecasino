// Hämtar hamburger-ikonen och menyn
const hamburgerMenu = document.getElementById('hamburger-menu');
const navLinks = document.getElementById('nav-links');
const navItems = document.querySelectorAll('.nav-links a');


// Lägger till en eventlyssnare för hamburger-ikonen
hamburgerMenu.addEventListener('click', () => {
    // Växlar 'active' klassen som visar eller döljer menyn
    navLinks.classList.toggle('active');
});


// Lägger till eventlyssnare för alla menylänkar
navItems.forEach(item => {
    item.addEventListener('click', function() {
        // Tar bort 'clicked' klassen från alla länkar
        navItems.forEach(link => link.classList.remove('clicked'));


        // Lägger till 'clicked' klassen på den valda länken
        this.classList.add('clicked');
    });
});
