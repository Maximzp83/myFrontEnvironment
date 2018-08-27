RecentFunctions = (function () {

	function getCurrentYPosition() {
	  return window.pageYOffset || document.documentElement.scrollTop;
	}

	function addClassTo(element, activeClass) {
		if (!element.classList.contains(activeClass)) {
			element.classList.add(activeClass);
		}
	}
	function removeClassFrom(element, activeClass) {
		if (element.classList.contains(activeClass)) {
			element.classList.remove(activeClass);
		}
	}

	function transitionHandler(event, targetBlock, hiddenContent) {
		if (event.propertyName) {
			console.log(event.propertyName)
		}

		if (event.srcElement) {
			console.log(event.srcElement)
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

 	function getCoordsOnPage(elem) { 
 		element.length ? elem = element[0] : elem = element;
 		var box = elem.getBoundingClientRect();

 		return {
 			top: box.top + pageYOffset,
 			left: box.left + pageXOffset,
 			bottom: box.bottom + pageYOffset

 		};
 	}

 	function getCoordsOnScreen(element) {
 		var elem;
 		element.length ? elem = element[0] : elem = element;
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

  // ------------
  return {
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
  }
  
})()