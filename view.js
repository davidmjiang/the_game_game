var view = {
  init: function(model_data){
    //set score
    $("#score").text("Score: " + model_data.score);
    //set cards left in deck
    $("#cards-left").text("Cards Left: " + model_data.deck_left);
    //set player hand
    this.showPlayerHand(model_data.hand);
  },

  showPlayerHand: function(cards){
    cards.forEach(function(card){
      var $newCard = $("<div></div>")
                      .text(card)
                      .addClass("player-card");
      $("#player-hand").append($newCard);
    });
  }
}