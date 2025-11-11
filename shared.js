(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.style.setProperty('--theme-applied', 'true');
    document.body.classList.add('light-theme');
  }
})();

(function() {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    document.documentElement.classList.add('theme-loaded');
    document.body.classList.add('light-theme');
  }
})();


const themeToggle = document.getElementById('appearanceSwitch');
if (themeToggle) {
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme === 'light') {
    themeToggle.classList.add('active');
  }
  
  themeToggle.addEventListener('click', function(e) {
    e.stopPropagation();
    this.classList.toggle('active');
    document.body.classList.toggle('light-theme');
    
    if (document.body.classList.contains('light-theme')) {
      localStorage.setItem('theme', 'light');
    } else {
      localStorage.setItem('theme', 'dark');
    }
  });
}


const navActions = document.querySelector('.nav-actions');
const portfolioTrigger = document.getElementById('portfolioTrigger');
const portfolioFlyout = document.getElementById('portfolioFlyout');
const settingsBtn = document.getElementById('settingsDropdown');
const settingsDropdown = document.querySelector('.dropdown-menu[aria-labelledby="settingsDropdown"]');

const HORIZONTAL_OFFSET_PX = 16;
const VERTICAL_OFFSET_PX = -2;


function positionPortfolioFlyout() {
  if (!portfolioTrigger || !portfolioFlyout) return;
  
  const navRect = navActions.getBoundingClientRect();
  const trigRect = portfolioTrigger.getBoundingClientRect();
  
  if (window.innerWidth <= 991) {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    const scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
    
    portfolioFlyout.style.position = 'fixed';
    portfolioFlyout.style.top = (trigRect.bottom + scrollTop + VERTICAL_OFFSET_PX) + 'px';
    portfolioFlyout.style.left = (trigRect.left + scrollLeft + HORIZONTAL_OFFSET_PX) + 'px';
    portfolioFlyout.style.right = 'auto';
  } else {
    portfolioFlyout.style.position = 'absolute';
    const top = (trigRect.bottom - navRect.top) + VERTICAL_OFFSET_PX;
    const left = (trigRect.left - navRect.left) + HORIZONTAL_OFFSET_PX;
    
    portfolioFlyout.style.top = top + 'px';
    portfolioFlyout.style.left = left + 'px';
    portfolioFlyout.style.right = 'auto';
  }
}

function positionSettingsDropdown() {
  if (window.innerWidth <= 991 && settingsBtn && settingsDropdown) {
    const btnRect = settingsBtn.getBoundingClientRect();
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    settingsDropdown.style.position = 'fixed';
    settingsDropdown.style.top = (btnRect.bottom + scrollTop + 5) + 'px';
    settingsDropdown.style.right = (window.innerWidth - btnRect.right) + 'px';
    settingsDropdown.style.left = 'auto';
  }
}

function hidePortfolioFlyout() {
  if (portfolioFlyout) portfolioFlyout.classList.remove('show');
}

function hideSettingsDropdown() {
  if (settingsBtn) {
    const inst = bootstrap.Dropdown.getInstance(settingsBtn);
    if (inst) inst.hide();
  }
}


if (settingsBtn) {
  settingsBtn.addEventListener('click', function(e) {
    e.stopPropagation();
    hidePortfolioFlyout();
    
    if (window.innerWidth <= 991) {
      setTimeout(() => positionSettingsDropdown(), 10);
    }
  });
}

if (settingsDropdown) {
  settingsDropdown.addEventListener('show.bs.dropdown', function() {
    if (window.innerWidth <= 991) {
      positionSettingsDropdown();
    }
  });
}

if (portfolioTrigger) {
  portfolioTrigger.addEventListener('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    hideSettingsDropdown();
    positionPortfolioFlyout();
    portfolioFlyout.classList.toggle('show');
  });
}


const navLinks = document.querySelectorAll('.navbar-nav .nav-link');
navLinks.forEach(link => {
  link.addEventListener('touchstart', function() {
    this.style.color = '#553C9A';
  });
  
  link.addEventListener('touchend', function() {
    setTimeout(() => {
      if (!this.classList.contains('active')) {
        if (document.body.classList.contains('light-theme')) {
          this.style.color = '';
        } else {
          this.style.color = '';
        }
      }
    }, 300);
  });
  
  link.addEventListener('click', function(e) {
    if (window.innerWidth <= 991) {
      this.classList.toggle('active');
      setTimeout(() => {
        if (!this.matches(':hover')) {
          this.classList.remove('active');
        }
      }, 500);
    }
  });
});


window.addEventListener('resize', () => {
  if (portfolioFlyout && portfolioFlyout.classList.contains('show')) {
    positionPortfolioFlyout();
  }
  if (settingsDropdown && settingsDropdown.classList.contains('show')) {
    positionSettingsDropdown();
  }
});

window.addEventListener('scroll', () => {
  if (portfolioFlyout && portfolioFlyout.classList.contains('show')) {
    positionPortfolioFlyout();
  }
  if (settingsDropdown && settingsDropdown.classList.contains('show')) {
    positionSettingsDropdown();
  }
}, true);


document.addEventListener('click', function(e) {
  if (portfolioFlyout && !portfolioFlyout.contains(e.target) && e.target !== portfolioTrigger) {
    hidePortfolioFlyout();
  }
  
  navLinks.forEach(link => {
    if (e.target !== link && !link.contains(e.target)) {
      link.classList.remove('active');
    }
  });
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    hidePortfolioFlyout();
    hideSettingsDropdown();
    navLinks.forEach(link => link.classList.remove('active'));
  }
});


const portfolioItems = portfolioFlyout ? portfolioFlyout.querySelectorAll('.dropdown-item-simple') : [];
portfolioItems.forEach(item => {
  item.addEventListener('click', function(e) {
    e.stopPropagation();
  });
});