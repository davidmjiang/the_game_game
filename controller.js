var controller = {
  init: function(){
    this.model = model;
    this.view = view;
    this.model.init();
    var model_data = {
      score: this.model.score,
      hand: this.model.hand,
      deck_left: this.model.deck.length
    }
    this.view.init(model_data);
  }
}