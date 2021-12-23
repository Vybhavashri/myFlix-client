import React, { useState } from 'react';
import PropTypes from 'prop-types';
import axios from 'axios';

import { Form, Button, Container } from 'react-bootstrap';

function RegistrationView(props) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');
  const [birth, setBirth] = useState('');

  const handleSubmit = (e) => { };

  return (
    <form>
      <label>
        Username:
        <input type="text" value={username} />
      </label>
      <label>
        Password:
        <input type="password" value={password} />
      </label>
      <label>
        Email:
        <input type="email" value={email} />
      </label>
      <label>
        Birth date:
        <input type="date" value={birth} />
      </label>
      <button type="submit" onClick={handleSubmit}>Register</button>
    </form>
  );
}
RegistrationView.propTypes = {
  register: PropTypes.shape({
    Username: PropTypes.string.isRequired,
    Password: PropTypes.string.isRequired,
    Email: PropTypes.string.isRequired,
    Birth: PropTypes.date
  })
};

export default RegistrationView;