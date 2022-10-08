import React, { useEffect, useState } from 'react';
import Cookies from 'universal-cookie';
import styled from 'styled-components';
import menu from '../assets/menu.png'

import { ChannelList, useChatContext } from 'stream-chat-react';
import { HelloSearch, HelloChannelList, HelloChannelPreview } from './';

const cookies = new Cookies();

const Division = styled.div`
background : rgb(255, 255, 255);
width : 25rem;
height : 100vh;
text-transform : uppercase;
font-weight : bold;
font-size : 1.355rem;
box-shadow : 7px 9px 5px -1px #edd1d1;

.hello__section {
  height: inherit;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 99;
  width: 5rem;
  display: none;
  background : rgb(255, 255, 255);
  align-items: flex-start;
  justify-content: center;
  padding: 11px 0px;

  button {
    background: transparent;
    border: none;
    margin: 17px 12px;
    cursor: pointer;

    :hover {
      text-decoration: underline red solid 3px;
      transform: scale(1.1) translateY(-7px);
      transition: 0.3s;
    }
  }

}

.blocker {
  display: none;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  content: ' ';
  background: rgba(0,0,0,0.2);
  z-index: 99;
}

.navigation {
  display : flex;
  align-items : center;
  justify-content : center;
  padding : 7px;
  position: fixed;
  left: 0px;
  top: 0px;
  width: inherit;
  background: rgb(255, 255, 255);
  z-index: 9;
}

.menu {
  background : url(${menu}) no-repeat center center/cover;
  aspect-ratio: 1;
  width: 25px;
  cursor : pointer;
  margin: 0px 9px;
  z-index: 999;
}

`;

const Aside = styled.div`
  padding : 9px;
  position: fixed;
  top: 55px;
  left: 0px;
  bottom: 0px;
  overflow-y: scroll;
  width: inherit;

  -ms-overflow-style: none;
  scrollbar-width: none;
   ::-webkit-scrollbar {
    /* width: 10px; */
    display: none;
  }

  /*
  ::-webkit-scrollbar-track {
    background: #dddddd;
  }

  ::-webkit-scrollbar-thumb {
    background: #db1d5c;
  } */

  .column {
    margin : 7px 3px;
    padding : 13px 7px;
    font-size : 1rem;
    border : 2px solid black;
  }
`;


const toggle = () => {
  const helloSection = document.querySelector('.hello__section');
  const blocker = document.querySelector('.blocker');
  helloSection.style.display = 'flex';
  blocker.style.display = 'block';
}

const hide = () => {
  const helloSection = document.querySelector('.hello__section');
  const blocker = document.querySelector('.blocker');
  helloSection.style.display = 'none';
  blocker.style.display = 'none';
}


const HelloChannelLists = () => {
  const { client } = useChatContext();

  const sort = { last_message_at: -1 };
  const filters = { type: 'messaging', members: { $in: [client.userID] } };

  const logout = () => {
    cookies.remove('token');
    cookies.remove('userId');
    cookies.remove('username');
    cookies.remove('fullName');
    cookies.remove('number');
    cookies.remove('hashPassword');

    window.location.reload();
  }

  return (
    <>
      <Division>
        <div className="blocker" onClick={hide}></div>
        <div className="hello__section">
          <button onClick={logout} className="material-symbols-outlined">Logout</button>
        </div>
        <div className='navigation'>
          <div className='menu' onClick={toggle}></div>
          <HelloSearch />
        </div>
        <Aside>
          {/* <div className="column"> */}
          <ChannelList
            filters={filters}
            sort={sort}
            List={(props) => (
              <HelloChannelList
                {...props}
                type="messaging" />
            )}
            Preview={(props) => (
              <HelloChannelPreview
                {...props}
                type="messaging" />
            )}
          />
          {/* </div> */}
        </Aside>
      </Division >
    </>
  )
}

export default HelloChannelLists