var apiKey = require('./../.env').apiKey;

function Doctor() {
  this.doctors = [];
}

// Doctor.doctors is an array of objects structured as follows
// doctor = {
//   name: string,
//   bio: string,
//   practices: [array of objects ordered by distance with practice = {
//     name: string,
//     address: string,
//     phone: string,
//     distance: float
//   }]
// }

Doctor.prototype.searchByCondition = function(condition, callback) {
  var url = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + encodeURI(condition) + "&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&sort=best-match-asc&user_key=" + apiKey;

  this.search(url, callback);
};

Doctor.prototype.searchByDoctor = function(doctor, callback) {
  var url = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + encodeURI(doctor) + "&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=0&limit=20&sort=best-match-desc&user_key=" + apiKey;

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
      alert("Error: " + error.responseJSON.meta.message);
    });
};

Doctor.prototype.parseResponse = function(response, callback) {
  var results = response.data;
  var doctors = [];
  results.forEach(function(result) {
    var profile = result.profile;
    var doctor = {
      "name": profile.first_name + " " + profile.middle_name + " " + profile.last_name + " " + profile.title,
      "bio": profile.bio,
      "practices": []
    };

    var practices = result.practices;
    practices.forEach(function(practice) {
      var info = {
        "name": practice.name,
        "address": practice.visit_address.street + " " + practice.visit_address.city + ", " + practice.visit_address.state + " " + practice.visit_address.zip,
        "phone": practice.phones[0].number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'),
        "distance": practice.distance.toFixed(2)
      };
      doctor.practices.push(info);
    });

    doctor.practices.sort(function(a, b) {
      return a.distance - b.distance;
    });

    doctors.push(doctor);
  });
  this.doctors = doctors;
};


exports.doctorModule = Doctor;
