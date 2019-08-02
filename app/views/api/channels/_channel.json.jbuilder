json.set! channel.id do
    json.id channel.id
    json.name channel.name
    json.is_private channel.is_private
    json.owner_id channel.owner_id
    json.message_ids channel.messages.map{|message| message.id}
    json.member_ids channel.members.map{|member| member.id}
end