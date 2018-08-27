let status = "JS - OK!";
console.log(status);

var PopupModule, RecentFunctions;
var AccordionModule;
var AnimateBorder;

var popupOrder,
		modals, pageOverlay;

var test = 'include js error';

$(document).ready(function() {
	// console.log('document ready')
	popupOrder = document.getElementById('popupOrder');
	
	modals = document.getElementsByClassName('popup');
	pageOverlay = document.getElementById('pageOverlay');


	// =================Include Modules==============================

	@@include('testModule.js')

	@@include('frames/RecentFunctionsModule.js')
	/*@@include('frames/toggleButtonContent.js')*/
	/*@@include('frames/custom_Input_Type_number.js')*/

	/*@@include('frames/AccordionModule.js')*/
	/*@@include('frames/ToggleContentModule.js')*/
	/*@@include('frames/SwitchTabsModule.js')*/
	/*@@include('frames/PopupModule.js')*/
	/*@@include('frames/TextLimitModule.js')*/
	/*@@include('frames/AnimateBorderModule.js')*/


	// =============================================================

	
		// console.log('window load')

	if ($('body')) {console.log('jQuery OK')}
	console.log(test);


  // ---------Popups Block-------

	$('body').on('click', '.orderButton', function() {
  	// e.preventDefault();
  	if (popupOrder) {
  		PopupModule.openPopup(popupOrder);
  	}
  });

  // ---------Accordion Blocks-------
	$('accordionBlockSelector').on('click', '.buttonSelector', function(e) {
		// console.time('click accordion working time');

		if (document.documentElement.clientWidth < 992) {
			e.stopPropagation();
			let submenuBlock = this.nextElementSibling;
			let button = this;

		// let siblingsBlocks = document.querySelectorAll('#publicInfoPage article.publicInfo-block .titleBlock + .hiddenContent');

			toggleButtonContent(button);
			AccordionModule.toggleContent("withoutSiblings", button, submenuBlock );
			// AccordionModule.toggleContent("withSiblings", button, submenuBlock, siblingsBlocks );				

		}
		// console.timeEnd('click accordion working time');
	})

  // ---------Text Limit-------
	// let textBlocks = document.querySelectorAll('.selector');
	// textBlocks.length ? TextLimitModule.sliceText(textBlocks, 180) : null;
	

	// ----------Scroll-to Section---------------
	
	// $('body').on('click', 'article.story-item', function() {
		
	// 	$('html, body').animate({
	// 		scrollTop: $("#" + $(this).attr('data-story-id') ).offset().top
	// 	}, 500);
	// })



	window.onload = function() {
		console.log('window load')
	}


	// ===========Initializations=============

	// AnimateBorder(document.querySelectorAll('.animated-border-block svg'), {
	// 	borderWidth: 3,
	// 	shadedSection: 100,
	// 	transparentSection: 25,
	// 	reverse: false,
	// 	radius: true 
	// })

});
