$(document).ready(function(){
  /*
  1. function to hide the code
  2. helper function to generate random number using argument passed
  3. call/invoke hide code function
  4. function to check for code and output message and code
    4b. and unbind click event handler
  5. bind check for code f. to click event
  */

  // bind checkForCode handler to click event of elements with a class of guess_box
  $('.guess_box').click(checkForCode);

  //get random num 0-3 then // iterate guess_box elements and when index matches random number then append hidden code html into that element
  var hideCode = function(){
    console.log('hideCode invoked');
    var numRand = getRandom(4);
    console.log(numRand);
    $('.guess_box').each(function(index, value){
      if (index == numRand){
        $(this).append("<span id='has_discount'></span>");
        return false; // to exit loop. no need for more looping.
      }
    });
  };
  hideCode(); // invoke it right off the bat

  // declar discount variable. if this contains span element with right id then generate a random number for the code and populate discount with a  msg containing code otherwise populate with a sorry msg.
  // append discount value to this
  // iterate all .guess_box elements and unbind checkForCode handler
  function checkForCode(){
    var discount;
    if ($.contains(this, document.getElementById('has_discount') ) ){
      var my_num = getRandom(101);
      var my_letters = getRandomLetters();
      var secretCode = my_letters + my_num;
      console.log(secretCode);
      discount = '<p>You found it!<br>Discount code is: ' + secretCode + '.</p>';
    } else {
      discount = '<p>Sorry, wrong photo.</p>';
    }
    console.log(discount);
    $('#message').append(discount);
    $('.guess_box').each(function(){
      $(this).unbind('click');
    });

  }

  // generate a number from 0 to num - 1
  function getRandom(num){
    var my_num = Math.floor(Math.random() * num );
    return my_num;
  }
  // generate random letters
  // math.random sets index of array to choose an item
  function getRandomLetters(){
    var possibleLetters = ['ABC', 'DEF', 'GHI', 'JKL'];
    var indexSelector = Math.floor(Math.random() * 4); // 0-3
    var letterCode = possibleLetters[indexSelector];
    return letterCode;
  }

  /* =====================
    HOVER FUNCTIONALITY
  ======================= */

  // color the background of hovered img (not whole div)
  // $('.guess_box img').hover(
  //   function(){
  //     $(this).css('border', '5px solid yellow');
  //   },
  //   function(){
  //     $(this).css('border', '3px solid black');
  //   }
  // );

  // alternate hover border using chained methodes mouseenter, mouseleave
  $('.guess_box img')
    .mouseenter(function(){
      $(this).addClass('yellow_border');
      $(this).removeClass('black_border');
    }) // no semi-colon yet...
    .mouseleave(function(){
      $(this).addClass('black_border');
      $(this).removeClass('yellow_border');
    });

}); // end .ready
