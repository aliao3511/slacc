class ChatChannel < ApplicationCable::Channel
  def subscribed
    # chat_channel = Channel.find(params[:id])
    stream_for 'chat_channel'
  end

  def speak(data)
    # message = Message.create(body: data['message'])
    # socket = { message: message.body }
    # ChatChannel.broadcast_to('chat_channel', socket)

    message = Message.new(body: data['message'], messageable_type: 'Channel')
    debugger
    if message.save
      socket = { message: message.body, type: 'message' }
      ChatChannel.broadcast_to('chat_channel', socket)
    end
  end

  def load
    messages = Message.all.collect(&:body)
    socket = { messages: messages, type: 'messages' }
    ChatChannel.broadcast_to('chat_channel', socket)
  end

  def unsubscribed; end
end
