import React from 'react';
import RegionGraph from './graph';

const Timeline = ({regions}) => {
  const regionNames = regions.map(r => r.state);
  return (
    <div>
      {regions.map((region, index) => {
        return <RegionGraph region={region}/>;
      })}
    </div>
    
    );
};
export default Timeline;