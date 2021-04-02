$(document).ready(function(){

// Arrays ------------------------------------------------------------------------------
var dogQuotesArray = [
  {
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

],






//Dom Variables------------------------------------------------------------------------
key = "oxrPyoy6v3XMn43E8m5y5ZVOEGAmTO52CKOvjV7CckXTDJvpjG";
var secret = "AYuKkVCKqFIYCOxKzBWeihxy7lA7vSOReHMlLC5E";
var listEl = $("#names-list");
var nameBtn = $("#nameBtn");

// Quiz Variables - Green
// var currentQuestion = 0; 
var personalityTitle = "";

var questionsEl = $("#questions");
var choicesEl = $("#choices");
var submitBtn = $("#submit");
var startBtn = $("#startBtn");
var zipcodeEl = $("#zipcode");
var feedbackEl = $("#feedback");



// JavaScript Variables ---------------------------------------------------------------
var dogNames = [];
var dogQuotes = [];
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
  }
];

// function Definitions --------------------------------------------------------------
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

  // Personality Quiz Intro ------------------------------------------------------
   personalityIntro();
    // var title = $("#title");
    // var personalityTitle = $("<h1>");
  function personalityIntro(){
    var personalityTitle = $("<h1>").addClass(".title").text("Personality Quiz");
    var instructions = $("<p>").addClass(".instructions").text("Take the personality quiz to match with a dog near you!");
    $(".start").append(personalityTitle);
    $(".start").append(instructions);

  }


  // Dog Name Generator 
  
function nameGen() {
  listEl.empty();

  fetch("https://api.fungenerators.com/name/generate?category=dog&limit=50")
  .then(function (response) {
    return response.json();
  }).then(function (data) {
    // console.log(data);
    // console.log(data.contents.names[0]);
    for (var i = 0; i < 5; i++) {
      dogNames.push(data.contents.names[Math.floor(Math.random() * data.contents.names.length)]);
      var div = $("<div>").addClass("list-container");
      //Button HTML elements? 
      // In that button tag, data- attributes 
      // Store the dogNames[i] in that data- attribute
      var li = $("<li>").text(dogNames[i])
      listEl.append(div.append(li));
    }
    console.log(dogNames);
  })
};

{/* <div id="questions" class="hide">
          <h2 id="question-title"></h2>
          <button class="answerBtn" class="choices hide btn btn-info"></button> */}

var currentIndex = 0;

function getQuestion() {
var currentQuestion = questionsArray[currentIndex];
$("#question-title").text(currentQuestion.title);
console.log(currentQuestion);
// console.log(currentQuestion.title);
// console.log(currentQuestion.choices);
for (var i = 0; i < currentQuestion.choices.length; i++){
  // var test = $("<button></button>");
  // $(".answerBtn").append(currentQuestion.choices[i]).addClass("btn btn-info");
  $("#question-title").append("<button class='btn btn-info'>" + currentQuestion.choices[i] + "</button>");
  // console.log(test);
  // console.log(currentQuestion.choices[i]);
  // currentIndex++,
}
}












// function getQuestion1() {
//   questionsEl.addClass("show")
//   $("#choice1").removeClass("hide")
//   $("#choice2").removeClass("hide")
//   $("#choice3").removeClass("hide")
//   // append questions and answers
//   $("#question-title").html(questions[0].title);
//   $("#choice1").html(questions[0].choices[0]);
//   $("#choice2").html(questions[0].choices[1]);
//   $("#choice3").html(questions[0].choices[2]);
//   $("#choices").addClass("answer-buttons");

//   $("#choice1").on("click", function() {
//     getQuestion2();
//   });
//   $("#choice2").on("click", function() {
//     getQuestion2();
//   });
//   $("#choice3").on("click", function() {
//     getQuestion2();
//   });
// };

// function getQuestion2() {
  
//   questionsEl.addClass("show")
//   $("#choice4").removeClass("hide")
//   // append questions and answers
//   $("#question-title").html(questions[1].title);
//   $("#choice1").html(questions[1].choices[0]);
//   $("#choice2").html(questions[1].choices[1]);
//   $("#choice3").html(questions[1].choices[2]);
//   $("#choice4").html(questions[1].choices[3]);

//   $("#choice1").on("click", function() {
//     getQuestion3();
//   });
//   $("#choice2").on("click", function() {
//     getQuestion3();
//   });
//   $("#choice3").on("click", function() {
//     getQuestion3();
//   });
// };


// function getQuestion3() {
  
//   questionsEl.addClass("show")
//   $("#choice4").addClass("hide")
//   // append questions and answers
//   $("#question-title").html(questions[2].title);
//   $("#choice1").html(questions[2].choices[0]);
//   $("#choice2").html(questions[2].choices[1]);
//   $("#choice3").html(questions[2].choices[2]);
//   $("#choices").addClass("answer-buttons");

//   $("#choice1").on("click", function() {
//     getQuestion4();
//   });
//   $("#choice2").on("click", function() {
//     getQuestion4();
//   });
//   $("#choice3").on("click", function() {
//     getQuestion4();
//   });
// };

// function getQuestion4() {
  
//   questionsEl.addClass("show")
//   // append questions and answers
//   $("#question-title").html(questions[3].title);
//   $("#choice1").html(questions[3].choices[0]);
//   $("#choice2").html(questions[3].choices[1]);
//   $("#choice3").html(questions[3].choices[2]);
//   $("#choices").addClass("answer-buttons");

//   $("#choice1").on("click", function() {
//     getQuestion5();
//   });
//   $("#choice2").on("click", function() {
//     getQuestion5();
//   });
//   $("#choice3").on("click", function() {
//     getQuestion5();
//   });
// };

// function getQuestion5() {
  
//   questionsEl.addClass("show")
//   $("#choice3").addClass("hide")
//   // append questions and answers
//   $("#question-title").html(questions[4].title);
//   $("#choice1").html(questions[4].choices[0]);
//   $("#choice2").html(questions[4].choices[1]);
//   $("#choice3").html(questions[4].choices[2]);
//   $("#choices").addClass("answer-buttons");

//   $("#choice1").on("click", function() {
//     console.log("Whats Next?")
//   });
//   $("#choice2").on("click", function() {
//     console.log("Whats Next?")
//   });
//   $("#choice3").on("click", function() {
//     console.log("Whats Next?")
//   });
// };





// function getQuestion1() {
//   questionsEl.addClass("show")
//   $("#choice1").removeClass("hide")
//   $("#choice2").removeClass("hide")
//   $("#choice3").removeClass("hide")
//   // append questions and answers
//   $("#question-title").html(questions[0].title);
//   $("#choice1").html(questions[0].choices[0]);
//   $("#choice2").html(questions[0].choices[1]);
//   $("#choice3").html(questions[0].choices[2]);
//   $("#choices").addClass("answer-buttons");

// }


// Quiz Start function
function startQuiz() {
  questionsEl.removeAttr("class");
  getQuestion();
}



// Dog Quotes -----------------------------------------------------------------------
function dogQuoteGenerator() {
for ( var i = 0; i < 1; i++){
  dogQuotes.push(dogQuotesArray[Math.floor(Math.random() * dogQuotesArray.length)]);
}
$("#person").append(dogQuotes[0].author);
$("#quote").append(dogQuotes[0].quote);
};

// Event Listeners ---------------------------------------------------------------
$(nameBtn).on("click", function() {
  dogNames = [];
  nameGen();
});

//Another Event Listener that listens to what is clicked? 
// Can we give those buttons an ID or a class-name and on click, store that data in local storage?
// Ok, once that data is stored, run nameGen() again to generate the next 5 random names. 

startBtn.on("click", function () {
  //clear out personalitytitle and instructions
  $(".start").hide();
  $("#startBtn").hide();

  startQuiz();
});



// Function Calls -----------------------------------------------------------------
dogQuoteGenerator();

});