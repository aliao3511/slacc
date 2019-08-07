class DmChannel < ApplicationCable::Channel

    def subscribed
        @dm_channel = DmChannel.find(params[:id])
        stream_for @dm_channel
    end

    def speak(data)
        message = @dm_channel.messages.new(body: data['message'])
        message.messageable_type = 'DMChannel'
        message.messageable_id = @dm_channel.id
        message.author_id = current_user.id
        if message.save!
            socket = { message: message.to_json, type: 'message' }
            DmChannel.broadcast_to(@dm_channel, socket)
        end
    end
end