export const getChannelMessages = channelId => (
    $.ajax({
        method: 'GET',
        url: `/api/channels/${channelId}/messages`,
    })
);

