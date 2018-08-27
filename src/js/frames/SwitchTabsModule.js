var SwitchTabsModule  = (function() {
	console.log('SwitchTabsModule ok');

		const tabsButtons = document.querySelectorAll('.tabsNav .tab'),
		tabsBlocksList = document.querySelectorAll('.toggleBlock');

		function switchTabs(tabButton, tabsBlocks) {
			let target = tabButton.dataset.target;

			if ( !tabButton.classList.contains('active') ) {
				for (let i = 0; i < tabsBlocks.length; i++) {
					tabsButtons[i].classList.remove('active');
					tabsBlocks[i].classList.remove('active');

					if (target === tabsBlocks[i].id) {
						tabButton.classList.add('active'); 
						tabsBlocks[i].classList.add('active'); 
					} 

				}
			}
		}

	  // ---events---

	  for (let i = 0; i < tabsButtons.length; i++) {
	  	tabsButtons[i].onclick = function () {
	  		switchTabs(this, tabsBlocksList);
	  	}
	  }

  })();