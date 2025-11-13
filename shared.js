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

// toggle switch
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

// Touch feedback nav links
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


document.addEventListener('click', function(e) {
  navLinks.forEach(link => {
    if (e.target !== link && !link.contains(e.target)) {
      link.classList.remove('active');
    }
  });
});

document.addEventListener('keydown', function(e) {
  if (e.key === 'Escape') {
    navLinks.forEach(link => link.classList.remove('active'));
  }
});