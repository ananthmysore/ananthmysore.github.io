jQuery(document).ready(function($){
	//open-close submenu on mobile
	$('.cd-main-nav').on('click', function(event){
		if($(event.target).is('.cd-main-nav')) $(this).children('ul').toggleClass('is-visible');
	});

	//text for collapse button
	$('.more').click(function(){
		var $this = $(this);
		$this.toggleClass('less');
		if($this.hasClass('less')){
			$this.html('Read Less');			
		} else {
			$this.html('Read More');
		}
	});
});


