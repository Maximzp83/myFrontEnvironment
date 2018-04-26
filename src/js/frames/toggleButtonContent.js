function toggleButtonContent(buttonElement, text) {
		let buttonActive = buttonElement.classList.contains('active');

		if (buttonActive) {
			text ? buttonElement.firstElementChild.innerHTML = text.default : null;
			buttonElement.classList.remove('active');

		} else {
			text ? buttonElement.firstElementChild.innerHTML = text.active : null;
			buttonElement.classList.add('active');
		}
	}