var Doctor = require('./../js/doctor.js').doctorModule;

function logResults(results) {
  console.log(results);
}

function printResults(results) {
  if (results) {

    //Build list of results
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

    //Create pagination if results > 10
    var pages = Math.ceil(results.total/10);
    if (pages > 1) {
      var pagination = "<hr><nav class='text-center'><ul class='pagination'><li><a aria-label='previous'><span aria-hidden='true'>&laquo;</span></a></li>";
      for (var i = 1; i <= pages; i++) {
        if (i === (results.skip/10 + 1)) {
          pagination += "<li class='active'><a>" + i + "</a></li>";
        } else {
          pagination += "<li><a>" + i + "</a></li>";
        }
      }
      pagination += "<li><a aria-label='Next'><span aria-hidden='true'>&raquo;</span></a></li></ul></nav>"
      htmlString += pagination;
    }

    $("#results").html(htmlString);

    //Add toggle for doctor bios
    $(".bio-link").click(function() {
      $(this).next().children().toggle();
    });

    //Add pagination navigation through re-initializing search with new skip data
    $(".pagination li").click(function() {
      if ($(this).children().attr('aria-label')) {
        if ($(this).children().attr('aria-label') === 'previous' && results.skip > 0) {
          results.setSkip(results.skip - 10);
          results.search(results.url, printResults);
        } else if (results.total/(results.skip + 10) > 1){
          results.setSkip(results.skip + 10);
          results.search(results.url, printResults);
        }
      } else {
        var skip = (parseInt($(this).children().first().text()) * 10) - 10;
        results.setSkip(skip);
        results.search(results.url, printResults);
      }
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
