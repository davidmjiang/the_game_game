var controller = {
  init: function(){
    this.model = model;
    this.view = view;
    this.model.init();
    this.view.init(controller, this.modelData());
  },

  modelData:function(){
    var model_data = {
      score: this.model.score,
      hand: this.model.hand,
      selected_card: this.model.currentCard,
      deck_left: this.model.deck.length,
      up1: this.model.up1,
      up2: this.model.up2,
      down1: this.model.down1,
      down2: this.model.down2,
      playedEnoughCards: this.model.playedEnoughCards(),
      gameOver: this.model.gameOver
    };
    return model_data;
  },

  storeCard: function(chosenCard){
    this.model.storeCard(chosenCard);
    this.view.clear();
    this.view.render(this.modelData());
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
    this.model.checkGameEnd();
    this.view.clear();
    this.view.render(this.modelData());
  },

  checkPile: function(pile){
    var cards = this.model.getPile(pile);
    this.view.showPile(cards);
  },

  dealCards: function(){
    this.model.dealCards();
    this.model.checkGameEnd();
    this.view.clear();
    this.view.render(this.modelData());
  }
}