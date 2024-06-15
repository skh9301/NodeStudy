document.addEventListener('DOMContentLoaded', function() {
    var currentPage = 1;
    var pages = document.querySelectorAll('.page');
  
    function showPage(pageNum) {
      for (var i = 0; i < pages.length; i++) {
        if (i === pageNum - 1) {
          pages[i].classList.remove('left', 'right');
        } else if (i < pageNum - 1) {
          pages[i].classList.add('left');
        } else {
          pages[i].classList.add('right');
        }
      }
    }
  
    showPage(currentPage);
  
    document.querySelector('.next').addEventListener('click', function() {
      if (currentPage < pages.length) {
        currentPage++;
        showPage(currentPage);
      }
    });
  
    document.querySelector('.prev').addEventListener('click', function() {
      if (currentPage > 1) {
        currentPage--;
        showPage(currentPage);
      }
    });
  });
  