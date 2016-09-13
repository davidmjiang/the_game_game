var model = {
  init: function(){
    this.setupCards();
    this.score = 0;
    this.hand = [];
    this.Max_Hand = 7
    this.dealCards();
    this.cardsToPlay = 2;
    this.setupPiles();
    this.currentCard = null;
  },

  setupCards: function(){
    this.deck = [];
    for(var i = 2; i <= 99; i++){
      this.deck.push(i);
    }
    this.shuffle(this.deck);
  },

  shuffle: function(arr){
    var j, x, i;
    for(i = arr.length; i; i--){
      j = Math.floor(Math.random()*i);
      x = arr[i-1];
      arr[i-1] = arr[j];
      arr[j] = x;
    }
  },

  dealCards: function(){
    //new round, so back to 2 cards to play
    this.cardsToPlay = 2;
    var cardsToDeal = this.Max_Hand - this.hand.length;
    while(this.hand.length < this.Max_Hand && this.deck.length > 0){
      var newCard = this.deck.pop();
      this.hand.push(newCard);
    }
    //sort cards
    this.hand.sort(function(a,b){
      return a-b;
    });
  },

  setupPiles: function(){
    this.up1 = [];
    this.up2 = [];
    this.down1 = [];
    this.down2 = [];
  },

  storeCard: function(chosenCard){
    //unclicking a card that is already chosen
    if(chosenCard === this.currentCard){
      this.currentCard = null;
    }
    //clicking a new card
    else{
      this.currentCard = chosenCard;
    }
  },

  checkLegalPlay: function(pile, card){
  //check if there is a currentcard
    if(!currentCard){
      return false;
    }
    var cardPile = PILE_TRANSLATER[pile];
    var topCard = cardPile[cardPile.length-1];
    //for going down piles, legal plays are < top card or top card +10
    if(pile === "going-down-1" || pile === "going-down-2"){
      return currentCard < topCard || currentcard === topCard + 10;
    }
    //for going up piles, legal plays are > top card or top card -10
    else{
      return currentcard > topCard || currentcard === topCard - 10;
    }
  },

  addCardToPile: function(pile){
    pile.push(this.curentCard);
    this.cardsToPlay --;
  },

  makeMove: function(chosenPile){
    this.addCardToPile(chosenPile);
    this.updatePlayerHand();
    
  },
//remove the played card from the player's hand
  updatePlayerHand: function(){
    for(var i = 0; i < this.hand.length; i++){
      if(this.hand[i] === this.currentCard){
        this.hand.splice(i,1);
      }
    }
  },

  PILE_TRANSLATER = {
    "going-down-1": this.down1,
    "going-down-2": this.down2,
    "going-up-1": this.up1,
    "going-up-2": this.up2
  },

  getPile: function(pile){
    return this.PILE_TRANSLATER[pile];
  },

  playedEnoughCards: function(){
    return this.cardsToPlay <= 0;
  },

  checkGameEnd: function(){
    //check if any cards in players hands would be legal plays in any of the decks
  }
}