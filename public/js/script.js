document.addEventListener('DOMContentLoaded', function() {
  // Select all elements with the class 'searchBtn'
  const allButtons = document.querySelectorAll('.searchBtn');
  // Select the search bar container
  const searchBar = document.querySelector('.searchBar');
  // Select the search input field
  const searchInput = document.getElementById('searchInput');
  // Select the search close button
  const searchClose = document.getElementById('searchClose');

  // Iterate over all search buttons and add a click event listener to each
  for (var i = 0; i < allButtons.length; i++) {
      allButtons[i].addEventListener('click', function() {
          // Make the search bar visible
          searchBar.style.visibility = 'visible';
          // Add the 'open' class to the search bar
          searchBar.classList.add('open');
          // Set the 'aria-expanded' attribute to 'true' for accessibility
          this.setAttribute('aria-expanded', 'true');
          // Focus the search input field
          searchInput.focus();
      });
  }

  // Add a click event listener to the search close button
  searchClose.addEventListener('click', function() {
      // Hide the search bar
      searchBar.style.visibility = 'hidden';
      // Remove the 'open' class from the search bar
      searchBar.classList.remove('open');
      // Set the 'aria-expanded' attribute to 'false' for accessibility
      this.setAttribute('aria-expanded', 'false');
  });
});
