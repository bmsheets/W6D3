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
