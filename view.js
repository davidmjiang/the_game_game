var cardListeners = {
  
  init: function(controller){
    this.controller = controller;
    $(".player-card").click(cardListeners.chooseCard);
    $(".check-pile").click(cardListeners.checkPile);
    $(".done-button").click(cardListeners.doneButton);
    $(".choose-pile").click(cardListeners.choosePile);
  }

  chooseCard: function(e){
    //make chosenCard, chosenPile, pileToCheck local and then pass them to the controller as arguments
    //choose pile listener should be in init, and then the model should decide whether or not it is allowed to be pressed
    var chosenCard = e.target.text;
    this.controller.storeCard(chosenCard);
  },

  choosePile: function(e){
    var chosenPile = $(e.target).attr("data-id");
    controller.checkMove(chosenPile);
  },

  checkPile: function(e){
    var pileToCheck = e.target.attr("data-id");
    controller.checkPile();
  },

  doneButton: function(e){
    controller.dealCards();
  }

}

var view = {
  //need to give view access to the controller
  init: function(controller, model_data){
    //set score
    $("#score").text("Score: " + model_data.score);
    //set cards left in deck
    $("#cards-left").text("Cards Left: " + model_data.deck_left);
    //set player hand
    this.showPlayerHand(model_data.hand);
    this.cardListener = cardListeners;
    this.cardListeners.init(this.controller);
  },

  showPlayerHand: function(cards, selected_card){
    cards.forEach(function(card){
      var $newCard = $("<div></div>")
                      .text(card)
                      .addClass("player-card");
      if(selected_card === card){
        $newCard.addClass("selected");
      }
      $("#player-hand").append($newCard);
    });
  },

  showError: function(){
    //need a separate error if they haven't even chosen a card
    alert("You can't place that card there!");
  },

  showPile: function(pile){
    var message = "Cards in this pile are: "
    pile.forEach(function(el){
      message += el.toString() + " ,"
    });
    alert(message);
  },

 clear: function(){
  //remove all player cards and all piles
  $("#player-hand").empty();
  $(".pile").empty();
 },

 render: function(model_data){
  this.showPlayerHand(model_data.hand, model_data.selected_card);
  //show top card of each pile
  var $newCard = $("<div></div>")
                      .text(model_data.down1)
                      .addClass("player-card");
  $(".going-down-1").append($newCard);
  var $newCard2 = $("<div></div>")
                      .text(model_data.down2)
                      .addClass("player-card");
  $(".going-down-2").append($newCard2);
  var $newCard3 = $("<div></div>")
                      .text(model_data.up1)
                      .addClass("player-card");
  $(".going-up-1").append($newCard3);
  var $newCard4 = $("<div></div>")
                      .text(model_data.up2)
                      .addClass("player-card");
  $(".going-up-2").append($newCard4);
  //show Done button if cardsToPlay is 0
  if(model_data.playedEnoughCards){
    $(".done-button").removeClass("hide");
   }
 }

}