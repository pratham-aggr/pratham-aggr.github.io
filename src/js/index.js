    // Simple navigation functionality
    document.addEventListener('DOMContentLoaded', function() {
      const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
      const navLinks = document.querySelector('.nav-links');
      
      if (mobileMenuBtn) {
        mobileMenuBtn.addEventListener('click', function() {
          navLinks.classList.toggle('active');
        });
      }
      
      // Smooth scrolling for navigation links
      const links = document.querySelectorAll('a[href^="#"]');
      
      links.forEach(link => {
        link.addEventListener('click', function(e) {
          e.preventDefault();
          
          const targetId = this.getAttribute('href');
          if (targetId === '#') return;
          
          const targetElement = document.querySelector(targetId);
          
          if (targetElement) {
            window.scrollTo({
              top: targetElement.offsetTop - 80,
              behavior: 'smooth'
            });
            
            // Close mobile menu if open
            navLinks.classList.remove('active');
            
            // Update active nav link
            document.querySelectorAll('.nav-links a').forEach(navLink => {
              navLink.classList.remove('active');
            });
            this.classList.add('active');
          }
        });
      });
      
      // Update active nav link on scroll
      window.addEventListener('scroll', function() {
        const sections = document.querySelectorAll('section');
        const navLinks = document.querySelectorAll('.nav-links a');
        
        let current = '';
        
        sections.forEach(section => {
          const sectionTop = section.offsetTop - 100;
          const sectionHeight = section.clientHeight;
          
          if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            current = '#' + section.getAttribute('id');
          }
        });
        
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === current) {
            link.classList.add('active');
          }
        });
      });
    });