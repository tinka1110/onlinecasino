function loggaAnvändarInfo() {
    // Plattform och webbläsarinfo
    const plattform = navigator.platform;
    const webbläsare = navigator.userAgent;
    const språk = navigator.language;
    const skärmupplösning = `${screen.width}x${screen.height}`;
    const fönsterstorlek = `${window.innerWidth}x${window.innerHeight}`;

    // Hämta eller initiera spelräknaren
    let spelRäknare = parseInt(localStorage.getItem("spelRäknare")) || 0;
    spelRäknare++;
    localStorage.setItem("spelRäknare", spelRäknare);

    // Logga information till konsolen
    console.log("Plattform:", plattform);
    console.log("Webbläsare:", webbläsare);
    console.log("Språk:", språk);
    console.log("Skärmupplösning:", skärmupplösning);
    console.log("Fönsterstorlek:", fönsterstorlek);
    console.log("Antal spel:", spelRäknare);

    // Hantera geolokalisering
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const lat = position.coords.latitude.toFixed(2);
                const lon = position.coords.longitude.toFixed(2);
                console.log("Platsinformation: Latitud:", lat, "Longitud:", lon);
            },
            (error) => {
                console.error("Platsinformation: Användaren nekade geolokalisering.");
            }
        );
    } else {
        console.error("Platsinformation: Geolokalisering stöds inte av denna webbläsare.");
    }
}

// Kör koden när DOM är laddad
document.addEventListener("DOMContentLoaded", loggaAnvändarInfo);
