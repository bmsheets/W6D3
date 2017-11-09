const APIUtil = require('./api_util')
const FollowToggle = require("./follow_toggle");

class UsersSearch {
  constructor($el, $input, $ul) {
    this.$el = $el;
    this.$input = $input;
    this.$ul = $ul;
    this.$input.on("input", this.handleInput.bind(this));
  }
  
  handleInput(event) {
    APIUtil.searchUsers(event.target.value, this.renderResults.bind(this));
  }
  
  renderResults(users) {
    this.$ul.children().remove();
    users.forEach((u) => {
      this.$ul.append(`<li>${u.username}</li>`);
      const $button = $('<button>');
      $button.addClass('follow-toggle');
      new FollowToggle($button, {
        userId: u.id,
        followState: u.followed
      });
      this.$ul.append($button);
    });
  }
}

module.exports = UsersSearch;