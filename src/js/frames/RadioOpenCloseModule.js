glob.RadioOpenCloseModule  = (function() {
	// console.log('OpenCloseModule ok');
	// console.time('ToggleContent Module load');

	function hideGroup(groupName, controlClass) {
		var groupBlocks = document.getElementsByClassName(groupName);

		if (groupBlocks.length) {
			for (let i = 0; i < groupBlocks.length; i++) {
				groupBlocks[i].classList.contains(controlClass) ? groupBlocks[i].classList.remove(controlClass) : null;
			}
		}

	}

	function initiate(buttons) {
		var button,
				buttonData,
				target,
				controlClass,
				isGroupChange, currentGroup;
		
		for (var i = 0; i < buttons.length; i++) {
			button = buttons[i],
			buttonData = button.dataset,
			target = document.getElementById(buttonData.target),
			controlClass = buttonData.class;
			isGroupChange = currentGroup === button.name ? false : true;
			currentGroup = button.name;

			if (isGroupChange) {
				hideGroup(currentGroup, controlClass)
			}

			if (button.checked && target) {
				target.classList.contains(controlClass) ? null : target.classList.add(controlClass);
			}			
		}
	
	}

	var allRadioButtons = document.getElementsByClassName('radioButton');

	if (allRadioButtons.length) { initiate(allRadioButtons)}
	// ----Show Content Actions ---------
	$('body').on('click', '.radioButton', function() {
		// console.time('click toggle working time');

		// --------Actions/Events--------
		var button = [];
		button.push(this)
		// globFunc.toggleButtonContent(this);
		initiate(button);				
		// console.timeEnd('click toggle working time');
			
	});


})();