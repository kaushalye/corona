import React from 'react'

const Stats = ({countries}) => {
  return (
    <div>
      <center><h1>Corona stats</h1></center>
      {countries.map( (c) => (
          <div class="card">
              <div class="card-body">
                <h5 class="card-title">{c.country}</h5>
                <h6 class="card-subtitle mb-2 text-muted">{c.cases}</h6>
                <p class="card-text">{c.countryInfo.iso2}</p>
              </div>
            </div>
        ))}
    </div>
  )
};

export default Stats