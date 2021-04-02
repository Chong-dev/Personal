const btnHamburger = document.querySelector('#btnHamburger');
const body = document.querySelector('body');
const header = document.querySelector('.header');
const overlay = document.querySelector('.overlay');
const fadeElems = document.querySelectorAll('.has-fade');

btnHamburger.addEventListener('click', function() { // Toggle Hamburger Menu

  if (header.classList.contains('open')) {  //  Toggle Close
      body.classList.remove('.no-scroll');
      header.classList.remove('open');

      fadeElems.forEach(function(element) {
        element.classList.remove('fade-in');
        element.classList.add('fade-out');
      });

  }

  else {  //  Toggle Open
    body.classList.add('.no-scroll');
    header.classList.add('open');

    fadeElems.forEach(function(element) {
      element.classList.remove('fade-out');
      element.classList.add('fade-in');
    });
  }
});