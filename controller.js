var controller = {
  init: function(){
    this.model = model;
    this.view = view;
    this.model.init();
    var model_data = {
      score: this.model.score,
      hand: this.model.hand,
      selected_card: this.model.currentCard,
      deck_left: this.model.deck.length,
      up1: this.model.up1[this.model.up1.length-1],
      up2: this.model.up2[this.model.up2.length-1],
      down1: this.model.down1[this.model.down1.length-1],
      down2: this.model.down2[this.model.down2.length-1],
      playedEnoughCards: this.model.playedEnoughCards
    }
    this.view.init(controller, model_data);
  },

  storeCard: function(chosenCard){
    this.model.storeCard(chosenCard);
    var model_data = {
      score: this.model.score,
      hand: this.model.hand,
      selected_card: this.model.currentCard,
      deck_left: this.model.deck.length,
      up1: this.model.up1[this.model.up1.length-1],
      up2: this.model.up2[this.model.up2.length-1],
      down1: this.model.down1[this.model.down1.length-1],
      down2: this.model.down2[this.model.down2.length-1],
      playedEnoughCards: this.model.playedEnoughCards
    };
    this.view.clear();
    this.view.render(model_data);
  },

  checkMove: function(chosenPile){
   if(this.model.checkLegalPlay(chosenPile)){
      this.makeMove(chosenPile);
    }
    else{
      this.view.showError();
    }
  },

  makeMove: function(chosenPile){
    this.model.makeMove(chosenPile);
    var model_data = {
      score: this.model.score,
      hand: this.model.hand,
      selected_card: this.model.currentCard,
      deck_left: this.model.deck.length,
      up1: this.model.up1[this.model.up1.length-1],
      up2: this.model.up2[this.model.up2.length-1],
      down1: this.model.down1[this.model.down1.length-1],
      down2: this.model.down2[this.model.down2.length-1],
      playedEnoughCards: this.model.playedEnoughCards
    };
    this.view.clear();
    this.view.render(model_data);
  },

  checkPile: function(pile){
    var cards = this.model.getPile(pile);
    this.view.showPile(cards);
  },

  dealCards: function(){
    this.model.dealCards();
  }
}