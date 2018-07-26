var ToggleContentModule  = (function() {
	console.log('ToggleContentModule ok');
	// console.time('ToggleContent Module load');

	function toggleContent(buttonElement, data) {
		let button = buttonElement,
				buttonData = data.buttonData,
				targets = data.targets,
				thisTarget = data.thisContent,
				targetButtons = data.targetButtons,

				targetsReverse = data.targetsReverse;

			// console.log(thisTarget)

		
		// ------Methods--------

		function scale(button, targetBlock, action) {
			if (action === 'show' ) {
				button.checked || button.classList.contains('active') ? 
					targetBlock.classList.add('js_showScale') : targetBlock.classList.remove('js_showScale');
			} else {
				button.checked || button.classList.contains('active') ? 
				targetBlock.classList.add('js_hideScale') : targetBlock.classList.remove('js_hideScale');
			}
		}

		function dropDown(button, targetBlock, action, buttonsElements) {
			// console.log(targetBlock)
			if (action === 'show' ) {
				button.checked || button.classList.contains('active') ? 
				targetBlock.style.height = targetBlock.firstElementChild.offsetHeight + 'px' :
				targetBlock.style.height = "0px";
			}	else if (action === 'hideReverse') {
				button.checked || button.classList.contains('active') ? 
				targetBlock.style.height = "0px" :
				targetBlock.style.height = targetBlock.firstElementChild.offsetHeight + 'px';
			} else {
				targetBlock.style.height = "0px";
			}
		}

		function slideLeft(button, targetBlock, action, buttonsElements) {
			// console.log(targetBlock)
			if (action === 'show' ) {
				button.checked || button.classList.contains('active') ? 
				targetBlock.style.left =  "0%" : targetBlock.style.left = "100%";
			}	else if (action === 'hideReverse') {
				button.checked || button.classList.contains('active') ? 
				targetBlock.style.left =  "100%" : targetBlock.style.left = "0%";
			} else {
				targetBlock.style.left = "100%";
			}
		}

		function showHide(button, targetBlock, action) {
			if (action === 'show' ) {
				button.checked || button.classList.contains('active') ? 
					targetBlock.classList.add('js_show') : targetBlock.classList.remove('js_show');
			} else {
				button.checked || button.classList.contains('active') ?
					targetBlock.classList.add('js_hide') : targetBlock.classList.remove('js_hide');
			}	
		}

		// -------------------

		function cleanButtons(targetElements) {
			for (let i = 0; i < targetElements.length; i++) {
				targetElements[i].classList.contains('active') ? 
					targetElements[i].classList.remove('active') : null;
			}
		}

		function toggle(targetBlocks, action) {
			for (let i = 0; i < targetBlocks.length; i++) {
				switch (buttonData.menuType || 'default') {
					case 'scale': scale( button, targetBlocks[i], action ); break;
					case 'drop-down': dropDown( button, targetBlocks[i], action ); break;
					case 'drop-left': slideLeft( button, targetBlocks[i], action ); break;
					case 'show-hide': showHide( button, targetBlocks[i], action ); break;

					default: console.error('no correct "data-menu-type" attribute is set to the button element in HTML!');
				}						
			}      
		}


		switch (buttonData.buttonType || 'default') {
			case 'checkbox':
			case 'button':
			case 'menuButton':
					toggle(targets, 'show');
					toggle(targetsReverse, 'hideReverse');					
			break;

			case 'accordion': 
				toggle(targetsReverse, 'hide');
				cleanButtons(targetButtons);
				toggle(thisTarget, 'show');
			break;

			case 'radio': 
				for (let i = 0; i < targets.length; i++) {
					targets[i].classList.contains(button.name) ? toggle(targets[i], "hide") : null;
					toggle(targets[i], 'show');				      
				}
			break;

			default: console.error('no correct "data-button-type" attribute is set to the button element in HTML!');
		}

	}

	// --------------------------------------------

	

	function targetsForAction(buttonElement, buttonData) {
		let targetsForActionId = buttonData.target ? buttonData.target.split(' ') : null,
		 		targetsForAction = [];

		if (targetsForActionId) {
			for (let i = 0; i < targetsForActionId.length; i++) {
				targetsForAction.push( document.getElementById(targetsForActionId[i]) );
			}
		}

		return targetsForAction;
	}

	function targetsForReverseAction(buttonElement, buttonData) {
		let	targetsForReverseActionId = buttonData.targetReverse ? buttonData.targetReverse.split(' ') : null,
				targetsForActionGroup = buttonData.group ? buttonData.group : null,
				targetsForReverseAction = [];	

		if (targetsForReverseActionId) {
			for (let i = 0; i < targetsForReverseActionId.length; i++) {
				targetsForReverseAction.push( document.getElementById(targetsForReverseActionId[i]) );
			}
		}
		if (targetsForActionGroup) {
			targetsForReverseAction = document.getElementsByClassName(targetsForActionGroup);
		}

		return targetsForReverseAction;
	}

	function thisContentTarget(buttonElement, buttonData) {
		let thisTarget = buttonData.group ? buttonElement.parentElement.getElementsByClassName(buttonData.group) : null;
		return thisTarget;
	}

	function targetsForReverseActionButtons(buttonElement, buttonData) {
		let targetButtons = [];

		if (buttonData.group) {
			let buttonsAll = document.querySelectorAll('.showButton[data-group="' + buttonData.group + '"]' );

			if (buttonsAll) {
				for (let i = 0; i < buttonsAll.length; i++) {
					buttonsAll[i] === buttonElement ? null : targetButtons.push(buttonsAll[i]);
				}
			}
		}

		return targetButtons;	
	}


	// ----Show Content Actions ---------
	$('body').on('click', '.showButton', function() {
		// console.time('click toggle working time');

		let targetContentData = {};


		// ----- targetContentData constructor------
		if (this) {
			let buttonData = this.dataset;

			// console.log(buttonData)
			targetContentData = {};
			targetContentData.buttonData = buttonData;
			targetContentData.targets = targetsForAction(this, buttonData );
			targetContentData.targetsReverse = targetsForReverseAction(this, buttonData );

			if (buttonData.buttonType === "accordion") {
				targetContentData.thisContent = thisContentTarget(this, buttonData);
				targetContentData.targetButtons = targetsForReverseActionButtons(this, buttonData);
			}

			// --------Actions/Events--------

			if (buttonData.buttonType === "menuButton") {
				toggleButtonContent(this);
				this.classList.contains('active') ? 
				PopupModule.showOverlay("menu", pageOverlay) : 
				PopupModule.hideOverlay("menu", pageOverlay);

				toggleContent(this, targetContentData);

			} else {
				toggleButtonContent(this);
				toggleContent(this, targetContentData);				
			}

		}
		// console.timeEnd('click toggle working time');
			
	});


})();