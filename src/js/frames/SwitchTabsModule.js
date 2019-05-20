glob.SwitchTabsModule  = (function() {

	const defaultTabsButtons = document.querySelectorAll('.tabsNav .tabButton'),
	defaultTabsBlocksContainer = document.querySelector('.toggleBlocks-list'),
	defaultTabsBlocksList = document.querySelectorAll('.toggleBlock');


	function switchTabs(tabButton, tabsBlocks, tabButtons) {
		let target = tabButton.dataset.target;

		if ( !tabButton.classList.contains('active') ) {
			for (let i = 0; i < tabsBlocks.length; i++) {
				tabButtons[i].classList.remove('active');
				tabsBlocks[i].classList.remove('active');

				if (target === tabsBlocks[i].id) {
					tabButton.classList.add('active'); 
					tabsBlocks[i].classList.add('active'); 
				} 

			}
		}
	}

  // ---events---

  $('.tabsNav').on('click', '.tabButton', function() {
  		var tabsGroup = document.getElementsByClassName(this.dataset.tabsGroup)
  		var tabButtons = this.parentElement.getElementsByClassName('tabButton')
  		var tabsBlocksContainer = this.parentElement.parentElement.getElementsByClassName(this.dataset.tabsContainer)[0]

  		// console.log(tabButtons)
  		// console.log(tabsBlocksContainer)
  		if (tabsGroup.length) {	switchTabs(this, tabsGroup, tabButtons);}
  		else { switchTabs(this, defaultTabsBlocksList, tabButtons);	}

  		if (tabsBlocksContainer) {globFunc.animateBlock(tabsBlocksContainer);}
  		else {globFunc.animateBlock(defaultTabsBlocksContainer);}	  		
  })


})();