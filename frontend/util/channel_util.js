export const getChannels = () => (
    $.ajax({
        method: 'GET',
        url: 'api/channels',
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