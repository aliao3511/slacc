json.id dm.id
json.message_ids dm.messages.map {|message| message.id}
json.member_ids dm.members.map {|member| member.id}
json.created_at dm.created_at
