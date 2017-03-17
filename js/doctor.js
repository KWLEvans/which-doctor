var apiKey = require('./../.env').apiKey;

function Doctor() {

}

Doctor.prototype.searchByCondition = function(condition, callback) {
  var url = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + encodeURI(condition) + "&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&user_key=" + apiKey;

  $.get(url).then(function(response) {
    callback(response);
  }).fail(function(error) {
    callback(error.responseJSON.meta.message);
  });
}

exports.doctorModule = Doctor;
