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

$(() => {
  $(".follow-toggle").each((idx, el) => {
    const ft = new FollowToggle($(el));
    console.log(ft);
  });
  new UsersSearch($('.users-search'), $('.input-search'), $('.users'));
});

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2)

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
  }
}

module.exports = APIUtil;


/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

const APIUtil = __webpack_require__(2)

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

/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map