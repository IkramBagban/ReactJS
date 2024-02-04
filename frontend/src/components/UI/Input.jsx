import React, { useState } from "react";
import styles from "./Input.module.css";
import { MdVisibility, MdVisibilityOff } from "react-icons/md";

const Input = ({
  type = "text",
  name,
  value,
  onChange,
  label,
  id,
  placeholder,
  required,
}) => {
  const [inputType, setInputType] = useState(type);
  const [isPasswordVisible, setPasswordVisibility] = useState(false);

  const togglePasswordVisibility = () => {
    setPasswordVisibility(!isPasswordVisible);
    setInputType(inputType === "password" ? "text" : "password");
  };

  return (
    <div className={styles.container}>
      <label htmlFor={id}>{label}</label>
      <div className={styles.inputGroup}>
        <input
          type={inputType}
          placeholder={placeholder}
          value={value}
          id={id}
          name={name}
          onChange={onChange}
          required={required}
          className={styles.inputField}
        />
        {type === "password" && (
          <button
            onClick={togglePasswordVisibility}
            type="button"
            className={styles.visibilityToggle}
          >
            {isPasswordVisible ? <MdVisibilityOff /> : <MdVisibility />}
          </button>
        )}
      </div>
    </div>
  );
};

export default Input;
