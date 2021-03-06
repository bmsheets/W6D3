const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");
const TweetCompose = require("./tweet_compose");
const InfiniteTweets = require("./infinite_tweets");

$(() => {
  $(".follow-toggle").each((idx, el) => {
    const ft = new FollowToggle($(el));
  });
  new UsersSearch($('.users-search'), $('.input-search'), $('.users'));
  new TweetCompose($(".tweet-compose"));
  new InfiniteTweets($(".fetch-more"));
});