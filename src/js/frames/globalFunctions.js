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
  },

  toggleButtonContent: function (buttonElement, text) {
    var button = this.returnDOM(overlayElement);

    let buttonActive = button.classList.contains('active');

    if (buttonActive) {
      text ? button.firstElementChild.innerHTML = text.default : null;
      button.classList.remove('active');

    } else {
      text ? button.firstElementChild.innerHTML = text.active : null;
      button.classList.add('active');
    }
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

  isVisible: function(tag, option) {
    let opt;
    option ? opt = option : opt = "whole";
    var t = $(tag);
    var w = $(window);
    var wt = w.scrollTop();
    var tt = t.offset().top;
    var tb = tt + t.height();

    if (opt == "whole") {
      if (document.documentElement.clientWidth > 991) {
        return (tb <= wt + w.height()) && (tt >= wt);
      } else {
        return ( tt <= (wt + w.height() / 2) ) && (tt >= wt);
      }
    }

    if (opt == "topBorder") {
      return tt <= wt + w.height() - 89;
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


// RecentFunctions = (function () {

//   function returnDOM(element) {
//     return element instanceof jQuery ? element[0] : element;
//   }

//   function getCurrentYPosition() {
//     return window.pageYOffset || document.documentElement.scrollTop;
//   }

//   function addClassTo(element, activeClass) {
//     var elem = returnDOM(element);
//     if (!elem.classList.contains(activeClass)) {
//       elem.classList.add(activeClass);
//     }
//   }
//   function removeClassFrom(element, activeClass) {
//     var elem = returnDOM(element);
//     if (elem.classList.contains(activeClass)) {
//       elem.classList.remove(activeClass);
//     }
//   }

//   function transitionHandler(event, targetBlock, hiddenContent) {
//     if (event.propertyName) {
//       console.log(event.propertyName)  // your code here
//     }

//     if (event.srcElement) {
//       console.log(event.srcElement)  // your code here
//     }
//   }

//   function getChildsTotalWidth(parent) {
//     let children = parent.children;
//     let result = 0;

//     for (let i = 0; i < children.length; i++) {
//       result = result + children[i].offsetWidth;
//     }
//     return result;
//   }

//   function getCoordsOnPage(element) { 
//     var elem = returnDOM(element);
//     var box = elem.getBoundingClientRect();

//     return {
//       top: box.top + pageYOffset,
//       left: box.left + pageXOffset,
//       bottom: box.bottom + pageYOffset
//     };
//   }

//   function getCoordsOnScreen(element) {
//     var elem = returnDOM(element);
//     var box = elem.getBoundingClientRect();
//     // console.log(box)

//     return {
//       top: box.top,
//       left: box.left,
//       bottom: box.bottom,
//       right: box.right,
//       width: box.width,
//       height: box.height,
//     };
//   }

//   function openWidth(element) {
//     element.style.width = getChildsTotalWidth(element) + 'px';
//   }
//   function collapseWidth(element) {
//     element.style.width = '0';
//   }

//   function isVisible(tag, option) {
//     let opt;
//     option ? opt = option : opt = "whole";
//     var t = $(tag);
//     var w = $(window);
//     var wt = w.scrollTop();
//     var tt = t.offset().top;
//     var tb = tt + t.height();

//     if (opt == "whole") {
//       if (document.documentElement.clientWidth > 991) {
//         return (tb <= wt + w.height()) && (tt >= wt);
//       } else {
//         return ( tt <= (wt + w.height() / 2) ) && (tt >= wt);
//       }
//     }

//     if (opt == "topBorder") {
//       return tt <= wt + w.height() - 89;
//     }
//   }

//   function isVisibleOnXAxis(element, parent) {
//     let isVisibleOnLeft = element.getBoundingClientRect().left > parent.getBoundingClientRect().left;
//     let isVisibleOnRight = element.getBoundingClientRect().right < parent.getBoundingClientRect().right;
//     return isVisibleOnLeft && isVisibleOnRight;
//   }

//   function isLastChild(element) {
//     return element.nextElementSibling ? false : true;
//   }
//   function isFirstChild(element) {
//     return element.previousElementSibling ? false : true;
//   }

//   // ------------
//   return {
//     returnDOM: returnDOM,
//     getCurrentYPosition: getCurrentYPosition,
//     addClassTo: addClassTo,
//     removeClassFrom: removeClassFrom,
//     transitionHandler: transitionHandler,
//     getChildsTotalWidth: getChildsTotalWidth,
//     getCoordsOnPage: getCoordsOnPage,
//     getCoordsOnScreen: getCoordsOnScreen,
//     openWidth: openWidth,
//     collapseWidth: collapseWidth,
//     isVisible: isVisible,
//     isVisibleOnXAxis: isVisibleOnXAxis,
//     isLastChild: isLastChild,
//     isFirstChild: isFirstChild,
//   }
  
// })()

