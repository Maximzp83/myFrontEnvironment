glob.StickyBlockModule = (function() {

  var target;
  var relative;
  var isActive = false;

  function toStick(targetBlock, relativeBlock) {
    target = targetBlock;
    relative = relativeBlock;
    isActive = true;
    // cl('activate ', isActive)

    toScroll(isActive)
  }

  function unStick() {
    isActive = false;
    // cl('deactivate')
    toScroll(isActive)    
  }
  
  function checkPosition(targetBlock, relativeBlock) {
    if ( !globFunc.isVisible(relativeBlock, 'topBorder') ) {

      if ( !targetBlock.classList.contains('js_fixed_nav') ) {
        targetBlock.style.width = targetBlock.offsetWidth + 'px';
        targetBlock.classList.add('js_fixed_nav');
      }

      if (globFunc.getCoordsOnScreen(targetBlock).bottom >= globFunc.getCoordsOnScreen(relativeBlock).bottom) {
        targetBlock.classList.add('js_absolute_nav');
        targetBlock.classList.remove('js_fixed_nav');
      }

      if ( targetBlock.classList.contains('js_absolute_nav') ) {
        if (globFunc.isVisible(targetBlock, "topBorder")) {
          targetBlock.classList.remove('js_absolute_nav');
          targetBlock.classList.add('js_fixed_nav');
        }
      }

    } else {
      if ( targetBlock.classList.contains('js_fixed_nav') ) {
        targetBlock.style.width = '';
        targetBlock.classList.remove('js_fixed_nav');
      }
    }
  }

  function toScroll(status) {
    if (status) {
      $(window).scroll(function () {
        if (target && relative) {
          checkPosition(target, relative)
        }
      })
    }
  }
  
  

  return {
    toStick: toStick,
    unStick: unStick,
  }

})()