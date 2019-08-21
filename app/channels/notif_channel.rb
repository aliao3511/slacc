class NotifChannel < ApplicationCable::Channel

    def subscribed
        stream_from "notif_channel_#{current_user.id}"
    end

    def notify(data)
        # on creation of new channels and new dms need to send updated user info
        if data['channelId']
            data['memberIds'].each { |id| ActionCable.server.broadcast("notif_channel_#{id}", {
                channelId: data['channelId'],
                userId: id,
                type: 'channel'
            })}
        else 
            data['memberIds'].each { |id| ActionCable.server.broadcast("notif_channel_#{id}", {
                dmId: data['dmId'],
                userId: id,
                type: 'dm'
            })}
        end
    end

    def unsubscribed; end
end