console.log('script.js is sourced!');

$(document).ready(function() {
  console.log('jQuery is working!');
  // load current zoo animals to DOM when page is loaded
  $.ajax({
    type: 'GET',
    url: '/getZoo',
    success: function (data) {
    console.log('Got the zoo:' + displayZoo(data));
    } // end success
  }); //end ajax request

  $('#add').on('click', function () {
    event.preventDefault();
    // assemble an object (always need to do for a post call)
    var animal = $('#animal').val();
    console.log('animal type added: ' + animal);
    var objectToSend = {
      'animalType': animal,
    }; // end object being sent
    // send object created to the postRoute via an ajax request
    $.ajax({
      type: 'POST',
      url: '/postNewAnimal',
      data: objectToSend
    }); // end ajax request
    $('#animal').val(''); // empty input field after an animal is added by user
  }); // end add click function

  $('#getZoo').on('click', function () {
    event.preventDefault();
    console.log('clicked to get the zoo');
   $.ajax({
     type: 'GET',
     url: '/getZoo',
     success: function (data) {
       console.log('Got the zoo:' + displayZoo(data));
     } // end success function
   }); //end ajax request
   $('#outputDiv').empty(); // refresh div each time so no duplicates
 }); // end getZoo click function

 function displayZoo (zoo) {
    console.log( 'in displayZoo:' + zoo );
    for (i=0; i<zoo.length; i++) {
      var currentZooInventory = "<p>Animal Type: " + zoo[i].animal_type + ", Quantity: " + zoo[i].quantity + "</p>";
      $('#outputDiv').append(currentZooInventory);
    } // end for loop
  } // end displayZoo function

}); // end doc ready function
