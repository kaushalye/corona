import React from 'react';
import Timeline from './timeline';

const Country = ({regions}) => {
  return (
    <Timeline regions={regions}/>
  );
};

export default Country;