const APIUtil = require('./api_util')

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
    });
  }
}

module.exports = UsersSearch;