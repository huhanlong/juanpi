define(["jquery"],function($){
	function bannerTab(){
		// $(function(){
		var iNow = 0;
		var aImgs = $('.banner').find('img');
		var aBtns = $('.banner ul').find('li');
		var timer = null;
		
		timer = setInterval(function(){
			iNow++;
			tab();
		},4000)
	
		function tab(){
			// if(!aImgs){
			// 	aImgs = $('.banner').find('img');
			// }
			// if(!aBtns){
			// 	aBtns = $('.banner ul').find('li');
			// }
			if(iNow == 3){
				iNow = 0;
			}
			if(iNow == -1){
				iNow = 2;
			}
			aImgs.hide().css('opacity',0.2).eq(iNow).show().animate({opacity:1}, 500);
			aBtns.removeClass('list-one').eq(iNow).addClass('list-one');
		}
	
		$('.banner').mouseenter(function(){
			clearInterval(timer);
			$('.bannerArr').css('display','block');
		}).mouseleave(function () { 
			$('.bannerArr').css('display','none');
			timer = setInterval(function(){
				iNow++;
				tab();
			},4000)
	
		});
	
		$(".prev").click(function(){
			iNow--;
			tab();
		})
		$(".next").click(function(){
			iNow++;
			tab();
		})
	
		$('.banner ul').on('click','li',function(){
			iNow = $(this).index();
			tab();
		})
	// })
	}
	
	// function off(){
		function colse(){
		
				$('.off').click(function(){
				// console.log('1')
			$('.begin-banner').hide();
		});	
		// })
	}
	return {
		bannerTab,
		colse
	};
})

	
// }