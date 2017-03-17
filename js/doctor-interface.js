var Doctor = require('./../js/doctor.js').doctorModule;

function logResults(results) {
  console.log(results);
}

function printResults(results) {
  if (results) {
    var htmlString = "<h2>Your results</h2>";
    results.doctors.forEach(function(doctor) {
      var divString = "<div class='result'><div class='container'>";
      divString += "<h4>" + doctor.name + "</h4>";
      divString += "<span class='bio-link'>About this doctor</span><ul>";
      divString += "<li class='bio'>" + doctor.bio + "</li></ul>";
      divString += "<h5>Practices:</h5><ul>";
      doctor.practices.forEach(function(practice) {
        divString += "<li>" + practice.name + "<ul><li>Address: " + practice.address + "</li><li>Phone: " + practice.phone + "</li><li>Distance: " + practice.distance + " miles away</li></ul></li>";
      });
      divString += "</ul></div></div>";
      htmlString += divString;
    });

    $("#results").html(htmlString);

    $(".bio-link").click(function() {
      $(this).next().children().toggle();
    });
  } else {
    $("#results").html("<h5>No results found</h5>");
  }
}

$(function() {
  $("#condition-tab, #doctor-tab").click(function() {
    if ($(this).attr('class') !== 'active') {
      $(this).addClass('active');
      $(this).siblings().removeClass('active');
      $(this).parent().siblings('form').toggle();
    }
  });

  $("#condition-form").submit(function(event) {
    event.preventDefault();

    var condition = $("#condition-search").val();
    var doctor = new Doctor();
    doctor.searchByCondition(condition, printResults);
  });

  $("#doctor-form").submit(function(event) {
    event.preventDefault();

    var name = $("#doctor-search").val();
    var doctor = new Doctor();
    doctor.searchByDoctor(name, printResults);
  });
});
