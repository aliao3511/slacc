class NotifChannel < ApplicationCable::Channel

    def subscribed
        stream_from "notif_channel_#{current_user.id}"
    end

    def speak(data)
        # on creation of new channels and new dms need to send updated user info
    end

    def unsubscribed; end
end