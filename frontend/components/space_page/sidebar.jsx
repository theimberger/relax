import React from 'react';

const Sidebar = (props) => {

  let channelTitle = props.channel.title;
  if (props.channel.is_direct) {
    channelTitle = "this conversation";
  }

  if (!props.channel.is_direct) {
    channelTitle = `#${channelTitle}`;
  }

  const hide = () => {
    document.getElementsByClassName('right_nav')[0].style.display = "none";
  };

  const show = (name) => {
    let $clicked = $(name);
    $clicked.toggleClass("hidden");
    $clicked.parent().toggleClass("expanded");
  };
  
  return (
    <ul className="right_nav" style={{"display": "none"}}>
      <li id="channel_info_header">
        <h4>About {channelTitle}</h4>
        <span className="channel_info_button"
          onClick={hide}>✕</span>
      </li>
      <li onClick={() => show(".channel_details")}>
        <h4>Channel Details</h4>
        <span className="channel_info_button">▷</span>
        <div className="channel_details hidden">
          <p>{props.channel.purpose}</p>
        </div>

      </li>
      <li onClick={() => show(".members")}>
        <h4>Members</h4>
        <span className="channel_info_button">▷</span>
      </li>
    </ul>
  );
};

export default Sidebar;
