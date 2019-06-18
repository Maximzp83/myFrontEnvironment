glob.ToggleContentModule  = (function() {
	// console.log('ToggleContentModule ok');
	// console.time('ToggleContent Module load');

	function toggleContent(buttonElement, data) {
		let button = buttonElement,
				buttonData = data.buttonData,
				targets = data.targets,
				thisTarget = data.thisContent,
				targetButtons = data.targetButtons,
				targetsReverse = data.targetsReverse;

			// console.log(data)

		
		// ------Methods--------

		function dropDown(button, targetBlock, action, buttonsElements) {
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

		function showHide(button, targetBlock, action, cssShowClass, cssHideClass) {
			if (action === 'show' ) {
				button.checked || button.classList.contains('active') ? 
					targetBlock.classList.add(cssShowClass) : targetBlock.classList.remove(cssShowClass);
			} else {
				button.checked || button.classList.contains('active') ?
					targetBlock.classList.add(cssHideClass) : targetBlock.classList.remove(cssHideClass);
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
			// console.log(targetBlocks)
			for (let i = 0; i < targetBlocks.length; i++) {
				switch (buttonData.menuType || 'default') {
					case 'scale': showHide( button, targetBlocks[i], action, 'js_showScale', 'js_hideScale' ); break;
					case 'drop-down': dropDown( button, targetBlocks[i], action ); break;
					case 'drop-left': showHide( button, targetBlocks[i], action, 'js_showSlide_left', 'js_hideSlide_left'); break;
					case 'drop-right': showHide( button, targetBlocks[i], action, 'js_showSlide_right', 'js_hideSlide_right'); break;
					case 'show-hide': showHide( button, targetBlocks[i], action, 'js_show', 'js_hide' ); break;

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
				if (buttonData.siblings == 'yes') {
					toggle(targetsReverse, 'hide');
					cleanButtons(targetButtons);
				}
				toggle(thisTarget, 'show');
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
				globFunc.toggleButtonContent(this);
				this.classList.contains('active') ? 
					globFunc.showOverlay("menu", glob.pageOverlay) : 
					globFunc.hideOverlay("menu", glob.pageOverlay);

				toggleContent(this, targetContentData);

			} else {
				globFunc.toggleButtonContent(this);
				toggleContent(this, targetContentData);				
			}

		}
		// console.timeEnd('click toggle working time');
			
	});


})();