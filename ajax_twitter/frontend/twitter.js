const FollowToggle = require("./follow_toggle");

$(() => {
  $(".follow-toggle").each((idx, el) => {
    const ft = new FollowToggle($(el));
    console.log(ft);
  });
});