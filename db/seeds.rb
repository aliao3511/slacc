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
DmMember.destroy_all
Dm.destroy_all

demo_user = User.create!(username: 'Demo User', email: 'demo@slacc.com', password: 'password', avatar_url: 'avatar_1.png')
user2 = User.create!(username: 'alpalca', email: 'alpal@gmail.com', password: 'alpaca', avatar_url: 'avatar_2.png')
user3 = User.create!(username: 'russel sprouts', email: 'rt@yahoo.com', password: 'russelin', avatar_url: 'avatar_1.png')
user4 = User.create!(username: 'robert', email: 'robertku@firefy.com', password: 'welovebugs', avatar_url: 'avatar_2.png')
user5 = User.create!(username: 'lil wang', email: 'lil@gmail.com', password: 'lildocs', avatar_url: 'avatar_1.png')
user6 = User.create!(username: 'spenny t', email: 'spence@yahoo.com', password: 'spenny', avatar_url: 'avatar_2.png')
user7 = User.create!(username: 'dan', email: 'dk@gmail.com', password: 'donkeykong', avatar_url: 'avatar_1.png')

channel1 = Channel.create!(name: 'general', owner: demo_user, is_private: false)
channel2 = Channel.create!(name: 'yeehaw!!!', owner: user2, is_private: true)
channel3 = Channel.create!(name: 'salad opinions', owner: user3, is_private: false)
channel4 = Channel.create!(name: 'hot takes', owner: user3, is_private: true)
channel5 = Channel.create!(name: '3 boys 1 juul', owner: user7, is_private: true)
channel6 = Channel.create!(name: 'buzz buzz', owner: user4, is_private: true)

message1 = Message.create!(body: 'welcome to slacc!', author: demo_user, messageable: channel1)
message2 = Message.create!(body: 'ranch sux', author: user2, messageable: channel3)
message3 = Message.create!(body: "delta dawn what\'s that flower you have on ~", author: user3, messageable: channel2)
message4 = Message.create!(body: 'burn notice is actually really good', author: user4, messageable: channel4)
message5 = Message.create!(body: 'hover over things for helpful tooltips!', author: demo_user, messageable: channel1)
message6 = Message.create!(body: "You know I like my chicken fried
Cold beer on a Friday night
A pair of jeans that fit just right
And the radio on
Well I was raised underneath the shade of a Georgia pine
And that's home you know
Sweet tea pecan pie and homemade wine
Where the peaches grow
And my house it's not much to talk about
But it's filled with love that's grown in southern ground
And a little bit of chicken fried", author: user5, messageable: channel2)
message7 = Message.create!(body: "Well, I'm in love, I'm in love, with a beautiful gal
That's what's the matter with me
Well, I'm in love, I'm in love, with a beautiful gal
But she don't care about me
Lord, I tried and I tried, to keep her satisfied
But she just wouldn't stay
So now that she is leavin'
This is all I can say
I got a feelin' called the blues, oh, Lord
Since my baby said goodbye
Lord, I don't know what I'll do
All I do is sit and sigh, oh, Lord", author: user5, messageable: channel2)
message8 = Message.create!(body: "Shake it for the young bucks sittin' in the honky-tonks
For the rednecks rockin' 'til the break of dawn
For the DJ spinnin' that country song
Come on, come on, come on
Shake it for the birds, shake it for the bees
Shake it for the catfish swimming down deep in the creek
For the crickets and the critters and the squirrels
Shake it to the moon, shake it for me girl, aww", author: user6, messageable: channel2)
message9 = Message.create!(body: "Well, I've been afraid of changin'
'Cause I built my life around you
But time makes you bolder
Children get older
I'm getting older too
Well, I'm getting older too
So, take this love and take it down
Yeah, and if you climb a mountain and ya turn around
And if you see my reflection in the snow covered hills
Well the landslide brought me down", author: user6, messageable: channel2)
message10 = Message.create!(body: "Yeah, I'm gonna take my horse to the old town road
I'm gonna ride 'til I can't no more
I'm gonna take my horse to the old town road
I'm gonna ride 'til I can't no more (Kio, Kio)
I got the horses in the back
Horse tack is attached
Hat is matte black
Got the boots that's black to match
Ridin' on a horse, ha
You can whip your Porsche
I been in the valley
You ain't been up off that porch, now
Can't nobody tell me nothin'
You can't tell me nothin'
Can't nobody tell me nothin'
You can't tell me nothin'", author: user7, messageable: channel2)
message11 = Message.create!(body: "Jolene, Jolene, Jolene, Jolene
I'm begging of you please don't take my man
Jolene, Jolene, Jolene, Jolene
Please don't take him just because you can
Your beauty is beyond compare
With flaming locks of auburn hair
With ivory skin and eyes of emerald green
Your smile is like a breath of spring
Your voice is soft like summer rain
And I cannot compete with you
Jolene", author: user7, messageable: channel2)
message12 = Message.create!(body: "All day I've faced the barren waste
Without the taste of water, cool water
Old Dan and I with throats burned dry
And souls that cry for water, cool, clear water
Keep a-movin', Dan, don't you listen to him, Dan
He's a devil not a man
And he spreads the burning sand with water
Dan can you see that big green tree
Where the water's runnin' free
And it's waiting there for you and me", author: user5, messageable: channel2)
message13 = Message.create!(body: "Let me tell you, buddy
There's a faster gun
Coming over younder
When tomorrow comes
Let me tell you, buddy
And it win't be long
Till you find yourself singing
Your last cowboy song
Yippee-ki-yi-yay
When the roundup ends
Yippee-ki-yi-yay
And the campfire dims
Yippee-ki-yi-yay
He shalt be saved
When a cowboy trades
His spurs for wings", author: user5, messageable: channel2)

ChannelMember.create!(channel: channel1, user: demo_user)
ChannelMember.create!(channel: channel1, user: user2)
ChannelMember.create!(channel: channel1, user: user3)

ChannelMember.create!(channel: channel2, user: demo_user)
ChannelMember.create!(channel: channel2, user: user2)
ChannelMember.create!(channel: channel2, user: user3)
ChannelMember.create!(channel: channel2, user: user5)
ChannelMember.create!(channel: channel2, user: user7)
ChannelMember.create!(channel: channel2, user: user6)

ChannelMember.create!(channel: channel3, user: user3)
ChannelMember.create!(channel: channel3, user: user2)
ChannelMember.create!(channel: channel3, user: user4)
ChannelMember.create!(channel: channel3, user: user5)

ChannelMember.create!(channel: channel4, user: user3)
ChannelMember.create!(channel: channel5, user: user7)
ChannelMember.create!(channel: channel6, user: user4)

# dms
dm_1 = Dm.create!()
dm_2 = Dm.create!()
dm_3 = Dm.create!()

DmMember.create!(dm: dm_1, user: demo_user)
DmMember.create!(dm: dm_1, user: user2)
DmMember.create!(dm: dm_3, user: demo_user)
DmMember.create!(dm: dm_3, user: user4)
DmMember.create!(dm: dm_3, user: user5)

Message.create!(body: 'super secret group chat', author: user4, messageable: dm_3)
Message.create!(body: 'super secret chat', author: user2, messageable: dm_1)





