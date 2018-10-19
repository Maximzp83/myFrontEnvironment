glob.TextLimitModule  = (function() {
	console.log('TextLimitModule ok');

	function sliceText(slicingBlocks, maxLength) {
		if (slicingBlocks) {

			for (let i = 0; i < slicingBlocks.length; i++) {
				let currentText = slicingBlocks[i].innerHTML;

				if (currentText.length > maxLength) {
					slicingBlocks[i].innerHTML = currentText.slice(0, maxLength) + ' ...';
				}
			}

		}
	}
	
	return {
		sliceText: sliceText,
	}

})();