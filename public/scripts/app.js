/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

"use strict";

// code pertinent to rendering tweets into the feed

$(document).ready(function() {

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
      $("#tweets").append($tweet);
    });
  };

  // call the tweet rendering function every time the page loads so the feed is up to date

  $.ajax({
    method: "GET",
    url: "/tweets"
  }).done(function (tweets) {
    renderTweets(tweets)
  });

  // load an event listener to catch clicks on the form button and act accordingly
  // $('#create-tweet').on('click', function(event) {
  //   event.preventDefault();
  //   var tweetText = $("#tweet-text").val()
  //
  //   $.ajax({
  //     method: "GET",
  //     url: "/tweets",
  //     data:
  //   }).done(function (tweets) {
  //     renderTweets(tweets);
  //   });

// });

});
