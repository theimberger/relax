# Relax
A Slack inspired chat app

## About
Relax is a real-time chat app built in imitation of Slack.  Users can create "spaces" in which they create channels to chat it.  Relax is built on Ruby on Rails, using ActionCable as it's web socketing tool.  Relax utilizes a React/Redux cycle as it's front end, which allows it to maintain a consistent application state during user interaction.  Future features should include better error handling, smoother UI, and the ability to make spaces and channels public.

You can see the live site here - https://slack-clone-relax.herokuapp.com/

## Versions and dependencies
Because Relax uses ActionCable, it requires Redis.  In production this is provided by RedisToGo, a Heroku add-on.  Other dependencies can be found in the package.json and gemfile files.  Other notable dependencies include React, Node, and React-Router.

## On the Database
The database schema can be seen in the Wiki.  Relax uses a Postgresql database.  The only seeds provided are Users (which are, incidentally, Star Wars themed).

## Code of Interest
### Polymorphic Associations
Polymorphic associations allow for single join tables to describe multiple types of relationships.  In relax, there are two instances.  The first is the membership instance, which simply permits users to be members of different types of collections.  A user may belong to a specific space, or a channel within a space.  Either way, the relationship is expressed in a single join table.


At the DB level:
```ruby
create_table "memberships", force: :cascade do |t|
  t.integer "collection_id", null: false
  t.string "collection_type", null: false
  t.integer "user_id", null: false
  t.boolean "is_admin", default: false
  ...
end
```


At the model level:
```ruby
# user model associations
has_many :memberships,
  class_name: :Membership,
  foreign_key: :user_id

has_many :spaces,
  through: :memberships,
  source: :collection,
  source_type: :Space

has_many :channels,
  through: :memberships,
  source: :collection,
  source_type: :Channel

#membership model associations
belongs_to :user,
  class_name: :User,
  foreign_key: :user_id

belongs_to :collection, polymorphic: :true

#space model associations
has_many :memberships, as: :collection

has_many :users,
  through: :memberships,
  source: :user

#channel model associations (same as space)
has_many :memberships, as: :collection

has_many :users,
  through: :memberships,
  source: :user
```


The second instance allows messages to hold a reference to the context in which they were authored.  This means a message knows whether it belongs to a specific chat or as a reply to another message (though the reply feature is pending).

```ruby
create_table "messages", force: :cascade do |t|
  t.string "content", null: false
  t.string "context_type", null: false
  t.integer "context_id", null: false
  ...
end
```
