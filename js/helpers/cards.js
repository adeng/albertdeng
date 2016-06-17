// Libraries
var suits = ["Clubs", "Diamonds", "Hearts", "Spades"];
var suitIcons = ["♣", "♦", "♥", "♠"];
var rankIcons = ["A", "2", "3", "4", "5", "6", "7", "8", "9", "10", "J", "Q", "K"];
var ranks = ["Ace", "Two", "Three", "Four", "Five", "Six", "Seven", "Eight", "Nine", "Ten", "Jack", "Queen", "King"];

function Card(suit, rank) {
    this.suit = suit;
    this.rank = rank;
}

Card.prototype.faceUp = true;

Card.prototype.isFaceUp = function() {
    return this.faceUp;
}

Card.prototype.flip = function() {
    this.faceUp = !this.faceUp;
}

Card.prototype.getSuit = function() {
    return suits[this.suit];
}

Card.prototype.getRank = function() {
    return ranks[this.rank];
}

Card.prototype.getValue = function() {
    return this.rank;
}

Card.prototype.toString = function() {
    /* if(!this.faceUp)
        return "Face Down";
    return this.getRank() + " of " + this.getSuit(); */
    if(!this.faceUp)
        return "UNK";
    return rankIcons[this.rank] + suitIcons[this.suit];
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

Deck.prototype.getCard = function(index) {
    return index == undefined ? this.cards[0] : this.cards[index];
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

Deck.prototype.deal = function() {
    return this.cards.shift();
}

function Hand(player, cards) {
    this.player = player;
    this.cards = (cards != undefined ? [].concat(cards) : []);
}

Hand.prototype.getCards = function() {
    return this.cards;
}

Hand.prototype.toString = function() {
    for(var i = 0; i < this.cards.length; i++) {
        this.cards[i].toString();
    }
}

Hand.prototype.draw = function(deck, num) {
    for(var i = 0; i < num; i++) {
        var card = deck.deal();
        if(!this.player)
            card.flip();
        this.cards.push(card);
    }
}

Hand.prototype.reveal = function(num, index) {
    var start = index == undefined ? 0 : index;
    
    var end = this.cards.length;
    if(num > 0 && start + num < this.cards.length)
        end = start + num;

    if(num < 0) {
        for(var i = 0; i < this.cards.length; i++) {
            if(!this.cards[i].isFaceUp())
                this.cards[i].flip();
        }

        return;
    }

    for(var i = start; i < end; i++) {
        if(!this.cards[i].isFaceUp())
            this.cards[i].flip();
    }
}

function Player(rules) {
    this.hand = new Hand();
    this.score = 0;
    
    this.game = rules;    
}