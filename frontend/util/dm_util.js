export const getDms = userId => (
    $.ajax({
        method: 'GET',
        url: `api/users/${userId}/dms`,
    })
);

export const getDm = (senderId, recipientId) => (
    $.ajax({
        method: 'POST',
        url: `api/users/${senderId}/dms`,
        data: {
            recipientId
        },
    }) 
);

export const createDm = (senderId, recipientIds) => (
    $.ajax({
        method: 'POST',
        url: `api/users/${senderId}/dms`,
        data: {
            recipientIds
        },
    })
);