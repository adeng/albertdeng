// Blackjack
function Blackjack() {
    this.deck = new Deck();
    this.deck.shuffle();
    
    
}

function BlackjackDealer() {
    this.dealer = new Player();
}