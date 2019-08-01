json.extract! channel, :id, :name, :is_private, :owner_id
# json.member_ids do
#     json.array! channel.members.each do |member|
#         member.id
#     end
# end
# json.message_ids do
#     json.array! channel.messages.each do |message|
#         message.id
#     end
# end