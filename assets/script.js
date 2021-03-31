// Variables
var key = "oxrPyoy6v3XMn43E8m5y5ZVOEGAmTO52CKOvjV7CckXTDJvpjG";
var secret = "AYuKkVCKqFIYCOxKzBWeihxy7lA7vSOReHMlLC5E";
var dogNames = [];
var listEl = $("#names-list")

// API token fetch to access page

function firstFetch(token) {
  var queryURL = "https://api.petfinder.com/v2/animals?breed=pug";

  fetch(queryURL, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);
    }).catch(function (err) {
      // Log any errors
      console.log("something went wrong", err);
    });
}

// API pet fetch to get data

fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    body: "grant_type=client_credentials&client_id=" +
      key +
      "&client_secret=" +
      secret,
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  })
  .then(function (resp) {
    // Return the response as JSON
    return resp.json();
  })
  .then(function (data) {
    // Log the API data
    console.log("token", data);
    firstFetch(data.access_token);
  })
  .catch(function (err) {
    // Log any errors
    console.log("something went wrong", err);
  });

  // Dog Name Generator 
  
function nameGen() {
  fetch("https://api.fungenerators.com/name/generate?category=dog&limit=50")
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    // console.log(data);
    // console.log(data.contents.names[0]);
    for (var i = 0; i < 5; i++) {
      dogNames.push(data.contents.names[Math.floor(Math.random() * data.contents.names.length)]);
      listEl.append('<li>' + dogNames + '</li>');
    }
    console.log(dogNames);
  })
}
nameGen();
