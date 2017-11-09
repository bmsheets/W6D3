const APIUtil = require("./api_util");

class TweetCompose {
  constructor($el) {
    this.$el = $el;
    $el.on("submit", this.handleSubmit.bind(this));
    $el.find('textarea').on("input", this.updateCharsLeft.bind(this));
  }
  
  handleSubmit(event) {
    event.preventDefault();
    this.$el.find('input').prop('disabled', true);
    APIUtil.createTweet(event.currentTarget[1].value, this.renderTweet.bind(this));
  }
  
  updateCharsLeft(event) {
    const charsLeft = 140 - event.currentTarget.value.length;
    
    if (charsLeft < 0) {
      $('.chars-left').text(0);
      this.$el.find('textarea').css('border-color', 'red');
      this.$el.find('input').prop('disabled', true);
    } else {
      $('.chars-left').text(charsLeft);
      this.$el.find('input').prop('disabled', false);
      this.$el.find('textarea').css('border-color', 'blue');
    }
    
  }
  
  renderTweet(data) {
    const $feed = $('#feed');
    const $tweet = $('<li>');
    $tweet.text(`${data.content} -- `);
    const $link = $(`<a href="/users/${data.user_id}">${data.user.username}</a>`);
    $tweet.append($link);
    $tweet.append(` -- ${data.created_at}`);
    $feed.prepend($tweet);
    this.$el.find('textarea').val('');
    this.$el.find('input').prop('disabled', false);
  }
}

module.exports = TweetCompose;