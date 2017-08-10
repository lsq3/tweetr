/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

"use strict";

// code pertinent to rendering tweets into the feed

$(document).ready(function() {

  var data = [
  {
    "user": {
      "name": "Newton",
      "avatars": {
        "small":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_50.png",
        "regular": "https://vanillicon.com/788e533873e80d2002fa14e1412b4188.png",
        "large":   "https://vanillicon.com/788e533873e80d2002fa14e1412b4188_200.png"
      },
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": {
        "small":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_50.png",
        "regular": "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc.png",
        "large":   "https://vanillicon.com/7b89b0d8280b93e2ba68841436c0bebc_200.png"
      },
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  },
  {
    "user": {
      "name": "Johann von Goethe",
      "avatars": {
        "small":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_50.png",
        "regular": "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1.png",
        "large":   "https://vanillicon.com/d55cf8e18b47d4baaf60c006a0de39e1_200.png"
      },
      "handle": "@johann49"
    },
    "content": {
      "text": "Blah blah not german text blah blah."
    },
    "created_at": 1461113796368
  }
]

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


  function renderTweets(tweets) {

    tweets.forEach(function (key) {
      let $tweet = createTweetElement(key);
      $("#tweets").append($tweet);
    });
  };

  renderTweets(data)

});