import React, { useState } from 'react';

import styled from 'styled-components';
import Cookies from 'universal-cookie';
import axios from 'axios';

const Division = styled.div`
  display: grid;
  place-items: center;
  place-content: center;
  height: 100vh;
  width: 100vw;
  background: rgb(250, 250, 250);

  .bottom {
  margin: 10px 0px;
  padding: 15px 10px;

  span {
  font-size: 1.255rem;
  }
  button {
  border: none;
  background: none;
  font-size: 1.235rem;
  margin-inline: 7px;
  font-weight: bold;

  :hover {
  text-decoration: underline;
  }
  }
  }
`
const Container = styled.div`
  padding: 20px;
  background: rgb(255, 255, 255);
  width: 500px;
  box-shadow: 7px 9px 5px -1px #edd1d1;
  border-radius: 7px;

  .head {
    padding: 25px 20px;
    font-weight: bold;  
  }

`
const Form = styled.form.attrs(props => ({
  action: "#"
}))`
.name,
.username,
.number,
.password,
.confirmPassword {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  padding: 10px 20px;
}

.span {
  margin: 5px 0px;
  font-size: 0.755rem;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: bolder;
  color: rgb(191, 191, 191);
}

.inputs {
  padding: 16px 15px;
  width: 100%;
  font-size: 15px;
  border-radius: 5px;
  outline-color: gray;
  border: 1px solid rgb(191, 191, 191);

  ::placeholder {
  color: rgb(191, 191, 191);
  }

}

`
const Control = styled.div`
  padding: 25px 20px;

button {
  width: 100%;
  padding: 10px 0px;
  border: 2px solid #09363f;
  background: transparent;
  font-size: 1.05rem;
  text-transform: uppercase;
  letter-spacing: 1px;
  font-weight: 700;
  border-radius: 7px;
  cursor: pointer;

  :hover {
  background: #09363f;
  color: ghostwhite;
  }
}
`

const cookies = new Cookies();

const initialState = {
  fullName: '',
  username: '',
  number: '',
  password: '',
  confirmPassword: ''
}

const HelloAuth = () => {
  const [isSignup, setIsSignup] = useState(true);
  const [form, setForm] = useState(initialState);

  const switchToggle = () => {
    setIsSignup((prevState) => !prevState);
  }

  const toggleHandle = (elem) => {
    setForm({ ...form, [elem.target.name]: elem.target.value })
  }

  const handleSubmit = async (elem) => {
    elem.preventDefault();

    const { fullName, username, number, password } = form;
    const URL = 'http://localhost:5000/auth';

    const { data: { token, userId, hashPassword } } = await axios.post(`${URL}/${isSignup ? 'signup' : 'signin'}`, {
      fullName, username, number, password
    });


    cookies.set('fullName', fullName);
    cookies.set('username', username);
    cookies.set('token', token);
    cookies.set('userId', userId);

    if (isSignup) {
      cookies.set('number', number);
      cookies.set('hashPassword', hashPassword);
    }

    window.location.reload();
  }

  return (
    <>
      <Division>
        <Container>
          <div className="head">
            <h1>
              {isSignup ? 'Sign Up' : 'Sign In'}
            </h1>
          </div>
          <Form onSubmit={handleSubmit}>
            {isSignup && (
              <div className="name">
                <span className='span'>Name</span>
                <input
                  type="text"
                  placeholder='john wick'
                  name='fullName'
                  className='inputs'
                  onChange={toggleHandle} required />
              </div>
            )}
            <div className="username">
              <span className='span'>Username</span>
              <input
                type="text"
                placeholder='@username'
                name='username'
                className='inputs'
                onChange={toggleHandle} required />
            </div>
            {isSignup && (
              <div className="number">
                <span className='span'>Number</span>
                <input
                  type="number"
                  placeholder='+123456789'
                  name='number'
                  className='inputs'
                  onChange={toggleHandle} required />
              </div>
            )}
            <div className="password">
              <span className='span'>Password</span>
              <input
                type="password"
                placeholder='Password'
                name='password'
                className='inputs'
                onChange={toggleHandle} required />
            </div>
            {isSignup && (
              <div className="confirmPassword">
                <span className='span'>Confirm Password</span>
                <input
                  type="password"
                  placeholder='Confirm your password'
                  name='confirmPassword'
                  className='inputs'
                  onChange={toggleHandle} required />
              </div>
            )}
            <Control>
              <button type="submit">
                {isSignup ? 'get started' : 'get in'}
              </button>
            </Control>
          </Form>
        </Container>
        <div className="bottom">
          <span>{isSignup ? 'Already have an account !' : 'New here !'}</span>
          <button onClick={switchToggle}>{isSignup ? 'Sign In' : 'Sign Up'}</button>
        </div>
      </Division>
    </>
  )
}

export default HelloAuth