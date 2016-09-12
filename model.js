var model = {
  init: function(){
    this.setupCards();
    this.score = 0;
    this.hand = [];
    this.Max_Hand = 7
    this.dealCards();
    this.cardsToPlay = 2;
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
    var cardsToDeal = this.Max_Hand - this.hand.length;
    while(this.hand.length < this.Max_Hand){
      var newCard = this.deck.pop();
      this.hand.push(newCard);
    }
    //sort cards
    this.hand.sort(function(a,b){
      return a-b;
    });
  },

  checkLegalPlay: function(){

  }
}