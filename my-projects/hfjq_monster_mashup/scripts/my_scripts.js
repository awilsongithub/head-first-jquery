$(document).ready(function(){

	// invoke lightning on load and focus. stop on blur.
	goLightning();
	window.onblur = stopLightning;
	window.onfocus = goLightning;

	// click handlers
	$('#btnRandom').click(randomize);
	$('#btnReset').click(reset);

	$('#head').click(function(){
		moveMe(0, this);
	});
	$('#eyes').click(function(){
		moveMe(1, this);
	});
	$('#nose').click(function(){
		moveMe(2, this);
	});
	$('#mouth').click(function(){
		moveMe(3, this);
	});

}); // end doc ready

// global variables
// var headclix = 0, eyeclix = 0, noseclix = 0, mouthclix = 0;
var clix = [0, 0, 0, 0]; // track times face parts clicked
var int1, int2, int3, int4, int5;
var m = 10; // # of monster faces on strip
var w = 367; // px width of each face on strip

// invokes lightning intervals
function goLightning(){
	int1 = window.setInterval(lightning_one, 4000);
	int2 = window.setInterval(lightning_two, 5000);
	int3 = window.setInterval(lightning_three, 7000);
	int4 = window.setInterval(thunderSoft, 8000);
	int5 = window.setInterval(thunderLoud, 20000);
}

// clear intervals
function stopLightning(){
	window.clearInterval(int1);
	window.clearInterval(int2);
	window.clearInterval(int3);
	window.clearInterval(int4);
	window.clearInterval(int5);
}

// lightning & thunder functions
function lightning_one(){
	$('#lightning1').fadeIn('fast').fadeOut('fast');
}
function lightning_two(){
	$('#lightning2').fadeIn('fast').fadeOut('fast');
}
function lightning_three(){
	$('#lightning3').fadeIn('fast').fadeOut('fast');
}
function thunderLoud(){
	var loud = document.getElementById('loudThunder');
	loud.play();
}
function thunderSoft(){
	var soft = document.getElementById('softThunder');
	soft.play();
}

// animate element passed based on clix value, update clix value
function moveMe(i, obj){
	console.log('moveMe called with ' + obj);
	if (clix[i] < 9){
		clix[i] += 1;
		$(obj).animate({left: '-=367px'}, 'slow');
	} else {
		clix[i] = 0;
		$(obj).animate({left: '0px'}, 'slow');
	}
}

// random number generator
function getRandom(num){
	var my_random_num = Math.floor(Math.random()*num);
	console.log(my_random_num);
	return my_random_num;
}

// animate each part of .face randomly & update clix tracker
function randomize(){
	// get all elments of class face
	$('.face').each(function(index){
		// target = getRandom
		var target_position = getRandom(m);
		// current = clix[index]
		var current_position = clix[index];
		// set clix[index] to target
		clix[index] = target_position;
		// move distance = target * w
		var move_to = target_position * w;
		console.log(move_to);
		// this.animate to left: distance + 'px'
		$(this).animate({left: '-' + move_to + 'px'}, 500);
	});
}

function reset(){
	$('.face').each(function(index){
		$(this).animate({left: '0px'}, 500);
		clix[index] = 0;
	});
}
