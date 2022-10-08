import React from 'react';
import { Avatar, useChatContext } from 'stream-chat-react';
import styled from 'styled-components';


const PREVIEW = styled.div`
  border: 1px solid red;
  background: greenyellow;
`;

const DIVISION = styled.div`  
  border: 1px solid black;
  background: fuchsia;
  cursor: pointer;
`;

const HelloChannelPreview = ({ channel }) => {
  const { channel: Channel, client } = useChatContext();
  // const { client } = useChatContext();

  const ChannelPreview = () => {
    const members = Object.values(channel.state.members).filter(({ user }) => user?.id !== client.userID);
    console.log(members[0]);
    return (
      <PREVIEW>
        {/* <div className="avatar"> */}
        <Avatar
          image={members[0]?.user?.fullName.charAt(0)}
          name={members[0]?.user?.fullName || members[0]?.user?.id}
          size={52}
        />
        {/* </div> */}
        <p>{members[0]?.user?.fullName}</p>
      </PREVIEW>
    )
  }

  return (
    <DIVISION className={channel?.id === Channel?.id ? 'selected' : 'blank'} onClick={() => console.log('channel-selected')}>
      <ChannelPreview />
    </DIVISION>
  )
}

export default HelloChannelPreview