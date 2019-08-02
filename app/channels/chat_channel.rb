class ChatChannel < ApplicationCable::Channel
  def subscribed
    @chat_channel = Channel.find(params[:id])
    # debugger
    stream_for @chat_channel
    # stream_for 'chat_channel'
  end

  def speak(data)
    # message = Message.create(body: data['message'])
    # socket = { message: message.body }
    # ChatChannel.broadcast_to('chat_channel', socket)

    message = Message.new(body: data['message'], messageable_type: 'Channel', messageable_id: @chat_channel.id)
    # debugger
    if message.save!
      socket = { message: message.body, type: 'message' }
      # ChatChannel.broadcast_to('chat_channel', socket)
      ChatChannel.broadcast_to(@chat_channel, socket)
    end
  end

  def load
    messages = @chat_channel.messages.all.collect(&:body)
    socket = { messages: messages, type: 'messages' }
    ChatChannel.broadcast_to(@chat_channel, socket)
  end

  def unsubscribed; end
end
