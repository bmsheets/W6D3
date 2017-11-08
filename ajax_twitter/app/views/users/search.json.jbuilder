json.array!(@users) do |user|
  json.(user, 'username')
  json.followed(current_user.follows?(user))
end