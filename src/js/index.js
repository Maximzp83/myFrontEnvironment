let status = "JS - OK!, window load";
console.log(status);

// =include testModule.js



window.onload = function() {
	if ($('body')) {console.log('jQuery OK')}
	console.log(test);

// =================Include Modules==============================

	// // =include frames/ToggleContentModule.js
  // //=include frames/SwitchTabsModule.js
  // //=include frames/PopupModule.js  

// =============================================================

}
	