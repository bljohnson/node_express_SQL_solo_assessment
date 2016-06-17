console.log('script.js is sourced!');

$(document).ready(function() {
  console.log('jQuery is working!');
  $('#add').on('click', function () {
    // assemble an object (always need to do for a post call)
    var animal = $('#animal').val();
    console.log(animal);
    var objectToSend = {
      'animalType': animal,
    }; // end object being sent
    // send object created to the postRoute via an ajax request
    $.ajax({
      type: 'POST',
      url: '/postNewAnimal',
      data: objectToSend
    }); // end ajax request
    $('#animal').empty();
  }); // end add click function
}); // end doc ready function
