const FollowToggle = require("./follow_toggle");
const UsersSearch = require("./users_search");

$(() => {
  $(".follow-toggle").each((idx, el) => {
    const ft = new FollowToggle($(el));
    console.log(ft);
  });
  new UsersSearch($('.users-search'), $('.input-search'), $('.users'));
});