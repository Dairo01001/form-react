import React, { useState } from "react";

interface InputError {
  username: string;
  password: string;
}

export function validate(input: InputError): InputError {
  let errors: InputError = { username: "", password: "" };

  if (!input.username) {
    errors.username = "Username is required";
  } else if (!/\S+@\S+\.\S+/.test(input.username)) {
    errors.username = "Username is invalid";
  }

  if (!input.password) {
    errors.password = "Password is required";
  } else if (!/(?=.*[0-9])/.test(input.password)) {
    errors.password = "Password is invalid";
  }

  return errors;
}

const Form = () => {
  const [input, setInput]: [InputError, CallableFunction] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors]: [InputError, CallableFunction] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });

    setErrors(
      validate({
        ...input,
        [e.target.name]: e.target.value,
      })
    );
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        setInput({ username: "", password: "" });
        setErrors({ username: "", password: "" });
      }}
    >
      <div>
        <label htmlFor="username">Username:</label>
        <input
          className={errors.username && ""}
          id="username"
          value={input.username}
          type="text"
          name="username"
          placeholder="Username..."
          onChange={handleInputChange}
        />
        {errors.username && <p>{errors.username}</p>}
      </div>

      <div>
        <label htmlFor="password">Password:</label>
        <input
          className={errors.password && ""}
          id="password"
          value={input.password}
          type="password"
          name="password"
          placeholder="Password..."
          onChange={handleInputChange}
        />
        {errors.password && <p>{errors.password}</p>}
      </div>

      <div>
        <input type="submit" value="Submit" />
      </div>
    </form>
  );
};

export default Form;
