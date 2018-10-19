glob.AnimateBorder = function (animatedBlocks, optionsObj) {

	var animatedDashBlocks = animatedBlocks;
	var options = optionsObj;

	// console.log(options.shadedSection);
	// ---------- Methods --------

	function getTotalLength(parentBlock, rect) {
		// var radius = +rect.getAttribute('rx');
		var length = 0;
		var rectWidth = parentBlock.getBoundingClientRect().width - (options.borderWidth * 2);
		var rectHeight = parentBlock.getBoundingClientRect().height - (options.borderWidth * 2);
		var radius = options.radius ? rectHeight / 2 : null;
		// console.log(parentBlock.getBoundingClientRect().width)
		if (radius) {
			return {
				length: +( (rectWidth - radius*2) * 2 ) + ( 2*3.14 * radius ),
				radius: radius
			} 
		} else {
			return {
				length: +( rectWidth + rectHeight ) * 2
			}
		}
	}

	function getDashArrayString(rect, rectLength) {
		var dashTotalLength = options.shadedSection + options.transparentSection;

		var dashQuantity = Math.round( rectLength / dashTotalLength )
		var difference = ( dashTotalLength*dashQuantity - rectLength ) / dashQuantity;
		
		difference = ( Math.round(difference * 10) / 10 ) / 2;

		options.newShadedSection = options.shadedSection - difference;
		options.newTransparentSection = options.transparentSection - difference;

		return options.newShadedSection + ' ' + options.newTransparentSection;
	}

	function cycleOffset(event, animatedBlock, dashArraySumNumber) {
	  if ( event.propertyName == 'stroke-dashoffset' ) {
	  	// console.log('stroke-dashoffset')
	  	animatedBlock.classList.add('js_resetTransition');
	  	animatedBlock.setAttribute('stroke-dashoffset', 0);
	  	
	  	setTimeout(function() {
	  		animatedBlock.classList.remove('js_resetTransition');
	  		animatedBlock.setAttribute('stroke-dashoffset', dashArraySumNumber)			
	  	}, 10)
	  }
	}

	var eventHandler = function(event) {
		// console.log('event: ')
		event.stopPropagation();
		cycleOffset(event, this, this.dataset.dashArraySum)
	}

	// ---------- Action --------

	if (animatedDashBlocks.length) {

		var init = function() {
			for (var i = 0; i < animatedDashBlocks.length; i++) {
				var rect = animatedDashBlocks[i].querySelector('rect.animatedBlock');
				var totalLength = 0, resultDashArrayString = '', dashArraySum = 0, radius = 0;
				
				rect.removeEventListener("transitionend", eventHandler);

				totalLength = getTotalLength( animatedDashBlocks[i], rect );
				radius = totalLength.radius;
				// console.log(totalLength.length)
				resultDashArrayString = getDashArrayString(rect, totalLength.length);
				dashArraySum = Math.round( options.newShadedSection + options.newTransparentSection );
				dashArraySum = options.reverse ? dashArraySum : dashArraySum * -1;

				rect.setAttribute('stroke-width', options.borderWidth);
				radius ? rect.setAttribute('rx', radius) : null;
				rect.setAttribute('stroke-dasharray', resultDashArrayString);
				rect.setAttribute('stroke-dashoffset', dashArraySum*2);
				rect.setAttribute('data-dashArraySum', dashArraySum*2);

				rect.addEventListener("transitionend", eventHandler);
			}
		}

		init();

		// -------------------------

		var timer = null;
		window.onresize = function(event) {
		  if (timer) { clearTimeout(timer); }

		  timer = setTimeout(function() {
		    timer = null;

		    // your event handling logic here
		    // console.log('resize')
		    init()

		  }, 50);
		};

	}

}

