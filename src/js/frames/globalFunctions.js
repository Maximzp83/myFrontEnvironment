var globFunc = {
  returnDOM: function(element) {
    return element instanceof jQuery ? element[0] : element;
  },

  showOverlay: function(overlayType, overlayElement, additionalClass) {
    switch (overlayType) {
      case "popup":
        if (!overlayElement.classList.contains('js_openPopup')) {
          overlayElement.style.zIndex = 1150;
          overlayElement.style.visibility = 'visible';
          overlayElement.classList.add('js_openPopup');
          overlayElement.classList.add('js_open');
          
          additionalClass ? overlayElement.classList.add(additionalClass) : null;

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
  },
  hideOverlay: function(overlayType, overlayElement, additionalClass) {
    switch (overlayType) {
      case "popup":
        if (overlayElement.classList.contains('js_openPopup')) {
          overlayElement.classList.remove('js_openPopup');
          overlayElement.classList.remove('js_open');

          additionalClass ? overlayElement.classList.remove(additionalClass) : null;

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
        if (overlayElement.classList.contains('js_openMenu')) {
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
  },

  toggleButtonContent: function (buttonElement, strObj) {
    var button = this.returnDOM(buttonElement);
    var text;

    // console.log(buttonElement)

    if (strObj) { text = strObj } else if (buttonElement.dataset.text) {
      text = {
        default: buttonElement.dataset.text,
        active: buttonElement.dataset.textActive
      }
    }
    let buttonActive = button.classList.contains('active');

    if (buttonActive) {
      text ? button.querySelector('span').innerHTML = text.default : null;
      button.classList.remove('active');

    } else {
      text ? button.querySelector('span').innerHTML = text.active : null;
      button.classList.add('active');
    }
  },

  dropDown: (button, targetBlock) => {
    button.checked || button.classList.contains('active') ? 
    targetBlock.style.height = targetBlock.firstElementChild.offsetHeight + 'px' :
    targetBlock.style.height = "0px";    
  },

  animateBlock: function (block) {
    let self = this;
    this.removeClassFrom(block, 'js_animate');
    setTimeout(function() {self.addClassTo(block, 'js_animate') }, 50)
  },

  getCurrentYPosition: function() {
    return window.pageYOffset || document.documentElement.scrollTop;
  },

  addClassTo: function(element, activeClass) {
    var elem = this.returnDOM(element);
    if (!elem.classList.contains(activeClass)) {
      elem.classList.add(activeClass);
    }
  },
  removeClassFrom: function(element, activeClass) {
    var elem = this.returnDOM(element);
    if (elem.classList.contains(activeClass)) {
      elem.classList.remove(activeClass);
    }
  },

  transitionHandler: function(event, targetBlock, hiddenContent) {
    if (event.propertyName) {
      console.log(event.propertyName)  // your code here
    }

    if (event.srcElement) {
      console.log(event.srcElement)  // your code here
    }
  },

  getChildsTotalWidth: function(parent) {
    let children = parent.children;
    let result = 0;

    for (let i = 0; i < children.length; i++) {
      result = result + children[i].offsetWidth;
    }
    return result;
  },

  getCoordsOnPage: function(element) { 
    var elem = this.returnDOM(element);
    var box = elem.getBoundingClientRect();

    return {
      top: box.top + pageYOffset,
      left: box.left + pageXOffset,
      bottom: box.bottom + pageYOffset
    };
  },

  getCoordsOnScreen: function(element) {
    var elem = this.returnDOM(element);
    var box = elem.getBoundingClientRect();

    return {
      top: box.top,
      left: box.left,
      bottom: box.bottom,
      right: box.right,
      width: box.width,
      height: box.height,
    };
  },

  openWidth: function(element) {
    element.style.width = getChildsTotalWidth(element) + 'px';
  },
  collapseWidth: function(element) {
    element.style.width = '0';
  },

  isVisible: function(elem, option) {
    // var elem = this.returnDOM(element);
    let opt;
    option ? opt = option : opt = "whole";
    var windowTop = window.pageYOffset;
    var windowHeight = document.documentElement.clientHeight;
    var elemPageTop = elem.getBoundingClientRect().top + pageYOffset;
    var elemPageBottom = elemPageTop + elem.offsetHeight;

    if (opt == "whole") {
      if (document.documentElement.clientWidth > 991) {
        return (elemPageBottom <= windowTop + windowHeight) && (elemPageTop >= windowTop);
      } else {
        return ( elemPageTop <= (windowTop + windowHeight / 2) ) && (elemPageTop >= windowTop);
      }
    }

    if (opt == "topBorder") {
      // console.log(windowTop)
      return (elemPageTop >= windowTop + 130) && (elemPageTop <= windowTop + windowHeight);
    }

    if (opt == "topBorderIn") {
      return elemPageTop <= windowTop + windowHeight;
    }

    if (opt == "bottomBorder") {
      // return elemPageTop >= windowTop + 10;
    }
  },

  isVisibleOnXAxis: function(element, parent) {
    let isVisibleOnLeft = element.getBoundingClientRect().left > parent.getBoundingClientRect().left;
    let isVisibleOnRight = element.getBoundingClientRect().right < parent.getBoundingClientRect().right;
    return isVisibleOnLeft && isVisibleOnRight;
  },

  isLastChild: function(element) {
    return element.nextElementSibling ? false : true;
  },
  isFirstChild: function(element) {
    return element.previousElementSibling ? false : true;
  },
}