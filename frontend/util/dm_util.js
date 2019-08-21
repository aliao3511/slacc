export const getDms = userId => (
    $.ajax({
        method: 'GET',
        url: `api/users/${userId}/dms`,
    })
);

export const getDm = dmId => (
    $.ajax({
        method: 'GET',
        url: `api/dms/${dmId}`,
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