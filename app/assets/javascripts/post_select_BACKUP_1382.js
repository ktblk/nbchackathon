
$(document).on('click','.selected-block button.close-btn',function(event){
	var $this = $(this),
		$parent = $this.closest('.selected-block');

	$parent.slideUp('slow', function() {
		$(this).remove();
		displayHrTag()
	});
});

$(document).on('click','.read-btn',function(event){
	var $this = $(this),
		$parent = $this.closest('.custom-card'),
		options = $this.data(),
		$cloneBlock = $('.selected-block.clone-template').clone();

	$cloneBlock.removeClass('clone-template');

	$cloneBlock.find('img.media-object').attr("src" , options.url);
	$cloneBlock.find('p.text-title').text(options.title);
	$cloneBlock.find('.media-body').data(options);
	$this.closest('.options-block').toggleClass('active-tag');
	$cloneBlock.hide();
	$('.selected-section').append($cloneBlock);
	$cloneBlock.slideDown('slow', function() {
		displayHrTag()
	});
	
	
});

$(document).on('click','button.create-video',function(event){
	var $this = $(this),
		$blocks = $('.selected-block:visible').find('.media-body');

	if( $blocks.length > 0 ) {
		$(".image-view-section").empty();
		$blocks.each(function(i,x) {
			var img = $("<img class='img-fluid' style='max-height: 280px'>");
			img.attr('src',  $(this).data().url);
			$(".image-view-section").append(img);
		});
<<<<<<< HEAD
		$('.create-vide-section,button.create-video, .selected-section').fadeOut('fast', function() {
=======
		$('.create-vide-section').fadeOut(3000, function() {
			$('.image-view-section').show();
>>>>>>> origin/master
			
			if( false ) {
				$('.image-view-section').slick({arrows: false, autoplay: true, autoplaySpeed: 2000 });
			} else {
				$('.image-view-section').html( '<iframe width="100%" height="432" src="//embed.wirewax.com/8042662/" frameborder="0" scrolling="no" allowfullscreen></iframe>' );
			}
			
			$('.image-view-section').slideDown('slow', function() {	
				$('#accordion').fadeIn();
			});

		});
	} else {
		$('.image-view-section').fadeOut('slow', function() {
			$('.image-view-section').empty();
			$('.create-vide-section').show();
			$('#accordion').fadeOut();
		});
	}

});

function displayHrTag() {
	if( $('.selected-block').not(".clone-template").length > 0 ) {
			$('.selected-hr').slideDown('fast');
		} else {
			$('.selected-hr').slideUp('fast');
		}
}
