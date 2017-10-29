import React from 'react';

export const one = (passInfoToParent, status, defaultValue) => (
  <form className={status} onSubmit={ (e) => passInfoToParent(e) }>

    <label>What's your space called?</label>
    <input value={defaultValue} onChange={(e) => passInfoToParent(e)}></input>
    <button>Next</button>

  </form>
);

export const two = (passInfoToParent, status, defaultValue) => {

  let buttonText = "Next";
  if (defaultValue === "") {
    buttonText = "Skip";
  }

  return (
    <form className={status} onSubmit={ (e) => passInfoToParent(e) }>

      <label>Give your space a description (optional).</label>
      <textarea defaultValue={defaultValue}
        onChange={(e) => passInfoToParent(e)}></textarea>

      <button>{buttonText}</button>

    </form>
  );
};

export const three = (passInfoToParent, status, ...defaultValues) => {
  let buttonText = "Invite";
  if (defaultValues[0][0] === "") {
    buttonText = "Skip";
  }

  let friends = defaultValues[0].map((friend, idx) => {
    return (
        <input
          value={friend}
          key={idx} idx={idx}
          onChange={(e) => passInfoToParent(e)}
        />
    );
  });
  return (
    <form className={status}
      onSubmit={ (e) => passInfoToParent(e) }>

      <label>Send Invitations (optional).</label>
      <h3>Username</h3>
      {friends}
      <button type="submit" hidden></button>
      <button type="button" onClick={ (e) => passInfoToParent(e)}>
        {buttonText} and go to {defaultValues[1]}
      </button>

    </form>
  );
};
