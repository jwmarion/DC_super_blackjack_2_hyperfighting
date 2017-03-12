$(document).ready(function () {

  function Card(point, suit){
    this.point = point;
    this.suit=suit;
  }
  Card.prototype.getImageUrl = function(){
    if(this.suit == 1 || this.suit > 10){
      if(this.suit == 11){
        this.suit = 'jack';
      }
      if(this.suit == 12){
        this.suit = 'queen';
      }
      if(this.suit == 13){
        this.suit = 'king';
      }
      if(this.suit == 1){
        this.suit = 'ace';
      }
    }
    return('cards/' + this.point +'_'+ this.suit+'.png');
  };

  function Monster(name){
    this.energy = 10;
    this.health = 16;
    this.name = name;
    // this.guard = false;
    // if (name === 'robot'){
    //   this.name = $('#robot');
    // }
    // else{
    //   this.name = $('#godzilla');
    // }

  }

  Monster.prototype.attack = function(player){
    if (this.energy >= 16){
      player.health -= 20;
    }
    else if (player.guard === true){
    player.health -= 2;

    }
    else{
      player.health -= 4;
    }
    disableButton('attack');
    disableButton('guard');
    this.energy -= 5;
    gTurn();
  };

  Monster.prototype.guard= function(){
    disableButton('attack');
    disableButton('guard');
    this.guard = true;
    gTurn();
  };



  function Hand(){
    this.cards = [];
  }

  Hand.prototype.addCard = function(card){
    this.cards.push(card);
  };

  Hand.prototype.getPoints = function(){
    var total =0;
    var ace = 0;
    this.cards.forEach(function(e){
      var x = e.point;
      if (e.point > 10 ) {
        x = 10;
      }
      else if (e.point === 1) {
        ace++;
        x = 11;
      }
      total += x;
    });
    for (var i = 0; i < ace; i++) {
      if (total > 21) {
        total -= 10;
      }
    }
    return total;
  };


  function Deck(){
    this.cards = [];

    for(var i = 1; i<=13; i++){
      this.cards.push(new Card(i,'diamonds'));
      this.cards.push(new Card(i,'hearts'));
      this.cards.push(new Card(i,'clubs'));
      this.cards.push(new Card(i,'spades'));
    }
  }

  Deck.prototype.draw = function(){
    var card = this.cards.pop();
    return card;
  };

  Deck.prototype.numCardsLeft=function(){
    return this.cards.length;
  };

  Deck.prototype.shuffle=function(){
    var currentIndex = this.cards.length,  temporaryValue, randomIndex;

    while (0 !== currentIndex) {

      // Pick a remaining element...
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;

      // And swap it with the current element.
      temporaryValue = this.cards[currentIndex];
      this.cards[currentIndex] = this.cards[randomIndex];
      this.cards[randomIndex] = temporaryValue;
    }
  };

  function deal(){
    console.log('test1');
    initialDeal();
    drawBoard(true);
    disableButton('deal');
    enableButton('hit');
    enableButton('stand');

  }

  function hit(){
    if (pHand.getPoints() < 21) {
      pHand.addCard(deck.draw());
      drawBoard(true);
      if (pHand.getPoints() > 21){
        stand();
      }
    }
  }

  function stand(){
    disableButton('hit');
    disableButton('stand');
    dealerTurn();
  }

  function gTurn(){

  }



  function drawBoard(dturn){
    $('#energy').text('Energy: ' + robot.energy);
    $('#dealer-hand').children().remove();
    $('#player-hand').children().remove();
    pHand.cards.forEach(function(e){
      $('#player-hand').append('<img class="card" src=' +e.getImageUrl()+'>');
    });

    dHand.cards.forEach(function(e,i){
      if (dturn === true && i === 0){
          $('#dealer-hand').append('<img class="card" src=./cards/back5.png>');
      }
      else{
        $('#dealer-hand').append('<img class="card" src=' +e.getImageUrl()+'>');

      }
    });

    $('#player-points').text(pHand.getPoints());
    if (dturn !== true){
      $('#dealer-points').text(dHand.getPoints());
    }
    else{
      $('#dealer-points').text("");
    }

    if(robot.energy >= 16){
      $('#attack-button').attr('src','./media/special.png');
    }
    else{
      $('#attack-button').attr('src','./media/attack.png');
    }

    $('.rHP').text('Robobobot  HP: '+ robot.health);
    $('.gHP').text('Non-copyright lizard man  HP: '+ liz.health);
  }

  function disableButton(button){
    if (button === 'deal'){
      $('#deal-button').css('opacity','0.3');
      $('#deal-button').css('pointerEvents','none');
    }
    else if (button === 'hit'){
      $('#hit-button').css('opacity','0.3');
      $('#hit-button').css('pointerEvents','none');
    }
    else if (button === 'stand'){
      $('#stand-button').css('opacity','0.3');
      $('#stand-button').css('pointerEvents','none');
    }
    else if (button === 'reset'){
      $('#reset-button').css('opacity','0.33');
      $('#reset-button').css('pointerEvents','none');
    }
    else if (button === 'attack'){
      $('#attack-button').css('opacity','0.3');
      $('#attack-button').css('pointerEvents','none');
    }
    else if (button === 'guard'){
      $('#guard-button').css('opacity','0.33');
      $('#guard-button').css('pointerEvents','none');
    }
  }
  function enableButton(button){
    if (button === 'deal'){
      $('#deal-button').css('opacity','1');
      $('#deal-button').css('pointerEvents','auto');
    }
    else if (button === 'hit'){
      $('#hit-button').css('opacity','1');
      $('#hit-button').css('pointerEvents','auto');
    }
    else if (button === 'stand'){
      $('#stand-button').css('opacity','1');
      $('#stand-button').css('pointerEvents','auto');
    }
    else if (button === 'reset'){
      $('#reset-button').css('opacity','1');
      $('#reset-button').css('pointerEvents','auto');
    }
    else if (button === 'attack'){
      $('#attack-button').css('opacity','1');
      $('#attack-button').css('pointerEvents','auto');
    }
    else if (button === 'guard'){
      $('#guard-button').css('opacity','1');
      $('#guard-button').css('pointerEvents','auto');
    }
  }

  function initialDeal(){
    deck.shuffle();
    pHand.addCard(deck.draw());
    dHand.addCard(deck.draw());
    pHand.addCard(deck.draw());
    dHand.addCard(deck.draw());


  }

  function winCheck(){
    if (pHand.getPoints() <= 21 && pHand.getPoints() > dHand.getPoints() || pHand.getPoints() <= 21 && dHand.getPoints() > 21) {
      $('#messages').text('You win!');
      robot.energy += 3;
      liz.energy -=1;

    }
    else if(pHand.getPoints() > 21 && dHand.getPoints() > 21 || pHand.getPoints() == dHand.getPoints()){
      $('#messages').text('DRAW!');
    }else{
        $('#messages').text('You Lose!');
        liz.energy += 3;
        robot.energy -= 1;
    }
      enableButton('reset');
      if (robot.energy >=4){
        if (robot.energy >=15){
          $('attack-button').attr('src','./media/special.png');
        }
        enableButton('attack');
      }
  }

  function reset(){
    deck = new Deck();
    dHand = new Hand();
    pHand = new Hand();
    $('#messages').text('BlackJack');
    //$('#attack-button').attr('src','./media/attack.png');


    enableButton('deal');
    disableButton('reset');
    disableButton('attack');
    disableButton('guard');
    drawBoard();
  }

  function dealerTurn(){
    while (dHand.getPoints() < 17 ) {
      dHand.addCard(deck.draw());
      drawBoard();
    }
    if (pHand.getPoints() < 21) {
      while(dHand.getPoints() < pHand.getPoints()) {
        dHand.addCard(deck.draw());
        drawBoard();
      }
    }
    winCheck();
    drawBoard();
  }


//listeners
  $('.buttons').on('click','#deal-button', function(e){
    deal();
  });

  $('.buttons').on('click','#hit-button', function(e){
    hit();
  });

  $('.buttons').on('click','#stand-button', function(e){
    stand();
  });

  $('.buttons').on('click','#reset-button', function(e){
    reset();
  });
  $('.buttons').on('click','#attack-button', function(e){
    if(robot.energy >= 5){
      robot.attack(liz);
      reset();
    }
  });
  $('.buttons').on('click','#guard-button', function(e){
    guard();
  });

  var deck = new Deck();
  var dHand = new Hand();
  var pHand = new Hand();
  var robot = new Monster('robot');
  var liz = new Monster('godzilla');

  disableButton('hit');
  disableButton('stand');
  disableButton('reset');
  disableButton('attack');
  disableButton('guard');

});
