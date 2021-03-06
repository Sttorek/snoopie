$(document).ready(function () {
  // Arrays ------------------------------------------------------------------------------
  var dogQuotesArray = [
      {
        quote:
          "“The dog is a gentleman; I hope to go to his heaven, not man’s”",
        author: "~ Mark Twain",
      },

      {
        quote: "'Every dog must have his day.'",
        author: "~ Jonathan Swift",
      },

      {
        quote: "'A lot of shelter dogs are mutts like me.'",
        author: "~ Barack Obama",
      },

      {
        quote:
          "'What do dogs do on their day off? Can't lie around - that's their job.'",
        author: "~ George Carlin",
      },

      {
        quote: "'Happiness is a warm puppy.'",
        author: "~ Charles Shultz",
      },

      {
        quote:
          "'All his life he tried to be a good person. Many times, however, he failed. For after all, he was only human. He wasn't a dog.",
        author: "~ Charles Shultz",
      },

      {
        quote:
          "'Everyone thinks they have the best dog. And none of them are wrong.",
        author: "~ W.R. Purche",
      },

      {
        quote:
          "'A dog is the only thing on Earth that loves you more than he loves himself.",
        author: "~ Josh Billings",
      },
    ],
  print1 = $("#print1");
  print2 = $("#print2");
  print3 = $("#print3");
  print4 = $("#print4");
  print5 = $("#print5");
  print6 = $("#print6");

  //Dom Variables------------------------------------------------------------------------

  key = "oxrPyoy6v3XMn43E8m5y5ZVOEGAmTO52CKOvjV7CckXTDJvpjG";
  var secret = "AYuKkVCKqFIYCOxKzBWeihxy7lA7vSOReHMlLC5E";
  var token;
  var listEl = $("#names-list");
  var nameBtn = $("#nameBtn");

  // Quiz Variables - Green
  var questionsEl = $("#questions");
  var startBtn = $("#startBtn");
  var zipcodeEl = $("#zipcode");

  var zipcodeInput;

  // JavaScript Variables ---------------------------------------------------------------
  var dogNames = [];
  var dogQuotes = [];
  var currentIndex = 0;
  dogSizeEl = [];
  petDanderEl = [];

  i = 0;

  var questionsArray = [
    {
      // would measure user's energy level
      title: "How active would you describe your lifestyle?",
      choices: ["low", "moderate", "high"],
    },
    {
      // would measure user's dog size
      title: "What kind of home do you live in?",
      choices: ["apartment", "house", "loft", "farmhouse"],
    },
    {
      // would measure user's affection needs
      title: "How dependent would you say you are to other people or things?",
      choices: ["low", "moderate", "high"],
    },
    {
      // would measure user's dog dander
      title: "How clean would you say you are?",
      choices: ["dirty", "clean once a week", "OCD"],
    },
    {
      // would measure user's dog dander
      title: "Are you sensitive to dander?",
      choices: ["Yes", "No"],
    },
  ];

  // API token fetch to access page-----------------------------------------------

  var pawPrints = [
    $("#print1"),
    $("#print2"),
    $("#print3"),
    $("#print4"),
    $("#print5"),
    $("#print6"),
  ];

  function startImageTransition() {
    var i = 0;
    countdown = setInterval(function () {
      console.log(pawPrints[i]);
      if (i <= 5) {
        pawPrints[i].removeClass("hide");
        i++;
        console.log(i);
      } else clearInterval(countdown);
      return;
    }, 750);
  }
  startImageTransition();

  // API token fetch to access page-----------------------------------------------------

  function firstFetch(token, zipcode, dogSizeEl) {
    console.log(petDanderEl);
    if (petDanderEl == "allergic") {
      queryURL =
        "https://api.petfinder.com/v2/animals?distance=50&location=" +
        zipcode +
        "&size=" +
        dogSizeEl +
        "&species=dog&type=dog&species=dog&type=dog&breed=bedlington-terrier,poodle,shih-tzu,yorkshire-terrier,bichon-frise,chinese-crested-dog,affenpinscher,basenji";
    } else {
      queryURL =
        "https://api.petfinder.com/v2/animals?distance=50&location=" +
        zipcode +
        "&size=" +
        dogSizeEl +
        "&species=dog&type=dog";
    }
    console.log(queryURL);
    fetch(queryURL, {
      headers: {
        Authorization: "Bearer " + token,
      },
    })
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        // console.log(data);
        renderResults(data.animals);
        var animalsAndZipcode = data.animals.filter(function (animal) {
          //returns a boolean
          return animal.contact.address.postcode === zipcodeInput;
        });
        var animalsZipcodeSpecies = data.animals.filter(function (animal) {
          return animal.species === "Dog";
        });

        // console.log(animalsAndZipcode);
        // console.log(animalsZipcodeSpecies);
        // var zipcodeKey = data.animals[0].contact.address.postcode;
        // console.log(zipcodeKey);
      })
      .catch(function (err) {
        // Log any errors
        // console.log("something went wrong", err);
      });
    return;
  }

  // Display Dog Information ----------------------------------------------------------

  //save results in localstorage then run renderResults
  function renderResults(data) {
    console.log(data);
    for (var i = 0; i < 1; i++) {
      dogOne = Math.floor(Math.random() * data.length);
      dogTwo = Math.floor(Math.random() * data.length);
      dogThree = Math.floor(Math.random() * data.length);
      dogFour = Math.floor(Math.random() * data.length);
      console.log(dogOne);
      console.log(dogTwo);
      console.log(dogThree);
      console.log(dogFour);

    };

    $("#name1").text(data[dogOne].name);
    $("#name2").text(data[dogTwo].name);
    $("#name3").text(data[dogThree].name);
    $("#name4").text(data[dogFour].name);

    $("#location1").text(
      data[dogOne].contact.address.address1 + " " +
        data[dogOne].contact.address.city + "," +
        data[dogOne].contact.address.state + " " 
    );
    $("#location2").text(
      data[dogTwo].contact.address.address1 + " " +
        data[dogTwo].contact.address.city + "," +
        data[dogTwo].contact.address.state + " " 
    );
    $("#location3").text(
      data[dogThree].contact.address.address1 + " " +
        data[dogThree].contact.address.city + "," +
        data[dogThree].contact.address.state + " " 
    );
    $("#location4").text(
      data[dogFour].contact.address.address1 + " " +
        data[dogFour].contact.address.city + "," +
        data[dogFour].contact.address.state + " " 
    );

    $("#breed1").text(data[dogOne].breeds.primary);
    $("#breed2").text(data[dogTwo].breeds.primary);
    $("#breed3").text(data[dogThree].breeds.primary);
    $("#breed4").text(data[dogFour].breeds.primary);

    $("#contact1").text(data[dogOne].contact.phone +  " " + data[dogOne].contact.email);
    $("#contact2").text(data[dogTwo].contact.phone + " " + data[dogTwo].contact.email);
    $("#contact3").text(data[dogThree].contact.phone + " " + data[dogThree].contact.email);
    $("#contact4").text(data[dogFour].contact.phone + " " + data[dogFour].contact.email);

    var img1 = $("<img></img>");
    img1.attr({
      src: data[dogOne].primary_photo_cropped.small,
      width: 200,
      height: 200,
    });
    var img2 = $("<img></img>");
    img2.attr({
      src: data[dogTwo].primary_photo_cropped.small,
      width: 200,
      height: 200,
    });
    var img3 = $("<img></img>");
    img3.attr({
      src: data[dogThree].primary_photo_cropped.small,
      width: 200,
      height: 200,
    });
    var img4 = $("<img></img>");
    img4.attr({
      src: data[dogFour].primary_photo_cropped.small,
      width: 200,
      height: 200,
    });
    // }
    $("#result1").append(img1);
    $("#result2").append(img2);
    $("#result3").append(img3);
    $("#result4").append(img4);
  }

  // API pet fetch to get data

  fetch("https://api.petfinder.com/v2/oauth2/token", {
    method: "POST",
    body:
      "grant_type=client_credentials&client_id=" +
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
      // console.log("token", data);
      token = data.access_token;
    })
    .catch(function (err) {
      // Log any errors
      // console.log("something went wrong", err);
    });

  // Personality Quiz Intro ------------------------------------------------------

  personalityIntro();

  function personalityIntro() {
    var personalityTitle = $("<h1>")
      .addClass(".title")
      .text("Lifestyle Quiz");
    var instructions = $("<p>")
      .addClass(".instructions")
      .text("Take the lifestyle quiz to match with a dog near you!");
    $(".start").append(personalityTitle);
    $(".start").append(instructions);
  }

  // Dog Name Generator-------------------------------------------------------------

  function nameGen() {
    listEl.empty();

    fetch("https://api.fungenerators.com/name/generate?category=dog&limit=50")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        for (var i = 0; i < 5; i++) {
          dogNames.push(
            data.contents.names[
              Math.floor(Math.random() * data.contents.names.length)
            ]
          );
          var div = $("<div>").addClass("list-container");
          //Button HTML elements?
          // In that button tag, data- attributes
          // Store the dogNames[i] in that data- attribute
          var li = $("<li>").text(dogNames[i]);
          li.addClass("list-names");
          listEl.append(div.append(li));

        }
      });
  }

  // Question and answers Loop ----------------------------------------------------

  function getQuestion() {
    $("#question-title").text(questionsArray[currentIndex].title);
    for (var i = 0; i < questionsArray[currentIndex].choices.length; i++) {
      var answerButton = $(
        "<button class='btn btn-info'>" +
          questionsArray[currentIndex].choices[i] +
          "</button>"
      );
      answerButton.val(questionsArray[currentIndex].choices[i]);
      $(".choiceBtns").append(answerButton);
    }
  }
  var answersArray = [];
  $(".choiceBtns").on("click", ".btn", function (event) {
    $(".choiceBtns").empty();
    var answers = $(this).val();
    answersArray.push(answers);
    event.preventDefault();

    currentIndex++;
    // getQuestion();
    if (currentIndex < questionsArray.length) {
      getQuestion();
    }
    if (currentIndex == questionsArray.length) {
      currentIndex = 0;
      $(".choiceBtns").hide();
      $("#end-screen").show();
      getDog();
    }
  });

  //Get Dog by Zipcode function

  function getDog() {
    $("#question-title").hide();
    $("#zipcodeForm").removeAttr("class");
  }

  // Moves chosen dogNames to favorites list ---------------------------------------------

var history = [];
$("#names-list").on("click", ".list-names", function (event) {
    event.preventDefault();
    dogNames = [];
    $("#fav-names-list").append(this);
    var storedName = $(this).text();
    history.push(storedName)
    localStorage.setItem("history", JSON.stringify(history));
  });

  function getNames() {
    var historyEl = JSON.parse(localStorage.getItem("history"))||[];
    for ( var i = 0; i < historyEl.length; i++) {
      favNamesList(historyEl[i]);
      console.log(historyEl);
    }
  }
  getNames();

  function favNamesList(history){
    var li = $("<li>").text(history).addClass("list-names");
    console.log(li)
    $("#fav-names-list").append(li);
  }

  // Quiz Start function---------------------------------------------------------

  function startQuiz() {
    questionsEl.removeAttr("class");
    getQuestion();
  }

  // Dog Quotes -----------------------------------------------------------------------
  // set interval to rotate quotes
  function dogQuoteGenerator() {
    var i = 0;
    setInterval(function () {
      dogQuotes = [];
      $("#person").empty();
      $("#quote").empty();
      for (var i = 0; i < 1; i++) {
        // console.log(dogQuotes)

        //  dogQuotes.empty();
        dogQuotes.push(
          dogQuotesArray[Math.floor(Math.random() * dogQuotesArray.length)]
        );
        // console.log(dogQuotes)
        $("#person").append(dogQuotes[0].author);
        $("#quote").append(dogQuotes[0].quote);
      }
    }, 5000);
  }
  dogQuoteGenerator();

  // Event Listener to Generate dog Names ---------------------------------------------------------------

  $(nameBtn).on("click", function () {
    // console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhhh")
    dogNames = [];
    nameGen();
  });

  //Another Event Listener that listens to what is clicked?
  // Can we give those buttons an ID or a class-name and on click, store that data in local storage?
  // Ok, once that data is stored, run nameGen() again to generate the next 5 random names.

  //  Event listener to Start Quiz --------------------------------------------------------

  startBtn.on("click", function () {
    //clear out personality title and instructions
    $(".start").hide();
    $("#startBtn").hide();
    startQuiz();
  });

  // Event Listener to submit Zipcode -------------------------------------------------

  $(document).on("click", "#submit-button", function (event) {
    event.preventDefault();
    $("#quiz-container").addClass("hide");
    $("#page-container").removeAttr("id");
    zipcodeInput = zipcodeEl.val();
    // console.log(answersArray[1]);
    var dogSize;
    if (answersArray[1] === "apartment") {
      dogSize = "small";
    } else if (answersArray[1] === "house") {
      dogSize = "medium,large";
    } else if (answersArray[1] === "loft") {
      dogSize = "small,medium";
    } else if (answersArray[1] === "farmhouse") {
      dogSize = "xlarge";
    }
    if (answersArray[4] === "Yes") {
      petDander = "allergic";
      petDanderEl.push(petDander);
    }
    dogSizeEl.push(dogSize);
    firstFetch(token, zipcodeInput, dogSize);
  });
});
