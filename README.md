# Relax - A Slack inspired chat app

## About
Relax is a real-time chat app built in imitation of Slack.  Users can create "spaces" in which they create channels to chat it.  Relax is built on Ruby on Rails, using ActionCable as it's web socketing tool.  Relax utilizes a React/Redux cycle as it's front end, which allows it to maintain a consistent application state during user interaction.  Future features should include better error handling, smoother UI, and the ability to make spaces and channels public.

You can see the live site here - https://slack-clone-relax.herokuapp.com/

## Versions and dependencies
Because Relax uses ActionCable, it requires Redis.  In production this is provided by RedisToGo, a Heroku add-on.  Other dependencies can be found in the package.json and gemfile files.  Other notable dependencies include React, Node, and React-Router.

## On the Database
The database schema can be seen in the Wiki.  Relax uses a Postgresql database.  The only seeds provided are Users (which are, incidentally, Star Wars themed).
