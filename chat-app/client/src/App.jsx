import React from 'react';
import { StreamChat } from 'stream-chat';
import { Chat } from 'stream-chat-react';
import Cookies from 'universal-cookie';
import { HelloChannelLists, HelloChannel, HelloAuth } from './components';

// import 'stream-chat-react/dist/css/index.css';

const cookies = new Cookies();

const api = import.meta.env.VITE_API_KEY;
const client = StreamChat.getInstance(api);

const Token = cookies.get('token');

if (Token) {
  client.connectUser({
    id: cookies.get('userId'),
    name: cookies.get('username'),
    fullName: cookies.get('fullName'),
    number: cookies.get('number'),
    hashPassword: cookies.get('hashPassword'),
  }, Token)
}

const App = () => {

  if (!Token) return <HelloAuth />

  return (
    <div className='app'>
      <Chat client={client}>
        {/* <Chat client={client} theme="messaging light"> */}
        <HelloChannelLists />
        {/* <HelloChannel /> */}
      </Chat>
    </div>
  )
}

export default App