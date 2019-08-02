class ChatChannel < ApplicationCable::Channel
  def subscribed
    @chat_channel = Channel.find(params[:id])
    stream_for @chat_channel
  end

  def speak(data)
    message = Message.new(body: data['message'], messageable_type: 'Channel', messageable_id: @chat_channel.id)
    if message.save!
      debugger
      socket = { message: message.body, type: 'message' }
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
