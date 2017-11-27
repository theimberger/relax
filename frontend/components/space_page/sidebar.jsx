import React from 'react';

const Sidebar = (props) => {

  const Months = [
    "January",
    "Febuary",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let channelTitle = props.channel.title;
  if (props.channel.is_direct) {
    channelTitle = "this conversation";
  }

  if (!props.channel.is_direct) {
    channelTitle = `#${channelTitle}`;
  }

  const toggleVis = (selector) => {
    $(selector).toggleClass("hidden");
  };

  let date = Date.parse(props.channel.created_at);
  date = new Date(date);

  if (Date.now() - date < 60000) {
    date = "Just now.";

  } else if (Date.now() - date < 86400000) {

    let displayDate = "",
        pm = false;

    if (date.getHours() > 12){
      displayDate = (date.getHours() - 12).toString();
      pm = true;
    } else if (date.getHours() === 0) {
      displayDate = "12";
    }

    if (date.getMinutes() > 9) {
      displayDate += ":"+ date.getMinutes();
    } else {
      displayDate += ":0"+ date.getMinutes();
    }

    if (pm) {
      displayDate += " PM";
    } else {
      displayDate += " AM";
    }
    date = "Today at " + displayDate;

  } else {
    date = `${Months[date.getMonth()]} ${date.getDay()}, ${date.getFullYear()}`;
  }

  let created = <div>
      <h5>Created</h5><br/>
      <p>{date}</p>
    </div>;

  let purpose = <div>
      <h5>Channel purpose</h5><br/>
      <p>{props.channel.purpose}</p>
    </div>;

  let members = props.channel.users.map((user) => {
    return <li key={user.id}>{user.username}</li>;
  });

  if (props.channel.purpose === null
    || props.channel.purpose === ""
    || props.channel.purpose === undefined) {
    purpose = "";
  }

  return (
    <ul className="right_nav hidden">
      <li id="channel_info_header">
        <h4>About {channelTitle}</h4>
        <span className="channel_info_button"
          onClick={() => toggleVis(".right_nav")}>✕</span>
      </li>
      <li onClick={() => toggleVis(".channel_details")}>
        <h4 style={{"paddingLeft": "5px"}}>
          <i className="fa fa-info" aria-hidden="true"></i> Channel Details
        </h4>
        <span className="channel_info_button">▷</span>
        <div className="channel_details hidden">
            {created}
            {purpose}
        </div>

      </li>
      <li onClick={() => toggleVis(".channel_members")}>

        <h4>
          <i className="fa fa-user-o" aria-hidden="true"></i> Members
        </h4>
        <span className="channel_info_button">▷</span>

        <div className="channel_members hidden">
            <ul>
              {members}
            </ul>
        </div>

      </li>
    </ul>
  );
};

export default Sidebar;
