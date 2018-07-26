console.log('PopupModule ok');

function showOverlay(overlayType, overlayElement) {

  switch (overlayType) {
    case "popup":
      if (!overlayElement.classList.contains('js_openPopup')) {
        overlayElement.style.zIndex = 1150;
        overlayElement.style.visibility = 'visible';
        overlayElement.classList.add('js_openPopup');
        overlayElement.classList.add('js_open');

        document.body.classList.add("js_pageOverlayOpen");
      } 
    break;

    case "menu":
      if (!overlayElement.classList.contains('js_openMenu')) {
        overlayElement.style.zIndex = 900;
        overlayElement.style.visibility = 'visible';
        overlayElement.classList.add('js_openMenu');
        overlayElement.classList.add('js_open');
        document.body.classList.add("js_pageOverlayOpen");
      } 
    break;
  }
}

function hideOverlay(overlayType, overlayElement) {

  switch (overlayType) {
    case "popup":
      if (overlayElement.classList.contains('js_openPopup')) {
        overlayElement.classList.remove('js_openPopup');
        overlayElement.classList.remove('js_open');

        document.body.classList.remove("js_pageOverlayOpen");
        setTimeout(function () {
          if (!overlayElement.classList.contains('js_openPopup')) {
            overlayElement.style.zIndex = -10;
            overlayElement.style.visibility = 'hidden';
          }
        }, 300)
      }
    break;

    case "menu":
    if (!overlayElement.classList.contains('js_openMenu')) {
      overlayElement.classList.remove('js_openMenu');
      overlayElement.classList.remove('js_open');
      document.body.classList.remove("js_pageOverlayOpen");
      setTimeout(function () {
        if (!overlayElement.classList.contains('js_openMenu')) {
          overlayElement.style.zIndex = -10;
          overlayElement.style.visibility = 'hidden';
        }
      }, 300)
    }
    break;
  }
}

// ==============Popup Open/Close Module ==============
PopupModule = (function () {

  function toggleShow(event, popupBlock) {
    // console.log('event,')
    if ( event.propertyName == 'opacity' ) {
      popupBlock.classList.contains('animate') ? null : popupBlock.classList.remove('js_open');
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

	function openPopup(popupBlock, overlayBlock) {
    let overlay = overlayBlock || pageOverlay;

    let popup = popupBlock.length ? popupBlock[0] : popupBlock;
        popup.classList.add("js_open");
        popup.classList.add("js_animate");

    showOverlay("popup", overlay);
	}

  function closePopup(popupBlock, overlayBlock) {
    let overlay = overlayBlock || pageOverlay;

    let popup = popupBlock.length ? popupBlock[0] : popupBlock;
    
    popup.classList.remove("js_animate");
    hideOverlay("popup", overlay);
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
  //     popup.classList.remove("js_open");
  //   }

  // -------Events--------  

  $('body').on('click', '#pageOverlay', function() {
  	hideOverlay("popup", this);

    if (modals) {
      for (var i = 0; i < modals.length; i++) {
        modals[i].classList.contains('js_open') ? closePopup(modals[i]) : null;
      }       
    }
  });
   
  $('body').on('click', 'button.popupCloseButton', function() {

    closePopup( $(this).closest('.popup') );

    hideOverlay("popup", pageOverlay);
  });

  window.onkeydown = function (e) {
  	if (e.keyCode === 27 ) {
      if (pageOverlay) {
        pageOverlay.classList.contains('js_open') ? hideOverlay("popup", pageOverlay) : null;
      }

      if (modals) {
        for (var i = 0; i < modals.length; i++) {
          modals[i].classList.contains('js_open') ? closePopup(modals[i]) : null;
        }       
      }
    }
  };

  // ------------

	return {
		openPopup: openPopup,
		closePopup: closePopup,
    showOverlay: showOverlay,
    hideOverlay: hideOverlay, 
	}

})();