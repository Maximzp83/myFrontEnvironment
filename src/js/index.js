let status = "JS - OK!";
function cl(arg1, arg2, arg3, arg4) {
	console.log(arg1, arg2 || '', arg3 || '', arg4 || '');
	return '-';
}

// cl(status);


var glob = {
	header: null,
	scrollTopButton: null,
}

// =================
@@include('frames/globalFunctions.js')
// ===============


var test = 'include js error';

$(document).ready(function() {
	console.log('document ready')
	
	// =================Include Modules==============================

	@@include('testModule.js')

  /*@@include('frames/PopupModule.js')*/
  /*@@include('frames/ValidationModule.js')*/
	/*@@include('frames/AnimateBorderModule.js')*/
  /*@@include('frames/custom_Input_Type_number.js')*/
  /*@@include('frames/AccordionModule.js')*/
  /*@@include('frames/ToggleContentModule.js')*/
  /*@@include('frames/SwitchTabsModule.js')*/
  /*@@include('frames/TextLimitModule.js')*/
  /*@@include('frames/StickyBlockModule.js')*/
  /*@@include('frames/textLinesLimitPlugin.js')*/
  /*@@include('frames/LazyLoadModule.js')*/

 
	// =============================================================


	if (!$('body')) {console.log('jQuery Error')}
	// console.log(test);

	$('.mainHeader').on('click', '.menu-button', function(e) {
		globFunc.toggleButtonContent(this)	
	})

	$('.mainHeader').on('blur', '.menu-button', function() {
		// console.log('blur')
		if (this.classList.contains('active')) {
			globFunc.toggleButtonContent(this)			
		}
	})


  // ---------Popups Block-------

	$('body').on('click', '.searchButton', function() {
  	// e.preventDefault();
  	let modal = $('#popupSearch');
  	if ( modal.length ) {
  		glob.PopupModule.openPopup(modal, "js_openPopup_search");
  	}
  });

  $('body').on('click', '.button', function() {
  	// e.preventDefault();
  	let modal = document.getElementById('id');
  	if ( modal ) {
  		glob.PopupModule.openPopup(modal);
  	}
  });

  // ---------Accordion Blocks-------
	/*$('accordionBlockSelector').on('click', '.buttonSelector', function(e) {
		// console.time('click accordion working time');

		if (document.documentElement.clientWidth < 992) {
			e.stopPropagation();
			let submenuBlock = this.nextElementSibling;
			let button = this;

		// let siblingsBlocks = document.querySelectorAll('#publicInfoPage article.publicInfo-block .titleBlock + .hiddenContent');

			globFunc.toggleButtonContent(button);
			glob.AccordionModule.toggleContent("withoutSiblings", button, submenuBlock );
			// AccordionModule.toggleContent("withSiblings", button, submenuBlock, siblingsBlocks );				

		}
		// console.timeEnd('click accordion working time');
	})*/

  // ---------Text Limit-------
	/*let textBlocks = document.querySelectorAll('.selector');
	textBlocks.length ? TextLimitModule.sliceText(textBlocks, 180) : null;*/
	

	// ----------Scroll-to Section---------------
	
	/*$('body').on('click', 'article.story-item', function() {
		
		$('html, body').animate({
			scrollTop: $("#" + $(this).attr('data-story-id') ).offset().top
		}, 500);
	})*/

	// ---------- Sticky block---------------
	/*var stickyAsideBlock = document.querySelector('aside.sticky');

	if ( stickyAsideBlock && document.documentElement.clientWidth > 991 ) {
		var targetStickBlock = stickyAsideBlock.firstElementChild;
		let relativeBlock = document.getElementById(stickyAsideBlock.dataset.stickTo)

		glob.StickyBlockModule.toStick(targetStickBlock, relativeBlock);		
	}*/



	// ===========Initializations=============

	// AnimateBorder(document.querySelectorAll('.animated-border-block svg'), {
	// 	borderWidth: 3,
	// 	shadedSection: 100,
	// 	transparentSection: 25,
	// 	reverse: false,
	// 	radius: true 
	// })

});


window.onload = function() {
	console.log('window load')
	// $('#page-preloader').fadeOut('slow');

	// glob.LazyLoadModule.initLazy('lazyBlock')
}
