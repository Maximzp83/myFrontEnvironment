console.log('PopupModule ok');

const pageOverlay = document.getElementById('pageOverlay');

function toggleOverlay(overlayType, overlayElement) {

  switch (overlayType) {
    case "popup":
    if (!overlayElement.classList.contains('openPopup')) {
      overlayElement.style.zIndex = 1150;
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

  const modals = document.getElenentsByClassName('popup');

  function toggleShow(event, popupBlock) {
    // console.log('event,')
    if ( event.propertyName == 'opacity' ) {
      popupBlock.classList.contains('animate') ? null : popupBlock.classList.remove('open');
    }
  }

  if (modals.length) {
    for (let i = 0; i < modals.length; i++) {
      modals[i].addEventListener("transitionend", function(event) {
        event.stopPropagation();
        toggleShow(event, modals[i])
      }, false);
    }
  }

	function openPopup(popupBlock) {
		let popup = popupBlock.length ? popupBlock[0] : popupBlock;
        popup.classList.add("open");
        popup.classList.add("animate");
	}

  function closePopup(popupBlock) {
    let popup = popupBlock.length ? popupBlock[0] : popupBlock;
    popup.classList.remove("animate");
  }

	// function closePopup(popupBlock) {
  //     let popup = popupBlock.length ? popupBlock[0] : popupBlock;
      
  //     popup.addEventListener("transitionend", hidePopup);

  //     function hidePopup(e) {
  //        e.stopPropagation();
         
  //         if ( e.propertyName == 'opacity' ) {
  //           popup.classList.remove("show");
  //         }
  //         popup.removeEventListener("transitionend", hidePopup);
  //     }
  //     popup.classList.remove("open");
  //   }

  // -------Events--------  

  $('body').on('click', '#pageOverlay', function() {
  	toggleOverlay("popup", this);

    if (modals) {
      for (var i = 0; i < modals.length; i++) {
        modals[i].classList.contains('open') ? closePopup(modals[i]) : null;
      }       
    }
  });
   
  $('body').on('click', 'button.popupCloseButton', function() {

    closePopup( $(this).closest('.popup') );

    toggleOverlay("popup", pageOverlay);
  });

  window.onkeydown = function (e) {
  	if (e.keyCode === 27 ) {
      if (pageOverlay) {
        pageOverlay.classList.contains('open') ? toggleOverlay("popup", pageOverlay) : null;
      }

      if (modals) {
        for (var i = 0; i < modals.length; i++) {
          modals[i].classList.contains('open') ? closePopup(modals[i]) : null;
        }       
      }
    }
  };

  // ------------

	return {
		openPopup: openPopup,
		closePopup: closePopup,
		// toggleOverlay: toggleOverlay,
    
		// popupOrder: popupOrder,
	}

})();