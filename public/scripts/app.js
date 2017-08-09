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
      "text": "Es ist nichts schrecklicher als eine tätige Unwissenheit."
    },
    "created_at": 1461113796368
  }
]

  function createTweetElement(tweets) {

    let $tweet = $("<article>").attr("class", "tweet")
        .append($("<header>").attr("class", "tweet-header")
            .append($("<img>").attr({
                                      class: "profile-pic",
                                      src: tweets.user.avatars.small
                                    }))
            .append($("<span>").attr("class", "user-name").html(tweets.user.name))
            .append($("<span>").attr("class", "user-handle").html(tweets.user.handle))
        )
        .append($("<div>").attr("class", "tweet-body")
            .append($("<p>").attr("class", "tweet-content").html(tweets.content))
        )
        .append($("<footer>").attr("class", "tweet-footer")
            .append($("<span>").attr("class", "tweet-age").html(tweets.created_at))
            .append($("<img>").attr({
                                      class: "fav-button",
                                      src: "/images/fav-button.png"
                                    }))
            .append($("<img>").attr({
                                      class: "retweet-button",
                                      src: "/images/retweet-button.png"
                                    }))
            .append($("<img>").attr({
                                      class: "flag-button",
                                      src: "/images/flag-button.png"
                                    }))
            )
    return $tweet;
  };


  function renderTweets(tweets) {

    data.forEach(function (key) {
      let $tweet = createTweetElement(key);
      $("#tweets").append($tweet);
    });
  };

  renderTweets(data)

});