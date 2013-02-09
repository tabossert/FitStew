$(document).ready(function(){
   $('#container').hide();
   
   $('.carousel').carousel({
	   interval: false
   })
   
   
   var slide = $(".box");
   slide.addClass("clickable");
	slide.click(
		function() {
			if($('#container').is(':visible')) {
				$('.carousel-inner').remove('.item');
				$('div').removeClass('bactive');
				$('.carousel-inner').append('<div class="item"><div class="cbox"><div class="ctitle">Karate</div><div class="clogo"><img src="img/karate.png"></div></div><div class="cbox"><div class="ctitle">Yoga</div><div class="clogo"><img src="img/yoga.png"></div></div><div class="cbox"><div class="ctitle">Kickboxing</div><div class="clogo"><img src="img/kickboxing.png"></div></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div></div>');
				$(this).addClass('bactive');
				$('.carousel').carousel('next');
				var copen = $(".cbox");
				copen.addClass("clickable");
				copen.click(
					function() {
						$('#classTitle').html($(this).children('.ctitle').text());
						$('#myModal').modal('show');
					}
				);
			} else {
				$(this).addClass('bactive');
				$('.carousel-inner').append('<div class="item"><div class="cbox"><div class="ctitle">Karate</div><div class="clogo"><img src="img/karate.png"></div></div><div class="cbox"><div class="ctitle">Yoga</div><div class="clogo"><img src="img/yoga.png"></div></div><div class="cbox"><div class="ctitle">Kickboxing</div><div class="clogo"><img src="img/kickboxing.png"></div></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div><div class="cbox"></div></div>');
				$('.item').addClass('active');
				$('#container').slideDown('slow');
				var copen = $(".cbox");
				copen.addClass("clickable");
				copen.click(
					function() {
						$('#classTitle').html($(this).children('.ctitle').text());
						$('#myModal').modal('show');
					}
				);
			}
		}
	);
	
	
});