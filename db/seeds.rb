# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

User.destroy_all
Channel.destroy_all
Message.destroy_all
ChannelMember.destroy_all

demo_user = User.create!(username: 'Demo User', email: 'demo@slacc.com', password: 'password')
user2 = User.create!(username: 'alpalca', email: 'alpal@gmail.com', password: 'alpaca')
user3 = User.create!(username: 'russel sprouts', email: 'rt@yahoo.com', password: 'russelin')

channel1 = Channel.create!(name: '~hot takes~', owner: demo_user, is_private: false)
channel2 = Channel.create!(name: 'the ~hottest~ takes', owner: user2, is_private: true)
channel3 = Channel.create!(name: 'mildly hot takes', owner: user3, is_private: false)
channel4 = Channel.create!(name: 'HOTTER than the HOTTEST takes', owner: user3, is_private: true)

# message1 = Message.create!(body: 'burn notice is actually pretty good', messageable: channel1)
# message2 = Message.create!(body: 'ranch sux', messageable: channel3)
# message3 = Message.create!(body: 'ranch really sucks', messageable: channel2)
# message4 = Message.create!(body: 'RANCH SUCKS', messageable: channel4)

message1 = Message.create!(body: 'burn notice is actually pretty good', author: user2, messageable: channel1)
message2 = Message.create!(body: 'ranch sux', author: user2, messageable: channel3)
message3 = Message.create!(body: 'ranch really sucks', author: user3, messageable: channel2)
message4 = Message.create!(body: 'RANCH SUCKS', author: demo_user, messageable: channel4)

channel_member1 = ChannelMember.create!(channel: channel1, user: demo_user)
channel_member2 = ChannelMember.create!(channel: channel1, user: user2)
channel_member3 = ChannelMember.create!(channel: channel1, user: user3)
channel_member4 = ChannelMember.create!(channel: channel2, user: demo_user)
