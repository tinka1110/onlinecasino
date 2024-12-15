// Hämtar hamburger-ikonen och menyn // Hakee hampurilaisvalikon ja valikon linkit
const hamburgerMenu = document.getElementById('hamburger-menu');  // Hakee hampurilaisvalikon elementin // Hämtar hamburger-ikonen
const navLinks = document.getElementById('nav-links');  // Hakee valikon linkit // Hämtar meny-länkar
const navItems = document.querySelectorAll('.nav-links a');  // Hakee kaikki valikon linkit // Hämtar alla länkar i menyn


// Lägger till en eventlyssnare för hamburger-ikonen // Lisää tapahtumakuuntelija hampurilaisvalikkoon
hamburgerMenu.addEventListener('click', () => {
    // Växlar 'active' klassen som visar eller döljer menyn // Vaihdetaan 'active'-luokkaa, joka näyttää tai piilottaa valikon
    navLinks.classList.toggle('active');  // Vaihtaa 'active'-luokan päälle tai pois // Växlar mellan att visa och dölja menyn
});


// Lägger till eventlyssnare för alla menylänkar // Lisää tapahtumakuuntelija kaikille valikon linkeille
navItems.forEach(item => {
    item.addEventListener('click', function() {
        // Tar bort 'clicked' klassen från alla länkar // Poistaa 'clicked'-luokan kaikilta linkeiltä
        navItems.forEach(link => link.classList.remove('clicked'));  // Poistaa 'clicked'-luokan kaikista linkeistä // Tar bort 'clicked'-klassen från alla länkar


        // Lägger till 'clicked' klassen på den valda länken // Lisää 'clicked'-luokan valitulle linkille
        this.classList.add('clicked');  // Lisää 'clicked'-luokan valitulle linkille // Lägg till 'clicked'-klassen på den valda länken
    });
});
