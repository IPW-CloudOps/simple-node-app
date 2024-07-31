$(document).ready(function () {
  $('input[name="link"]').keypress(function(event) {
    if (event.which === 13) { // Enter key code
      event.preventDefault(); // Prevent the default form submission
      createBookmark(); // Call the createBookmark function
    }
  });
})
function createBookmark() {
  const link = $('input[name="link"]').val();
  
  if (!link) {
    alert('Link cannot be empty.');
    return;
  }

  $.ajax({
    url: '/create',
    type: 'POST',
    data: { link: link },
    success: function(_) {
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 400) {
        alert('Bad Request: ' + jqXHR.responseJSON.error);
      } else {
        alert('Error: ' + jqXHR.responseJSON.error || 'Something went wrong.');
      }
    }
  });
}

/**
 * 
 * @param {HTMLElement} el 
 * @returns 
 */
function deleteBookmark(el) {
  const id = el.previousElementSibling?.value;
  
  if (!id) {
    alert('ID cannot be empty.');
    return;
  }

  console.log({id});

  $.ajax({
    url: '/delete',
    type: 'POST',
    data: { id: id },
    success: function(_) {
      location.reload();
    },
    error: function(jqXHR, textStatus, errorThrown) {
      if (jqXHR.status === 404) {
        alert('Not Found: ' + jqXHR.responseJSON.error);
      } else {
        alert('Error: ' + jqXHR.responseJSON.error || 'Something went wrong.');
      }
    }
  });
}