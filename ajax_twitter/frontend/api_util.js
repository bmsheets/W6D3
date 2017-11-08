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
