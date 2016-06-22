
var $f, $m;

$(document).ready(function(){
	// detach fish into jq variable // sub portabello for hamburger // insert tofu before, detach meat into jq variable
	$('button#vegOn').click(function(){
		$f = $('li.fish').parent().parent().detach();
		console.log($f[1]);

		$('li.hamburger').replaceWith("<li class='portobello'><em>portobello mushrooms</em></li>");

		$('li.meat').after("<li class='tofu'><em>tofu</em></li>");
		$m = $('li.meat').detach();
		console.log($m[0]);

		$('.tofu').parent().parent().addClass('veg_leaf');
		$('.portobello').parent().parent().addClass('veg_leaf');
		$('.topper').css('background-color', '#9cd361');
	});

	// register a click handler to the restore button
	// fish entrees are first three children of .menu_entrees
	// $('.menu_entrees').prepend($f); // puts em in twice before each of both ul's class of menu_entrees.
	$('button#restoreMe').click(function(){

		// remove veg_leaf class before taking out the veg elements
		$('.tofu').parent().parent().removeClass('veg_leaf');
		$('.portobello').parent().parent().removeClass('veg_leaf');

		$('li.portobello').replaceWith("<li class='hamburger'><em>hamburger</em></li>");

		$('.menu_entrees li').first().before($f); // put fish elements in before the first list item in menu_entreees.

		$('.tofu').each(function(i){
			$(this).after($m[i]);
		});
		$('.tofu').remove();


		$('.topper').css('background-color', 'red');
		/* meat array has the meat ingredients in the order they were in the menu. now there are tofu there. so we can say .after tofu class elements put in the array items. grab the tofu elements, .each thru them and replaceWith corresponding index meat item.??
		$('li.tofu').each(function(index, element){
			$(this).replaceWith( $m[index]);
		});
		*/
	});

});
