/**
 * caption width calicurator
*/
jQuery(function($){
$(window).load(function(){
	$('.caption').each(function(i){
		var captionimg = $('.caption-img').eq(i).outerWidth();
		$('.caption').eq(i).css('max-width',captionimg);
	});
});
});