$(document).ready(function(){

  /*
  =============================
  CLICK EVENT HANDLERS
  =============================
  */
  $('#btnDeal').show(); // show it
  $('#btnDeal').click(function(){
    // alert('deal click handler');
    deal();
    $(this).hide(); // hide btnDeal
    $('#btnHit').show(); // show it
    $('#btnStick').show();
  });
  $('#btnHit').click(function(){
    hit();
  });
  $('#btnStick').click(function(){
    $('#hdrResult').html('GAME OVER.');

    var score = calculateScore();
    $('#pointHistory').append(' ' + score + '.');

    var average = calculateAverage();
    $('#displayAverage').text(average);

    $('#btnHit').hide(); // hide
    $('#btnRestart').show(); // show
    $(this).hide();
  });
  // restart button should toggle elements
  // and empty or reset elements and variables, then deal.
  $('#btnRestart').click(function(){
    // alert('restart click handler');
    $('#result').toggle(); // end x or check?
    $(this).hide(); // turn off restart button
    $('#my_hand').empty();
    used_cards.length = 0;
    hand.cards.length = 0;
    hand.current_total = 0;
    $('#hdrResult').html('');
    $('#btnHit').hide(); // hide it
    $('#btnDeal').show()
                 .trigger('click');
  });
});

/*
=============================
CARD CONSTRUCTOR & INSTANCES
=============================
*/
function card(name, suit, value){
  this.name = name;
  this.suit = suit;
  this.value = value;
}
var deck = [
  // Hearts
  new card('Ace', 'Hearts', 11),
  new card('King', 'Hearts', 10),
  new card('Queen', 'Hearts', 10),
  new card('Jack', 'Hearts', 10),
  new card('Ten', 'Hearts', 10),
  new card('Nine', 'Hearts', 9),
  new card('Eight', 'Hearts', 8),
  new card('Seven', 'Hearts', 7),
  new card('Six', 'Hearts', 6),
  new card('Five', 'Hearts', 5),
  new card('Four', 'Hearts', 4),
  new card('Three', 'Hearts', 3),
  new card('Two', 'Hearts', 2),
  // Clubs
  new card('Ace', 'Clubs', 11),
  new card('King', 'Clubs', 10),
  new card('Queen', 'Clubs', 10),
  new card('Jack', 'Clubs', 10),
  new card('Ten', 'Clubs', 10),
  new card('Nine', 'Clubs', 9),
  new card('Eight', 'Clubs', 8),
  new card('Seven', 'Clubs', 7),
  new card('Six', 'Clubs', 6),
  new card('Five', 'Clubs', 5),
  new card('Four', 'Clubs', 4),
  new card('Three', 'Clubs', 3),
  new card('Two', 'Clubs', 2),
  // Diamonds
  new card('Ace', 'Diamonds', 11),
  new card('King', 'Diamonds', 10),
  new card('Queen', 'Diamonds', 10),
  new card('Jack', 'Diamonds', 10),
  new card('Ten', 'Diamonds', 10),
  new card('Nine', 'Diamonds', 9),
  new card('Eight', 'Diamonds', 8),
  new card('Seven', 'Diamonds', 7),
  new card('Six', 'Diamonds', 6),
  new card('Five', 'Diamonds', 5),
  new card('Four', 'Diamonds', 4),
  new card('Three', 'Diamonds', 3),
  new card('Two', 'Diamonds', 2),
  // Spades
  new card('Ace', 'Spades', 11),
  new card('King', 'Spades', 10),
  new card('Queen', 'Spades', 10),
  new card('Jack', 'Spades', 10),
  new card('Ten', 'Spades', 10),
  new card('Nine', 'Spades', 9),
  new card('Eight', 'Spades', 8),
  new card('Seven', 'Spades', 7),
  new card('Six', 'Spades', 6),
  new card('Five', 'Spades', 5),
  new card('Four', 'Spades', 4),
  new card('Three', 'Spades', 3),
  new card('Two', 'Spades', 2)
];

/*
=============================
VARIABLES TO HANDLE STATS
=============================
*/
var used_cards = [];

var hand = {
  cards: [],
  current_total: 0,

  // to calculate average score
  grandTotal: 0,
  handsPlayed: 0,
  averageScore: 0,

  // calculate current_total, display it & mssg
  sumCardTotal: function(){
    this.current_total = 0;
    for (var i=0; i < this.cards.length; i++ ){

      // in all cases do this:
      this.current_total += this.cards[i].value;
      this.averagePerRound += this.current_total;
      $('#hdrTotal').text(this.current_total);

      // do this if conditions met:
      if (this.current_total > 21 ) {
        $('#btnStick').trigger('click');
        $('#hdrResult').text('BUST!');
        loseSound();
      } else if (this.current_total == 21) {
        $('#btnStick').trigger('click');
        $('#hdrResult').text('BLACKJACK! 100pts!');
        winSound();
      } else if (this.current_total <=21 && this.cards.length == 5) {
        $('#btnStick').trigger('click');
        $('#hdrResult').text('5 CARD TRICK!');
        winSound();
      } else { }
    }
  }
};


/*
=============================
DEAL & HIT FUNCTIONS
=============================
*/
// deal function using for loop and hit method
// hit once, wait 1000 ms hit again
function deal(){
  hit();
  setTimeout(hit, 1000);
}

/* grab random card, add to used_cards, append img */
function hit(){
  var good_card = false;
  do {
    var index = getRandom(52);
    if (!$.inArray(index, used_cards) > -1 ){

      good_card = true;
      var c = deck[index]; // grab card object
      console.log(c);
      used_cards[used_cards.length] = index; // add index used to array

      hand.cards[hand.cards.length] = c; // add card obj to end of array
      hand.sumCardTotal();

      // make a div element, addClass and appendTo
      var $d = $('<div>');
      console.log($d);
      $d.addClass('current_hand')
        .appendTo('#my_hand');

      // make an img element, set src and appendTo $d
      $('<img>').appendTo($d)
              .attr('src', 'images/cards/' + c.suit + '/' + c.name + '.jpg')
              .fadeOut('slow')
              .fadeIn('slow');
      dealCardSound();
    } // end if
  } while (!good_card); // repeat while good card is false
} // end hit()

/*
=============================
HELPER FUNCTIONS
=============================
*/
// get random function gets number between 0 and 51
function getRandom(num){
  var my_num = Math.floor(Math.random() * num );
  return my_num;
}

function dealCardSound(){
  var dealSound = document.getElementById('deal-card');
  dealSound.play();
}

function calculateScore(){
  var score = hand.current_total;
  if (score > 21){ score = 0; }
  if (score == 21){ score = 100; }
  return score;
}

function calculateAverage(){
  var score = hand.current_total;
  if (score > 21){ score = 0; }
  if (score == 21){ score = 100; }
  hand.grandTotal += score;
  hand.handsPlayed += 1;
  hand.averageScore = hand.grandTotal/hand.handsPlayed;
  var average = Math.round(hand.averageScore);
  return average;
}

function winSound(){
  var winSoundElement = document.getElementById('win-sound');
  winSoundElement.play();
}

function loseSound(){
  var loseSoundElement = document.getElementById('lose-sound');
  loseSoundElement.play();
}
