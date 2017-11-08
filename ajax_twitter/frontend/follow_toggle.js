class FollowToggle {
  constructor($el) {
    this.userId = $el.data("user-id");
    console.log(this.userId);
    this.followState = $el.data("initial-follow-state");
    this.$el = $el;
    this.render();
    this.$el.on("click", this.handleClick.bind(this));
  }
  
  render() {
    console.log(this.$el);
    if (this.followState) {
      this.$el.text("Unfollow!");
    } else {
      this.$el.text("Follow!");
    }
  }
  
  handleClick(event) {
    const clickMethod = this.followState ? 'DELETE' : 'POST';
    const url = `/users/${this.userId}/follow`;
    console.log(clickMethod);
    console.log(url);
    event.preventDefault();
    const request = $.ajax({
      url: url,
      method: clickMethod,
      dataType: 'json',
      success: () => {
        // console.log(this);
        this.followState = !this.followState;
        this.render();
      }
    });
    // request.done(() => {
    //   this.render();
    // });
  }
}

module.exports = FollowToggle;