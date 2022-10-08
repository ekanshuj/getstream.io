import React from 'react'

const HelloChannelList = ({ children, error = false, loading }) => {

  if (loading) return <div>Loading...</div>;
  if (error) return console.log(error);

  return (
    <div>
      {children}
    </div>
  )
}

export default HelloChannelList