/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

"use strict";

// create a function to build the DOM elements required to display a tweet feed
function createTweetElement(tweet) {

  let $tweet = $("<article>").attr("class", "tweet")
      .append($("<header>").attr("class", "tweet-header")
          .append($("<img>").attr({
                                    class: "profile-pic",
                                    src: tweet.user.avatars.small
                                  }))
          .append($("<span>").attr("class", "user-name").text(tweet.user.name))
          .append($("<span>").attr("class", "user-handle").text(tweet.user.handle))
      )
      .append($("<div>").attr("class", "tweet-body")
          .append($("<p>").attr("class", "tweet-content").text(tweet.content.text))
      )
      .append($("<footer>").attr("class", "tweet-footer")
          .append($("<span>").attr("class", "tweet-age").text(timeConverter(tweet.created_at)))
          .append($("<span>").attr("class", "tweet-actions")
            .append($("<i>").attr("class", "fa fa-heart"))
            .append($("<i>").attr("class", "fa fa-retweet"))
            .append($("<i>").attr("class", "fa fa-flag"))
            )
          )
  return $tweet;
};

// leverage the 'create tweet' function and loop over the array of tweets, then render
// all tweets in the feed accordingly
function renderTweets(tweets) {
  $("#tweets").html("");
  tweets.forEach(function (key) {
    let $tweet = createTweetElement(key);
    $("#tweets").prepend($tweet);
  });
};

// create a function to house the ajax call & rendering function, to load
// all tweets every time the page loads (initial load & after posting a tweet)
function loadTweets(){
  $.ajax({
    method: "GET",
    url: "/tweets"
  }).done(function (tweets) {
    renderTweets(tweets)
  });
};

//create a function to convert the timestamp to a legible date & time
function timeConverter(tweetDate){
  var a = new Date(tweetDate);
  var amPm = a.getHours() >= 12 ?'PM':'AM'
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = ("0" + ((a.getHours() % 12)||12)).substr(-2)
  var min = ("0" + a.getMinutes()).substr(-2)
  var time = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ' ' + amPm
  return time;
}

// below is all code required to wait for DOM READY before running

$(document).ready(function() {

  //call the load tweets function upon document ready
  loadTweets();

  // load an event listener to catch clicks on the form button and act accordingly
  $('#create-tweet').on('submit', function(event) {
    event.preventDefault();
    var tweetText = $("#tweet-text").val()

    if (tweetText.length === 0) {
      alert("You've gotta say something! Don't be shy!");
      $("#tweet-text").focus();
    } else if (tweetText.length > 140) {
        alert("You've said too much... let's stick to 140 characters or less, please!");
        $("#tweet-text").focus();
      } else {
          $.ajax({
            method: "POST",
            url: "/tweets",
            data: {
              text: tweetText
            }
          }).done(function (tweet) {
            loadTweets();
            $("#tweet-text").val("");
            $("#char-counter").text('140');
            });
        };
    });

    //implement logic to slide the compose tweet section in and out of the screen
    $("#compose-btn").on("click", function() {
      $(".new-tweet").slideToggle("slow", function(){
        $("#tweet-text").focus();
      });
    });

});
