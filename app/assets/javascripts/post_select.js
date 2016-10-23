
$(document).on('click','.selected-block button.close-btn',function(event){
	var $this = $(this),
		$parent = $this.closest('.selected-block');

	$parent.fadeOut('slow', function() {
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

	$('.selected-section').append($cloneBlock);
	displayHrTag()
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
		$('.create-vide-section').fadeOut(3000, function() {
			$('.image-view-section').show();
			$('.image-view-section').slick({arrows: false, autoplay: true, autoplaySpeed: 2000 });
			$('button.create-video, .selected-section').fadeOut('slow', function() {
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
			$('.selected-hr').fadeIn();
		} else {
			$('.selected-hr').fadeOut();
		}
}
