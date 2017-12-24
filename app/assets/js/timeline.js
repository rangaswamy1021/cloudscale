jQuery(document).ready(function($){
	var timelineBlocks = $('.cd-timeline-block'),
		offset = 0.8;
		var offsetTop,offsetBottom;

		if($(window).width()>991){

			 offsetTop=$('#cd-timeline').offset().top-555;
			 offsetBottom=offsetTop+700+timelineBlocks.height();
		}
		if($(window).width()<991 && $(window).width() > 767)
		{

			 offsetTop=$('#cd-timeline').offset().top-555;
			 offsetBottom=offsetTop+650+timelineBlocks.height();
		}
		if($(window).width()<767){
			offsetTop=$('#cd-timeline').offset().top-555;
			offsetBottom=offsetTop+1110+timelineBlocks.height();
		}
	
	//hide timeline blocks which are outside the viewport
	hideBlocks(timelineBlocks, offset);
		
	//on scolling, show/animate timeline blocks when enter the viewport
	$(window).on('scroll', function(){
		(!window.requestAnimationFrame) 
			? setTimeout(function(){ showBlocks(timelineBlocks, offset); }, 100)
			: window.requestAnimationFrame(function(){ showBlocks(timelineBlocks, offset); });
			if($(window).scrollTop()>offsetTop&&$(window).scrollTop()<offsetBottom){
				lineHeight=$(window).scrollTop()-offsetTop;
				console.log(lineHeight);
				$('.line-active').css({'height':lineHeight+'px'});
			}
			if($(window).scrollTop()>$('.what-will-you-get').offset().top-90){
				$('.line-active').css({'height':'100%'});
			
			}
	});

	function hideBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top > $(window).scrollTop()+$(window).height()*offset ) && $(this).find('.cd-timeline-img, .cd-timeline-content').addClass('is-hidden');
		});
	}

	function showBlocks(blocks, offset) {
		blocks.each(function(){
			( $(this).offset().top <= $(window).scrollTop()+$(window).height()*offset && $(this).find('.cd-timeline-img').hasClass('is-hidden') ) && $(this).find('.cd-timeline-img, .cd-timeline-content').removeClass('is-hidden').addClass('bounce-in');
		});
	}
});