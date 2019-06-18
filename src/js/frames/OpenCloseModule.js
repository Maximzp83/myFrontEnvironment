glob.OpenCloseModule  = (function() {
	// console.log('OpenCloseModule ok');
	// console.time('ToggleContent Module load');

	function initiate(buttonElement) {
		let button = buttonElement,
				buttonData = button.dataset,
				target = document.getElementById(buttonData.target),
				controlClass = buttonData.class;

		// ------Methods--------
		if (target && controlClass) {

			if (buttonData.action) {
				if (buttonData.action == 'open') {
					globFunc.toggleButtonContent(button);
					target.classList.contains(controlClass) ? null : target.classList.add(controlClass);
				}

				if (buttonData.action == 'close') {
					var thisGroupOpenButtons = document.querySelectorAll('.openButton[data-target="' + buttonData.target + '"]' );
					if (thisGroupOpenButtons.length) {
						for (var i = 0; i < thisGroupOpenButtons.length; i++) {
							thisGroupOpenButtons[i].dataset.action == 'open' ? globFunc.toggleButtonContent(thisGroupOpenButtons[i]) : null;
						}
					}
					target.classList.contains(controlClass) ? target.classList.remove(controlClass) : null;
				}
			}	else { 
				globFunc.toggleButtonContent(button);
				target.classList.toggle(controlClass);
			}
			
		}			
	}

	// ----Show Content Actions ---------
	$('body').on('click', '.openButton', function() {
		// console.time('click toggle working time');

		// --------Actions/Events--------

		// globFunc.toggleButtonContent(this);
		initiate(this);				
		// console.timeEnd('click toggle working time');
			
	});


})();