var cardListeners = {
  
  init: function(controller){
    this.controller = controller;
    $("#player-hand").on("click", ".player-card", cardListeners.chooseCard);
    //$(".check-pile").click(cardListeners.checkPile);
    $(".done-button").click(cardListeners.doneButton);
    $(".choose-pile").click(cardListeners.choosePile);
    $("#rules-btn").click(function(){
      $("#rules").slideDown();
      $("#close-rules").removeClass("hide");
      $("#rules-btn").addClass("hide");
    });
    $("#close-rules").click(function(){
      $("#rules").slideUp();
      $("#close-rules").addClass("hide");
      $("#rules-btn").removeClass("hide");
    });
    $("#reveal-piles").click(function(){
      $("#all-piles").removeClass("hide");
      $("#live-piles").addClass("hide");
      $("#reveal-piles").addClass("hide");
      $("#close-piles").removeClass("hide");
    });
    $("#close-piles").click(function(){
      $("#all-piles").addClass("hide");
      $("#live-piles").removeClass("hide");
      $("#reveal-piles").removeClass("hide");
      $("#close-piles").addClass("hide");
    })
  },

  chooseCard: function(e){
    //make chosenCard, chosenPile, pileToCheck local and then pass them to the controller as arguments
    //choose pile listener should be in init, and then the model should decide whether or not it is allowed to be pressed
    var chosenCard = e.target.innerHTML;
    cardListeners.controller.storeCard(chosenCard);
  },

  choosePile: function(e){
    var chosenPile = $(e.target).attr("data-id");
    cardListeners.controller.checkMove(chosenPile);
  },

  checkPile: function(e){
    var pileToCheck = $(e.target).attr("data-id");
    cardListeners.controller.checkPile(pileToCheck);
  },

  doneButton: function(e){
    cardListeners.controller.dealCards();
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
    this.cardListener.init(controller);
  },

  showPlayerHand: function(cards, selected_card){
    cards.forEach(function(card){
      var $newCard = $("<div></div>")
                      .text(card)
                      .addClass("player-card");
      if(parseInt(selected_card) === card){
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
    var message = "Cards in this pile are: " + "\n"
    pile.forEach(function(el){
      message += el.toString() + " "
    });
    alert(message);
  },

 clear: function(){
  //remove all player cards and all piles
  $("#player-hand").empty();
  $(".pile").empty();
 },

 listCards: function(cards){
  var message = "";
  cards.forEach(function(card, idx){
    if(idx === cards.length-1){
      message += card;
    }
    else{
      message += card + ", ";
    }
  });
  return message;
 },

 allPileView: function(model_data){
  $(".going-down-1-all").text(this.listCards(model_data.down1));
  $(".going-down-2-all").text(this.listCards(model_data.down2));
  $(".going-up-1-all").text(this.listCards(model_data.up1));
  $(".going-up-2-all").text(this.listCards(model_data.up2));
 },

 render: function(model_data){
  this.showPlayerHand(model_data.hand, model_data.selected_card);
  //show top card of each pile
  if(model_data.down1.length > 0){
    var $newCard = $("<div></div>")
                        .text(model_data.down1[model_data.down1.length-1])
                        .addClass("player-card");
    $(".going-down-1").append($newCard);
  }
  if(model_data.down2.length > 0){
    var $newCard2 = $("<div></div>")
                        .text(model_data.down2[model_data.down2.length-1])
                        .addClass("player-card");
    $(".going-down-2").append($newCard2);
  }
  if(model_data.up1.length > 0){
    var $newCard3 = $("<div></div>")
                        .text(model_data.up1[model_data.up1.length-1])
                        .addClass("player-card");
    $(".going-up-1").append($newCard3);
  }
  if(model_data.up2.length > 0){
    var $newCard4 = $("<div></div>")
                        .text(model_data.up2[model_data.up2.length-1])
                        .addClass("player-card");
    $(".going-up-2").append($newCard4);
  }
  //show cards left in deck
  $("#cards-left").text("Cards left: "+ model_data.deck_left);
  //show score
  $("#score").text("Score: " + model_data.score);
  //show Done button if cardsToPlay is 0
  if(model_data.playedEnoughCards){
    $(".done-button").removeClass("hide");
   }
  else{
    $(".done-button").addClass("hide");
  }
  //add to all-pile view
  this.allPileView(model_data);
  //alert if game over
  if(model_data.gameOver){
    setTimeout(function(){alert("Game Over!");},1000);
    $("#player-hand").off();
    $(".check-pile").off();
    $(".done-button").off();
    $(".choose-pile").off();
  }
 }

}