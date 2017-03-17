var apiKey = require('./../.env').apiKey;

function Doctor() {
  this.doctors = [];
}

Doctor.prototype.searchByCondition = function(condition, callback) {
  var url = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + encodeURI(condition) + "&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&sort=distance-asc&user_key=" + apiKey;

  this.search(url, callback);
}

Doctor.prototype.search = function(url, callback) {
  var that = this;

  $.get(url)

    .then(function(response) {
      that.parseResponse(response, callback);
    })

    .then(function() {
      callback(that);
    })

    .fail(function(error) {
      callback(error.responseJSON.meta.message);
    });
}

Doctor.prototype.parseResponse = function(response, callback) {
  var results = response.data;
  var doctors = [];
  results.forEach(function(result) {
    var profile = result.profile;
    var doctor = {
      "name": profile.first_name + " " + profile.last_name + " " + profile.title,
      "bio": profile.bio,
      "practices": []
    }

    var practices = result.practices;
    practices.forEach(function(practice) {
      var info = {
        "name": practice.name,
        "address": practice.visit_address.street + " " + practice.visit_address.city + ", " + practice.visit_address.state + " " + practice.visit_address.zip,
        "distance": practice.distance
      }
      doctor.practices.push(info);
    });

    doctors.push(doctor);
  });
  this.doctors = doctors;
}


exports.doctorModule = Doctor;
