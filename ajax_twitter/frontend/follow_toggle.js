const APIUtil = require('./api_util')

class FollowToggle {
  constructor($el, options) {
    this.userId = $el.data("user-id") || options.userId;
    this.followState = $el.data("initial-follow-state") || options.followState;
    this.$el = $el;
    this.render();
    this.$el.on("click", this.handleClick.bind(this));
  }
  
  render() {
    if (this.followState) {
      this.$el.text("Unfollow!");
    } else {
      this.$el.text("Follow!");
    }
  }
  
  handleClick(event) {

    event.preventDefault();
    this.$el.prop('disabled', true);
    let request;
    if (this.followState) {
      request = APIUtil.unfollowUser(this.userId);
    } else {
      request = APIUtil.followUser(this.userId);
    }
    
    request.done(() => {
      this.$el.prop('disabled', false);
      this.followState = !this.followState;
      this.render();
    });
    
  }
}

module.exports = FollowToggle;