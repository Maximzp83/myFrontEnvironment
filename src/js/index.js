let status = "JS - OK!, window load";
console.log(status);

// var PopupModule;
// var AccordionModule;

var popupOrder,
		modals, pageOverlay;

$(document).ready(function() {
	popupOrder = document.getElementById('popupOrder');
	
	modals = document.getElementsByClassName('popup');
	pageOverlay = document.getElementById('pageOverlay');


	// =================Include Modules==============================

	// =include testModule.js

	// //=include frames/toggleButtonContent.js  //need for modules below
	// //=include frames/custom_Input_Type_number.js  

	// //=include frames/AccordionModule.js
	// //=include frames/ToggleContentModule.js
	// //=include frames/SwitchTabsModule.js
	// //=include frames/PopupModule.js
	// //=include frames/TextLimitModule.js

	// =============================================================

});


window.onload = function() {
	if ($('body')) {console.log('jQuery OK')}
	console.log(test);


  // ---------Popups Block-------

	$('body').on('click', '.orderButton', function() {
  	// e.preventDefault();
  	if (popupOrder) {
  		PopupModule.showOverlay("popup", pageOverlay);
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
}


	

// ===========Initializations=============

$(document).ready(function() {

});