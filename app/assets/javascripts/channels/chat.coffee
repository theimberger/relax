a = window.location.href
a = a.split('/')
a = a[a.length - 1]
App.chat = App.cable.subscriptions.create {channel: "ChatChannel", channel_id: a},
  connected: ->
    # Called when the subscription is ready for use on the server

  disconnected: ->
    # Called when the subscription has been terminated by the server

  received: (data) ->
    # Called when there's incoming data on the websocket for this channel
    $(".message_list").append(data.message)

  speak:  (message) ->
    @perform 'speak', message: message


$(window).on 'hashchange', () ->
  a = window.location.href
  a = a.split('/')
  a = a[a.length - 1]
  App.chat.unsubscribe()

  App.chat = App.cable.subscriptions.create {channel: "ChatChannel", channel_id: a},
    connected: ->
      # Called when the subscription is ready for use on the server

    disconnected: ->
      # Called when the subscription has been terminated by the server

    received: (data) ->
      # Called when there's incoming data on the websocket for this channel
      $(".message_list").append(data.message)

    speak:  (message) ->
      @perform 'speak', message: message

  # $(document).on 'keypress', '[data-behavior=chat_speaker]', (event) ->
  #   if event.keyCode is 13 #return = send
  #     App.chat.speak event.target.value
  #     event.target.value = ""
  #     event.preventDefault()
