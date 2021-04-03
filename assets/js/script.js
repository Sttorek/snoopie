$(document).ready(function () {
  // Arrays ------------------------------------------------------------------------------
  var dogQuotesArray = [{
        quote: "“The dog is a gentleman; I hope to go to his heaven, not man’s”",
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
        quote: "'What do dogs do on their day off? Can't lie around - that's their job.'",
        author: "~ George Carlin",
      },

      {
        quote: "'Happiness is a warm puppy.'",
        author: "~ Charles Shultz",
      },

      {
        quote: "'All his life he tried to be a good person. Many times, however, he failed. For after all, he was only human. He wasn't a dog.",
        author: "~ Charles Shultz",
      },

      {
        quote: "'Everyone thinks they have the best dog. And none of them are wrong.",
        author: "~ W.R. Purche",
      },

      {
        quote: "'A dog is the only thing on Earth that loves you more than he loves himself.",
        author: "~ Josh Billings",
      }
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
  // var currentQuestion = 0;
  var personalityTitle = "";

  var questionsEl = $("#questions");
  var choicesEl = $("#choices");
  var submitBtn = $("#submit");
  var startBtn = $("#startBtn");
  var zipcodeForm = $("#zipcodeForm");
  var zipcodeEl = $("#zipcode");
  var feedbackEl = $("#feedback");

  var zipcodeInput;

  // JavaScript Variables ---------------------------------------------------------------
  var dogNames = [];
  var dogQuotes = [];
  var currentIndex = 0;
  i = 0;

  var questionsArray = [{
      // would measure user's energy level
      title: "How active would you describe your lifestyle?",
      choices: ["low", "moderate", "high"],
    },
    {
      // would measure user's dog size
      title: "What kind of home do you live in?",
      choices: ["apartment", "house", "loft", "other"],
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

  // function Definitions --------------------------------------------------------------
  
  var pawPrints = [$("#print1"), $("#print2"), $("#print3"), $("#print4"), $("#print5"), $("#print6")];
  function startImageTransition() {
    var i = 0
    countdown = setInterval(
      function () {
        console.log(pawPrints[i]);
        if ( i <= 5) {
          pawPrints[i].removeClass("hide");
          i++;
          console.log(i);
        } else 
        clearInterval(countdown); return;
      },
      2250);
    }
  startImageTransition();

  // API token fetch to access page-----------------------------------------------------

  function firstFetch(token, zipcode, dogSize) {
    var queryURL =
      "https://api.petfinder.com/v2/animals?distance=50&location=" +
      zipcode +
      "&size=" +
      dogSize;

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
        renderResults(data.animals);
        var animalsAndZipcode = data.animals.filter(function (animal) {
          //returns a boolean
          return animal.contact.address.postcode === zipcodeInput;
        });
        console.log(animalsAndZipcode);
        // var zipcodeKey = data.animals[0].contact.address.postcode;
        // console.log(zipcodeKey);
      })
      .catch(function (err) {
        // Log any errors
        console.log("something went wrong", err);
      });
  }
  //save results in localstorage then run renderResults
  function renderResults(data) {
    for (var i = 0; i < data.length; i++) {
      // console.log("name", data[i].name);
      console.log("seth", data[i]);
      $("#name1").text(data[0].name);
      $("#name2").text(data[1].name);
      $("#name3").text(data[2].name);
      $("#name4").text(data[3].name);

      var img1 = $("<img></img>");
      img1.attr("src", data[0].primary_photo_cropped.small)
      var img2 = $("<img></img>");
      img2.attr("src", data[1].primary_photo_cropped.small)
      var img3 = $("<img></img>");
      img3.attr("src", data[2].primary_photo_cropped.small)
      var img4 = $("<img></img>");
      img4.attr("src", data[3].primary_photo_cropped.small)
    }
    $("#result1").append(img1)
    $("#result2").append(img2)
    $("#result3").append(img3)
    $("#result4").append(img4)
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
      token = data.access_token;
    })
    .catch(function (err) {
      // Log any errors
      console.log("something went wrong", err);
    });

  // Personality Quiz Intro ------------------------------------------------------

  personalityIntro();

  function personalityIntro() {
    var personalityTitle = $("<h1>")
      .addClass(".title")
      .text("Personality Quiz");
    var instructions = $("<p>")
      .addClass(".instructions")
      .text("Take the personality quiz to match with a dog near you!");
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
        console.log(data.contents.names);
        console.log(dogNames);
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
      $("#question-title").append(answerButton);
      // console.log(questionsArray[currentIndex].choices[i]);
    }
  }
  var answersArray = [];
  $("#question-title").on("click", ".btn", function (event) {
    var answers = $(this).val();
    answersArray.push(answers);
    console.log(answersArray);
    event.preventDefault();

    currentIndex++;
    // getQuestion();
    if (currentIndex < questionsArray.length) {
      getQuestion();
    }
    if (currentIndex == questionsArray.length) {
      currentIndex = 0;
      // console.log("these are the results");
      $("#question-title").hide();
      $("#end-screen").show();
      getDog();
    }
  });

  //Get Dog by Zipcode function

  function getDog() {
    $("#question-title").hide();
    $("#zipcodeForm").removeAttr("class");
  }

  // Moves choosen dogNames to favorites list ---------------------------------------------

  $("#names-list").on("click", ".list-names", function (event) {
    event.preventDefault();
    console.log("hello list names");
    dogNames = [];
    $("#fav-names-list").append(this);
  });

  // Quiz Start function---------------------------------------------------------

  function startQuiz() {
    questionsEl.removeAttr("class");
    getQuestion();
  }

  // Quiz End function---------------------------------------------------------

  // function endQuiz() {
  //   zipcodeEl.removeAttr("class");
  //   getDog();
  // }

  // Dog Quotes -----------------------------------------------------------------------
  // set interval to rotate quotes
  function dogQuoteGenerator() {
    for (var i = 0; i < 1; i++) {
      dogQuotes.push(
        dogQuotesArray[Math.floor(Math.random() * i)]
      );
    }
    $("#person").append(dogQuotes[0].author);
    $("#quote").append(dogQuotes[0].quote);
  }

  // Event Listeners ---------------------------------------------------------------

  $(nameBtn).on("click", function () {
    dogNames = [];
    nameGen();
  });

  //Another Event Listener that listens to what is clicked?
  // Can we give those buttons an ID or a class-name and on click, store that data in local storage?
  // Ok, once that data is stored, run nameGen() again to generate the next 5 random names.

  startBtn.on("click", function () {
    //clear out personality title and instructions
    $(".start").hide();
    $("#startBtn").hide();
    // $("#zipcodeForm").removeAttr("class");

    startQuiz();
  });

  $(document).on("click", "#submit-button", function (event) {
    event.preventDefault();
    $("#quiz-container").addClass("hide");
    $("#page-container").removeAttr("id");
    zipcodeInput = zipcodeEl.val();
    console.log(answersArray[1]);
    var dogSize;
    if (answersArray[1] === "house") {
      dogSize = "large";
    } else {
      dogSize = "small";
    }
    firstFetch(token, zipcodeInput, dogSize);
    console.log(zipcodeInput);
  });

  // Function Calls -----------------------------------------------------------------
  dogQuoteGenerator();
});