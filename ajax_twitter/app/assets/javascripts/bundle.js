/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

const FollowToggle = __webpack_require__(1);
const UsersSearch = __webpack_require__(3);
const TweetCompose = __webpack_require__(4);
const InfiniteTweets = __webpack_require__(5);

$(() => {
  $(".follow-toggle").each((idx, el) => {
    const ft = new FollowToggle($(el));
  });
  new UsersSearch($('.users-search'), $('.input-search'), $('.users'));
  new TweetCompose($(".tweet-compose"));
  new InfiniteTweets($(".fetch-more"));
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2)

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

/***/ }),
/* 2 */
/***/ (function(module, exports) {

const APIUtil = {
  followUser: id => {
    const clickMethod = 'POST';
    const url = `/users/${id}/follow`;
    event.preventDefault();
    return $.ajax({
      url: url,
      method: clickMethod,
      dataType: 'json'
    })
  },
  
  unfollowUser: id => {
    const clickMethod = "DELETE";
    const url = `/users/${id}/follow`;
    event.preventDefault();
    return $.ajax({
      url: url,
      method: clickMethod,
      dataType: 'json'
    })
  },
  
  searchUsers: (queryVal, success) => {
    const url = "/users/search";
    const method = "GET";
    return $.ajax({
      url: url,
      method: method,
      data: { 'query': queryVal },
      dataType: 'json',
      success: success
    });
  },
  
  createTweet: (data, success) => {
    const url = "/tweets";
    const method = "POST";
    return $.ajax({
      url: url,
      method: method,
      data: { 'tweet': {
              'content': data
              } 
            },  
      dataType: 'json',
      success: success
    });
  },
  
  fetchTweets: (success, maxCreatedAt) => {
    const data = maxCreatedAt ? { 'max_created_at': maxCreatedAt } : null;
    const url = "/feed";
    const method = "GET";
    return $.ajax({
      url: url,
      method: method,
      data: data,
      dataType: 'json',
      success: success
    });
  }
}

module.exports = APIUtil;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2)
const FollowToggle = __webpack_require__(1);

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

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2);

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

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2)

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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map