document.addEventListener('DOMContentLoaded', function() {
  console.log("Script loaded — hamburger should work now");

  // Hamburger Menu
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');

  if (hamburger && nav) {
    console.log("Found hamburger and nav — attaching click listener");

    hamburger.addEventListener('click', function(e) {
      e.stopPropagation();
      nav.classList.toggle('open');
      hamburger.textContent = nav.classList.contains('open') ? '✕' : '☰';
      console.log("Menu toggled — open:", nav.classList.contains('open'));
    });

    // Close menu when clicking links
    nav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        nav.classList.remove('open');
        hamburger.textContent = '☰';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!nav.contains(e.target) && !hamburger.contains(e.target)) {
        nav.classList.remove('open');
        hamburger.textContent = '☰';
      }
    });
  } else {
    console.warn("Hamburger or nav not found in DOM");
  }

  // Service Image Rotator (homepage only)
  const serviceImages = document.querySelectorAll('#serviceImageStack img');
  const serviceItems = document.querySelectorAll('.service-item');

  if (serviceImages.length && serviceItems.length) {
    let current = 0;
    let interval;

    function showImage(index) {
      serviceImages.forEach((img, i) => img.classList.toggle('active', i === index));
    }

    function startRotation() {
      interval = setInterval(() => {
        current = (current + 1) % serviceImages.length;
        showImage(current);
      }, 4500);
    }

    function stopRotation() {
      clearInterval(interval);
    }

    serviceItems.forEach((item, index) => {
      item.addEventListener('mouseenter', () => {
        stopRotation();
        current = index;
        showImage(index);
      });

      item.addEventListener('mouseleave', startRotation);
    });

    showImage(0);
    startRotation();
  }
});