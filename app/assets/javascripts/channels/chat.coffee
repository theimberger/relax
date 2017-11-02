App.chat = App.cable.subscriptions.create "ChatChannel",
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    $(".message_list").append(data.message)

  speak:  (message) ->
    @perform 'speak', message: message

$(document).on 'keypress', '[data-behavior=chat_speaker]', (event) ->
  if event.keyCode is 13 #return = send
    App.chat.speak event.target.value
    event.target.value = ""
    event.preventDefault()
