'use strict';

const contentA = document.getElementById('contentA');
const containerB = document.getElementById('containerB');
const pageTitle = document.getElementById('pageTitle');

// 📌 nav menu hover

const navHint = document.getElementById('navHint');
const navIconList = document.getElementsByClassName('navIcon');

for (let icon of navIconList) {
  icon.addEventListener('mouseenter', () => {
    switch (icon.id) {
      case 'latestMoods':
        navHint.innerText = 'mood/TODAY';
        break;
      case 'allMoods':
        navHint.innerText = 'mood/ALL';
        break;
      case 'newMood':
        navHint.innerText = 'mood/NEW';
    }
  });

  icon.addEventListener('mouseleave', () => {
    navHint.innerText = '';
  });
}
