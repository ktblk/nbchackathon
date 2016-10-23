
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

function displayHrTag() {
	if( $('.selected-block').not(".clone-template").length > 0 ) {
			$('.selected-hr').fadeIn();
		} else {
			$('.selected-hr').fadeOut();
		}
}
