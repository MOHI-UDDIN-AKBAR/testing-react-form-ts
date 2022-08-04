import React, { useState, useEffect } from "react";

const Form = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [isValidEmail, setIsValidEmail] = useState(false);
  const [isValidPassWord, setIsValidPassword] = useState(false);
  const [isValidMatching, setIsValidMatching] = useState(false);
  const [isEmailEmpty, setIsEmailEmpty] = useState(false);

  const handleSubmit = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    if (email) {
      setIsEmailEmpty(false);
      const filter =
        /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
      if (!filter.test(email)) {
        setIsValidEmail(true);
      } else {
        setIsValidEmail(false);
      }
    } else {
      setIsEmailEmpty(true);
    }
    if (password.length < 5) {
      setIsValidPassword(true);
    } else {
      setIsValidPassword(false);
    }
    if (confirmPassword !== password) {
      setIsValidMatching(true);
    } else {
      setIsValidMatching(false);
    }
  };

  return (
    <div className="form">
      {/* <form> */}
      <div className="email">
        <label htmlFor="email">
          Email:
          <input
            type="email"
            name="email"
            title="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        {isEmailEmpty ? (
          <span>email is empty</span>
        ) : (
          isValidEmail && <span>in valid email</span>
        )}
      </div>
      <div className="password">
        <label htmlFor="password">
          Password:
          <input
            type="password"
            name="password"
            title="password"
            id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>
        {isValidPassWord && (
          <span>in valid password. should be at least 5 character</span>
        )}
      </div>
      <div className="confirm-password">
        <label htmlFor="confirm-password">
          confirm-Password:
          <input
            type="password"
            name="confirm-password"
            title="confirm-password"
            id="confirm-password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </label>
        {isValidMatching && <span>in valid Matching</span>}
      </div>
      <button type="button" onClick={handleSubmit}>
        Submit
      </button>
      {/* </form> */}
    </div>
  );
};

export default Form;
