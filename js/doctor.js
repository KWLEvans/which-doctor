var apiKey = require('./../.env').apiKey;

function Doctor() {
  this.skip = 0;
  this.total = 0;
  this.doctors = [];
  this.url = '';
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

//Set the number of results to skip; used for pagination
Doctor.prototype.setSkip = function(newSkip) {
  this.skip = newSkip;
  this.url = this.url.replace(/(.*skip=)(\d+)(\&.*)/, "$1" + newSkip + "$3");
};

Doctor.prototype.searchByCondition = function(condition, callback) {
  var url = "https://api.betterdoctor.com/2016-03-01/doctors?query=" + encodeURI(condition) + "&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=" + this.skip + "&limit=10&sort=best-match-desc&user_key=" + apiKey;
  this.url = url;

  this.search(url, callback);
};

Doctor.prototype.searchByDoctor = function(doctor, callback) {
  var url = "https://api.betterdoctor.com/2016-03-01/doctors?name=" + encodeURI(doctor) + "&location=45.5231%2C-122.6765%2C%205&user_location=45.5231%2C-122.6765&skip=" + this.skip + "&limit=10&sort=best-match-desc&user_key=" + apiKey;
  this.url = url;

  this.search(url, callback);
};

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
  this.total = response.meta.total;
  this.skip = response.meta.skip;
  var results = response.data;
  var doctors = [];

  //Loop to create each doctor object for doctors array
  results.forEach(function(result) {
    var profile = result.profile;

    var name = profile.first_name + " ";
    if (profile.middle_name) {
      name += profile.middle_name + " ";
    }
    name += profile.last_name + " " + profile.title;

    var doctor = {
      "name": name,
      "bio": profile.bio,
      "practices": []
    };

    //Loop to populate practices array for each doctor
    var practices = result.practices;
    practices.forEach(function(practice) {
      var info = {
        "name": practice.name,
        "address": practice.visit_address.street + " " + practice.visit_address.city + ", " + practice.visit_address.state + " " + practice.visit_address.zip,
        "phone": practice.phones[0].number.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'),
        "distance": practice.distance.toFixed(2)
      };

      //Filter out repeated information in doctor practice lists
      var repeat = false;
      doctor.practices.forEach(function(prevPractice) {
        if (prevPractice.address === info.address) {
          repeat = true;
        }
      });

      if (!repeat) {
        doctor.practices.push(info);
      }
    });

    //Sort practices by distance from origin point
    doctor.practices.sort(function(a, b) {
      return a.distance - b.distance;
    });

    doctors.push(doctor);
  });
  this.doctors = doctors;
};


exports.doctorModule = Doctor;
