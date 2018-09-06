RecentFunctions = (function () {

  function returnDOM(element) {
    return element instanceof jQuery ? element[0] : element;
  }

	function getCurrentYPosition() {
	  return window.pageYOffset || document.documentElement.scrollTop;
	}

	function addClassTo(element, activeClass) {
    var elem = returnDOM(element);
		if (!elem.classList.contains(activeClass)) {
			elem.classList.add(activeClass);
		}
	}
	function removeClassFrom(element, activeClass) {
    var elem = returnDOM(element);
		if (elem.classList.contains(activeClass)) {
			elem.classList.remove(activeClass);
		}
	}

	function transitionHandler(event, targetBlock, hiddenContent) {
		if (event.propertyName) {
			console.log(event.propertyName)  // your code here
		}

		if (event.srcElement) {
			console.log(event.srcElement)  // your code here
		}
	}

 	function getChildsTotalWidth(parent) {
 		let children = parent.children;
 		let result = 0;

 		for (let i = 0; i < children.length; i++) {
 			result = result + children[i].offsetWidth;
 		}
 		return result;
 	}

 	function getCoordsOnPage(element) { 
 		var elem = returnDOM(element);
 		var box = elem.getBoundingClientRect();

 		return {
 			top: box.top + pageYOffset,
 			left: box.left + pageXOffset,
 			bottom: box.bottom + pageYOffset
 		};
 	}

 	function getCoordsOnScreen(element) {
 		var elem = returnDOM(element);
 		var box = elem.getBoundingClientRect();
  	// console.log(box)

  	return {
  		top: box.top,
  		left: box.left,
  		bottom: box.bottom,
  		right: box.right,
  		width: box.width,
  		height: box.height,
  	};
  }

  function openWidth(element) {
  	element.style.width = getChildsTotalWidth(element) + 'px';
  }
  function collapseWidth(element) {
  	element.style.width = '0';
  }

  function isVisible(tag, option) {
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
  }

  function isVisibleOnXAxis(element, parent) {
    let isVisibleOnLeft = element.getBoundingClientRect().left > parent.getBoundingClientRect().left;
    let isVisibleOnRight = element.getBoundingClientRect().right < parent.getBoundingClientRect().right;
    return isVisibleOnLeft && isVisibleOnRight;
  }

  function isLastChild(element) {
    return element.nextElementSibling ? false : true;
  }
  function isFirstChild(element) {
    return element.previousElementSibling ? false : true;
  }

  // ------------
  return {
    returnDOM: returnDOM,
  	getCurrentYPosition: getCurrentYPosition,
  	addClassTo: addClassTo,
  	removeClassFrom: removeClassFrom,
  	transitionHandler: transitionHandler,
  	getChildsTotalWidth: getChildsTotalWidth,
  	getCoordsOnPage: getCoordsOnPage,
  	getCoordsOnScreen: getCoordsOnScreen,
  	openWidth: openWidth,
  	collapseWidth: collapseWidth,
  	isVisible: isVisible,
    isVisibleOnXAxis: isVisibleOnXAxis,
    isLastChild: isLastChild,
    isFirstChild: isFirstChild,
  }
  
})()