export const getChannelMessages = channelId => (
    $.ajax({
        method: 'GET',
        url: 'api/messages',
        data: {
            channelId,
        }
    })
);

export const getDmMessages = dmId => (
    $.ajax({
        method: 'GET',
        url: 'api/messages',
        data: {
            dmId,
        }
    })
);