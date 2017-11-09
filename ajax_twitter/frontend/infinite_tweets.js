const APIUtil = require('./api_util')

class InfiniteTweets {
  constructor($el) {
    this.$el = $el;
    this.maxCreatedAt = null;
    APIUtil.fetchTweets(this.renderTweets.bind(this));
    this.$el.on("click", this.handleClick.bind(this));
  }
  
  handleClick(event) {
    event.preventDefault();
    APIUtil.fetchTweets(this.renderTweets.bind(this), this.maxCreatedAt);
  }
  
  renderTweets(data) {
    const $feed = $('#feed');
    data.forEach ((tweet) => {
      const $tweet = $('<li>');
      $tweet.text(`${tweet.content} -- `);
      const $link = $(`<a href="/users/${tweet.user_id}">${tweet.user.username}</a>`);
      $tweet.append($link);
      $tweet.append(` -- ${tweet.created_at}`);
      $feed.prepend($tweet);
      this.maxCreatedAt = tweet.created_at;
    });
  }
}

module.exports = InfiniteTweets;