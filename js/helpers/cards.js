var suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
var ranks = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

function Card(suit, rank) {
    this.suit = suit;
    this.rank = rank;
}

Card.prototype.getSuit = function() {
    return suits[this.suit];
}

Card.prototype.getRank = function() {
    return ranks[this.rank];
}

Card.prototype.toString = function() {
    return this.getRank() + " of " + this.getSuit();
}

/**
 * Returns 0 if equal, otherwise 1 if greater and -1 if less than
 */
Card.prototype.compare = function(other) {
    if(this.rank == other.rank) {
        if(this.suit == other.suit) {
            return 0;
        }
        return (this.suit - other.suit)/Math.abs(this.suit - other.suit);
    }
    else if (this.rank == 0)
        return 1;
    else if (other.rank == 0)
        return -1;
    else
        return (this.rank - other.rank)/Math.abs(this.rank - other.rank);
}

function Deck() {
    this.cards = [];
    for(var i = 0; i < 4; i++) {
        for(var j = 0; j < 13; j++) {
            this.cards.push(new Card(i, j));
        }
    }
}

/**
 * Uses Fisher-Yates algorithm to do an in-place shuffle
 */
Deck.prototype.shuffle = function() {
    var m = this.cards.length, t, i;

    // While there remain elements to shuffle…
    while (m) {

        // Pick a remaining element…
        i = Math.floor(Math.random() * m--);

        // And swap it with the current element.
        t = this.cards[m];
        this.cards[m] = this.cards[i];
        this.cards[i] = t;
    }
}