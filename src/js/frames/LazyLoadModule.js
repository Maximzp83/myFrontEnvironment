glob.LazyLoadModule  = (function() {
	var lazyBlocks = []

	function init(selector) {
		setLazy(selector);
		lazyLoad(lazyBlocks);
	}

	function setLazy(classSelector){
		// console.log(selector)
		lazyBlocks = document.getElementsByClassName(classSelector);
			// cl(lazyBlocks.length)
		if (lazyBlocks.length) {
			for (var i = 0; i < lazyBlocks.length; i++) {
				if (!lazyBlocks[i].getAttribute('has-preloader')) {
					var preloader = document.createElement('div');
					preloader.className = 'imgPreloader';
					preloader.innerHTML = '<img src="/img/icons/lazy_preloader.jpg" alt="loader">'
					lazyBlocks[i].parentElement.appendChild(preloader);
					lazyBlocks[i].setAttribute('has-preloader', true);
				}
			}
		}
    // console.log('Found ' + lazyBlocks.length + ' lazy images');
	}

	function loaded(el) {
    // el.removeAttribute('data-src');
    // el.classList.remove('lazyBlock');
		let loader = el.parentElement.getElementsByClassName('imgPreloader')[0];
		if (loader) $(loader).fadeOut();
		// cleanLazy()
	}

	function loadImage(element) {
		if( isInViewport(element) ) {
      element.setAttribute('isLoading', true);

			if (element.tagName !== 'IMG') {
				var img = new Image();
				var srcData = element.getAttribute('data-src');
				if (srcData) { 
					img.onload = function(){
					  element.style.backgroundImage = 'url(' + img.getAttribute('src') + ')';
					  loaded(element);
					};

					// element.removeAttribute('data-src');
					img.setAttribute('src', srcData); 
				}
			} else {
				var srcData = element.getAttribute('data-src');
				if (srcData){
					element.onload = function(){
					  loaded(element);
					};

					element.setAttribute('src', srcData); 
					// element.removeAttribute('data-src');
				}
			}
		}
	}

	function lazyLoad(lazyBlocks) {
		// if (lazyBlocks.length) {
			let lazyB = lazyBlocks;
			for (let i = 0; i < lazyB.length; i++) {
				var isLoading = lazyB[i].getAttribute('isLoading');
				if ( isLoading != 'true' ) {
					loadImage(lazyB[i]);
				} else {
					cleanLazy()
				}
			}
			// cleanLazy()
		// }
	}

	function cleanLazy(){
		if (lazyBlocks.length) {
			lazyBlocks =  Array.prototype.filter.call(lazyBlocks, function(l){ return l.getAttribute('isLoading') != 'true';});
		}
	    // cl(lazyBlocks.length)
	}


	function isInViewport(el){
    var rect = el.getBoundingClientRect();
    
    return (
        rect.bottom >= 0 && 
        // rect.right >= 0 && 
        rect.top <= (window.innerHeight || document.documentElement.clientHeight)
        // rect.left <= (window.innerWidth || document.documentElement.clientWidth)
    );
	}

	var timer = null;
	$(window).scroll(function () {
		if (timer) { clearTimeout(timer); }

	  timer = setTimeout(function() {
    	timer = null;
	    
	    // setLazy();
	    // cl(lazyBlocks.length)
	    if (lazyBlocks.length) { lazyLoad(lazyBlocks); }

	  }, 50);
	})

	// ------------

	return {
	  initLazy: init,
	  // lazyLoad: lazyLoad,
	}


})();