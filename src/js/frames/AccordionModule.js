let AccordionModule  = (function() {
	console.log('AccordionModule ok');
	
	function toggleContent(options, button, targetBlock, allTargetBlocks) {
		let subMenuParent = button ? findParentWrapper(button, 'menuWrapper') : null;
		let targetHeight = targetBlock ? targetBlock.firstElementChild.offsetHeight : null;

		function findParentWrapper(element, searchClass) {
			let finded = false;
			let currentElement = element, findingElement = null;

			while(!finded) {

				if ( currentElement.parentElement.classList.contains(searchClass) ) { 
					findingElement = currentElement.parentElement;
					finded = true;
				} else if (currentElement.parentElement.classList.contains('accordionMenu')) break;
				currentElement = currentElement.parentElement;
			}
			return findingElement;
		}

		function resetDropDown(targetElements) {
			for (let i = 0; i < targetElements.length; i++) {
				targetElements[i].parentElement.classList.remove('active');
				targetElements[i].style.height = "";
			}
		}


		function closeSiblings(button, targetElements) {
			for (let i = 0; i < targetElements.length; i++) {
				let button = targetElements[i].parentElement
				if (button.classList.contains('active') ) {
					button.classList.remove('active');
					targetElements[i].style.height = "0px";
				}
				
			}
		}

		function dropDown(button, targetElement, subMenuParent) {
			if ( button.checked || button.classList.contains('active') ) {
				if (subMenuParent) {
					subMenuParent.style.height = subMenuParent.offsetHeight + targetHeight + 'px';
				}
				targetElement.style.height = targetHeight + 'px'
			} else {			 
				targetElement.style.height = "0px";
				if (subMenuParent) {
					subMenuParent.style.height =  subMenuParent.offsetHeight - targetHeight + 'px';
				}

			}
		}


		switch (options  || 'default') {

			case 'withSiblings': 
				closeSiblings(button, allTargetBlocks);
				dropDown(button, targetBlock, subMenuParent);
			break;

			case 'withoutSiblings': dropDown(button, targetBlock, subMenuParent); break;

			case 'resetDropDown': resetDropDown(allTargetBlocks); break;


			default: console.error('no correct option typed in toggleContent function');

		}

	}
    
	// -----Resize Event------
	// const mobileFilterMenuBlocks = document.querySelectorAll('#filterWrapper .filter-item .filter-content-wrapper');

	// let timer = null;

	// window.onresize = function () {
	// 	if (timer) {
	// 		clearTimeout(timer);
	// 	}

	// 	timer = setTimeout(function() {
	// 		timer = null;

 //     // =======Handlers=======
 //      if (mobileFilterMenuBlocks) {
 //      	if (document.documentElement.clientWidth > 991) {
	// 				toggleContent("resetDropDown", null, null, mobileFilterMenuBlocks);
	// 			}
 //      }
 //     }, 50);
	// };

	
// ------------

	return {
		toggleContent: toggleContent,
		
	}


	

})()