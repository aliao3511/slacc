export const signup = user => (
    $.ajax({
        method: 'POST',
        url: 'api/users',
        data: {
            user,
        },
    })
);

export const login = user => (
    $.ajax({
        method: 'POST',
        url: 'api/session',
        data: {
            user,
        },
    })
);

export const logout = () => (
    $.ajax({
        method: 'DELETE',
        url: 'api/session',
    })
);

export const verifyEmail = email => (
    $.ajax({
        method: 'GET',
        url: 'api/session/verify_email',
        data: {
            email,
        },
    })
);

export const getChannelMembers = channelId => (
    $.ajax({
        method: 'GET',
        url: `api/channels/${channelId}/users`
    })
);

export const updateCurrentUser = userId => (
    $.ajax({
        method: 'GET',
        url: `api/users/${userId}`
    })
);