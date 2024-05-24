$(document).ready(function() {
  $('#showSuggestionFormBtn').click(function() {
      $('#suggestionForm').slideToggle();
  });

  $('#suggestionFormContent').submit(function(event) {
      event.preventDefault(); // Prevent the form from submitting in the traditional way
      $('#suggestionFormContent').trigger("reset"); // Clear the form inputs
      $('#suggestionForm').hide();
      $('#thankYouMessage').show();
      setTimeout(function() {
          $('#thankYouMessage').fadeOut(); // Hide the thank you message after 5 seconds
      }, 5000); // 5 seconds
  });
});
