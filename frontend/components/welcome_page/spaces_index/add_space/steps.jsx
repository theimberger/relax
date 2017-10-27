import React from 'react';

export const one = (passInfoToParent, defaultValue) => (
  <form onSubmit={ (e) => passInfoToParent(e) }>

    <label>What's your space called?</label>
    <input value={defaultValue} onChange={(e) => passInfoToParent(e)}></input>
    <button>Next</button>

  </form>
);

export const two = (passInfoToParent, ...defaultValues) => (
  <form onSubmit={ (e) => passInfoToParent(e) }>

    <label>Give your space a description (optional).</label>
    <textarea defaultValue={defaultValues[0]} onChange={(e) => passInfoToParent(e)}>

    </textarea>
    <button>{defaultValues[1]}</button>

  </form>
);

export const three = (passInfoToParent, ...defaultValues) => (
  <form onSubmit={ (e) => passInfoToParent(e) }>

    <label>Invite some buddies (optional).</label>
    <input value={defaultValues[0]} onChange={(e) => passInfoToParent(e)}>

    </input>
    <button>Send Invitations</button>

  </form>
);
