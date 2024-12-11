document.addEventListener("DOMContentLoaded", () => {
    const cards = document.querySelectorAll('.card');
    let flippedCards = [];  // Håller reda på vända kort
    let lockBoard = false;  // Förhindrar kortvändning samtidigt

    // Funktion för att vända ett kort
    function flipCard() {
        if (lockBoard) return;  // Om spelbrädet är låst, vänd inga kort
        if (flippedCards.length === 2) return; // Om två kort redan är vända, gör inget

        this.classList.add('flipped');
        flippedCards.push(this);

        if (flippedCards.length === 2) {
            checkForMatch();
        }
    }

    // Funktion för att kontrollera om två kort matchar
    function checkForMatch() {
        const [card1, card2] = flippedCards;

        if (card1.dataset.card === card2.dataset.card) {
            resetBoard();
        } else {
            lockBoard = true;
            setTimeout(() => {
                card1.classList.remove('flipped');
                card2.classList.remove('flipped');
                resetBoard();
            }, 1000);
        }
    }

    // Funktion för att återställa kortens status
    function resetBoard() {
        flippedCards = [];
        lockBoard = false;
    }

    // Lägg till eventlyssnare för alla kort
    cards.forEach(card => card.addEventListener('click', flipCard));
});
