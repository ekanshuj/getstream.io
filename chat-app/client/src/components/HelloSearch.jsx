import React, { useState } from 'react'

import styled from 'styled-components';


const Division = styled.div`
  display : flex;
  align-items : center;
  justify-content : center;
  flex : 1;
  padding : 7px 3px;
`;

const Input = styled.input.attrs(props => ({
  type: "search",
}))`
flex : 1;
padding : 9px;

::placeholder,
::-webkit-input-placeholder {
  color : rgb(61, 60, 60);
  font-size : 1rem;
}

&:focus  {
background : rgb(255, 255, 255);
}

background : #e7e7e7;
border: none;
border-radius : 3px;
`;

const HelloSearch = () => {

  const [value, setValue] = useState('');
  const toggleChange = (elem) => {
    elem.preventDefault();
    setValue(elem.target.value);
  }

  return (
    <Division>
      <Input placeholder="search"
        name="search"
        id="search"
        value={value}
        onChange={toggleChange} />
    </Division>
  )
}

export default HelloSearch




// Channel TODO