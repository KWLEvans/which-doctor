var Doctor = require('./../js/doctor.js').doctorModule;

function logResults(results) {
  console.log(results);
}

$(function() {
  $("#search-form").submit(function(event) {
    event.preventDefault();

    var condition = $("#condition-search").val();
    console.log(condition);
    var doctor = new Doctor;
    doctor.searchByCondition(condition, logResults);
  });
});
