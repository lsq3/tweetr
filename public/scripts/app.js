/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

"use strict";

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
          .append($("<span>").attr("class", "tweet-age").text(tweet.created_at))
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

// code pertinent to rendering tweets into the feed

$(document).ready(function() {

  // create a function to build the DOM elements required to display a tweet feed


  loadTweets();

  // load an event listener to catch clicks on the form button and act accordingly
  $('#create-tweet').on('submit', function(event) {
    event.preventDefault();
    var tweetText = $("#tweet-text").val()

    if (tweetText.length === 0) {
      alert("You've gotta say something! Don't be shy!")
    } else if (tweetText.length > 140) {
        alert("You've said too much... let's stick to 140 characters or less, please!")
      } else {
          $.ajax({
            method: "POST",
            url: "/tweets",
            data: {
              text: tweetText
            }
          }).done(function (tweets) {
            loadTweets(tweets);
            $("#tweet-text").val("");
            // $("#char-counter").val(140);
            //TODO validate that tweets aren't getting replicated after the mongoDB conversion//
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
