if !@users.include?(current_user)
    json.set! current_user.id do
        json.partial! 'api/users/user', user: current_user
    end
end
@users.each do |user|
    json.set! user.id do
        json.partial! 'api/users/user', user: user
    end
end