export const getChannels = userId => (
    $.ajax({
        method: 'GET',
        url: 'api/channels',
        data: {
            userId
        }
    })
);

export const getChannel = id => (
    $.ajax({
        method: 'GET',
        url: `api/channels/${id}`,
    })
);

export const createChannel = channel => (
    $.ajax({
        method: 'POST',
        url: 'api/channels',
        data: {
            channel
        },
    })
);

export const deleteChannel = id => (
    $.ajax({
        method: 'DELETE',
        url: `api/channels/${id}`,
    })
);

export const addChannel = channelId => (
    $.ajax({
        method: 'GET',
        url: `api/channels/${channelId}/add_channel`,
    })
);
