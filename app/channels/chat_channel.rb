class ChatChannel < ApplicationCable::Channel
  def subscribed
    debugger
    @chat_channel = Channel.find(params[:id])
    stream_for @chat_channel
  end

  def speak(data)
    message = @chat_channel.messages.new(body: data['message'])
    message.messageable_type = 'Channel'
    message.messageable_id = @chat_channel.id
    message.author_id = current_user.id
    debugger
    if message.save!
      socket = { message: message.to_json, type: 'message' }
      debugger
      ChatChannel.broadcast_to(@chat_channel, socket)
    end
  end

  def edit(data)
    message = @chat_channel.messages.find(data['dmId'])
    debugger
    if message.update(body: data['message'])
      debugger
      socket = { message: message.to_json, type: 'edit' }
      debugger
      ChatChannel.broadcast_to(@chat_channel, socket)
    end
  end

  # def load
  #   messages = @chat_channel.messages.all.collect(&:body)
  #   socket = { messages: messages, type: 'messages' }
  #   ChatChannel.broadcast_to(@chat_channel, socket)
  # end

  # def newChannel(channel)
  #   # ChatChannel.broadcast_to(@chat_channel, )
  # end

  def unsubscribed; end
end
