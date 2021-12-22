import React, { useState } from 'react';

function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, password, email, birth);
    props.onLoggedIn(username);
  };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} onChange={e => setUsername(e.target.value)} />
      </label>
      <label>
        Password:
        <input type="password" value={password} onChange={e => setPassword(e.target.value)} />
      </label>
      <label>
        Email:
        <input type="email" value={email} onChange={e => setEmail(e.target.value)} />
      </label>
      <label>
        Birth date:
        <input type="date" value={birth} onChange={e => setBirth(e.target.value)} />
      </label>
      <button type="submit" onClick={handleSubmit}>Register</button>
    </form>
  );
}

export default RegistrationView;