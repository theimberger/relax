import React from 'react';

const Header = (props) => {
  console.log(props);
  return (
    <header className="space_header">
      <section>
        <h4>#{props.activeChannel.title}</h4>
        <h5>Users</h5>
      </section>
      <section>
        Some stuff...
      </section>
    </header>
  );
};

export default Header;
