console.log('PopupModule ok');

const pageOverlay = document.getElementById('pageOverlay');

function toggleOverlay(overlayType, overlayElement) {

  switch (overlayType) {
    case "popup":
    if (!overlayElement.classList.contains('openPopup')) {
      overlayElement.style.zIndex = 300;
      overlayElement.style.visibility = 'visible';
      overlayElement.classList.add('openPopup');
      overlayElement.classList.add('open');

      document.body.classList.add("pageOverlayOpen");
    } else {
      overlayElement.classList.remove('openPopup');
      overlayElement.classList.remove('open');

      document.body.classList.remove("pageOverlayOpen");
      setTimeout(function () {
        if (!overlayElement.classList.contains('openPopup')) {
          overlayElement.style.zIndex = -10;
          overlayElement.style.visibility = 'hidden';
        }
      }, 500)
    }
    break;
  }
}

// ==============Popup Open/Close Module ==============
var PopupModule = (function () {

	const successPopupBlock = document.getElementById('popupSuccess');

	function openPopup(popupBlock) {
		popupBlock.style.zIndex = 400;
		popupBlock.style.visibility = 'visible';
		popupBlock.classList.add("open");
	}

	function closePopup(popupBlock) {
		let popup = popupBlock.length ? popupBlock[0] : popupBlock;

		popup.classList.remove("open");

		setTimeout(function () {
			popup.style.zIndex = -1;
			popup.style.visibility = 'hidden';
		}, 700)
	}

  // -------Events--------  

  $('footer.mainFooter' ).on('click', 'form button[type="submit"]', function(e) {
  	e.preventDefault();

  	if (successPopupBlock) {
  		toggleOverlay("popup", pageOverlay);
  		openPopup(successPopupBlock);
  	}
  });


  $('body').on('click', '#pageOverlay', function() {
  	toggleOverlay("popup", pageOverlay);
  	closePopup( $(this).closest('.popup') );
  });
   
  $('body').on('click', 'button.popupCloseButton', function() {
  	// successPopupBlock.classList.contains('open') ? closePopup(successPopupBlock) : null;

  // 	toggleOverlay("popup", this);
  });

  window.onkeydown = function (e) {
  	if (e.keyCode === 27 ) {
      successPopupBlock.classList.contains('open') ? closePopup(successPopupBlock) : null;
      popupShopBlock.classList.contains('open') ? closePopup(popupShopBlock) : null;

      pageOverlay.classList.contains('openPopup') ? toggleOverlay("popup", pageOverlay) : null;
    }
	};

  // ------------

	return {
		openPopup: openPopup,
		closePopup: closePopup,
		toggleOverlay: toggleOverlay,
    
		successBlock: successPopupBlock
	}

})();