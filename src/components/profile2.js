import React, { useCallback, useEffect, useReducer } from "react";
import Input from "./input";
import './profile.css';

function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function reducer(state, action) {
  switch (action.type) {
    case "change":
      return {
        ...state,
        form: {
          ...state.form,
          [action.name]: action.value
        },
        status: 'unsubmitted',
        message: ''
      }
    case "submit":
      const emptyFields = Object.keys(state.form).filter((k) => !state.form[k]);
      const status = emptyFields.length > 0 ? 'error' : 'success';
      const message = (status === 'success' ? 'Form submitted!' : `${capitalizeFirstLetter(emptyFields.join(', '))} can not be empty`);

      return {
        ...state,
        status,
        message
      }
    default:
      throw new Error(`Unsupported action type: ${state.type}`);
  }
}

export default function Profile(props) {
  const initialProfile = props.profile || {};
  const [state, dispatch] = useReducer(reducer, {
    form: {
      name: initialProfile.name || '',
      gender: initialProfile.gender || 'unspecified',
      email: initialProfile.email || '',
      phone: initialProfile.phone || '',
    },
    status: 'unsubmitted',
    message: '',
  });

  const handleFormSubmit = useCallback((e) => {
    e.preventDefault();
    dispatch({ type: 'submit' });
  }, [state]);

  useEffect(() => {
    if (state.status === 'success') {
      console.log(state.form);
    }
  }, [state.status])

  return (
    <div className="app">
      <h1>{props.name}</h1>
      <form onSubmit={handleFormSubmit}>
        <label className="profile-form__row">
          Name:
          <Input
            value={state.form.name}
            error={state.status === 'error' && !state.form.name}
            name="name"
            type="text"
            onChange={(e) => dispatch({ type: 'change', name: 'name', value: e.target.value})}
          />
        </label>
        <label className="profile-form__row">
          Gender:
          <Input
            value={state.form.gender}
            name="gender"
            type="select"
            options={[
              { value: "unspecified", text: "Unspecified" },
              { value: "male", text: "Male" },
              { value: "female", text: "Female" },
            ]}
            onChange={(e) => dispatch({ type: 'change', name: 'gender', value: e.target.value})}
          />
        </label>
        <label className="profile-form__row">
          Email:
          <Input
            value={state.form.email}
            error={state.status === 'error' && !state.form.email}
            name="email"
            type="text"
            onChange={(e) => dispatch({ type: 'change', name: 'email', value: e.target.value})}
          />
        </label>
        <label className="profile-form__row">
          Phone:
          <Input
            value={state.form.phone}
            error={state.status === 'error' && !state.form.phone}
            name="phone"
            type="text"
            onChange={(e) => dispatch({ type: 'change', name: 'phone', value: e.target.value})}
          />
        </label>
        <div className="profile-form__row">
          <input type="submit" value="Save" />
        </div>
        <div className="profile-form__row">
          <span
            className={`profile-form__message ${state.status === 'error' ? 'profile-form__message--invalid' : ''}`}
          >
            {(state.status === 'success' || state.status === 'error') ? state.message : ''}
          </span>
        </div>
      </form>
    </div>
  );
}