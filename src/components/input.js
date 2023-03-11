import React, { useCallback, useState } from "react";

export default function Input(props) {
  const [value, setValue] = useState(props.value);
  const handleOnChange = useCallback((e) => {
    setValue(e.target.value);
    props.onChange && props.onChange(e);
  }, [props.value, props.onChange]);

  if (props.type === 'select') {
    return <select
      value={value}
      className="profile-form__field profile-form__select" name={props.name}
      onChange={handleOnChange}
    >
      {props.options.map(({ value, text }) => <option key={value} value={value}>{text}</option>)}
    </select>
  }
  return <input
      value={value}
      type="text"
      onChange={handleOnChange}
      className={`profile-form__field ${props.error ? 'profile-form__field--invalid' : ''}`}
      name={props.name}
    />;
}