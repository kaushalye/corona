class Trans {
  lk = {
    url: 'https://covid-19sl.s3-ap-northeast-1.amazonaws.com/data.json',
    fn: (data) => {
      return data.prefectures.filter(p => p.prefecture !== 'Total').map(p => ({
        name: `${p.prefecture} - ${p.prefecturesi}`,
        cases: parseInt(p.cases || "0"),
        deaths: parseInt(p.deaths || "0"),
        recovered: parseInt(p.recovered || "0"),
      }));
    }
  }

  nz = {
    url: 'https://disease.sh/v2/gov/NZ',
    fn: (data) => {
      return data.provinces.filter(p => p.province !== 'Total').map(p => ({
        name: `${p.province}`,
        cases: parseInt(p.cases || "0"),
        deaths: parseInt(p.deaths || "0"),
        recovered: parseInt(p.recovered || "0"),
      }));
    }
  }

  vn = {
    url: 'https://disease.sh/v2/gov/VN',
    fn: (data) => {
      return data.filter(p => p.city !== 'Total').map(p => ({
        name: `${p.city}`,
        cases: parseInt(p.cases || "0"),
        deaths: parseInt(p.deaths || "0"),
        recovered: parseInt(p.recovered || "0"),
      }));
    }
  }


  $in = {
    url: 'https://api.covid19india.org/state_district_wise.json',
    fn: (data) => {
      const stateKeys = Object.keys(data);
      const statedata = [];
      stateKeys.forEach(stateKey => {
        const singleState =  data[stateKey];
        const districtData = singleState['districtData'];
        const districtDataKeys = Object.keys(districtData);
        districtDataKeys.forEach(districtDataKey => {
          const singleDistrict = districtData[districtDataKey];
          if (districtDataKey === 'Unknown' || parseInt(singleDistrict.active) < 0) {
            return;
          }
          statedata.push({
            name: stateKey+" - "+districtDataKey,
            cases: singleDistrict.active,
            deaths: singleDistrict.deceased,
            recovered: singleDistrict.recovered,
          })
        })
      });

      return statedata;
    }
  }

  us = {
    url: 'https://disease.sh/v2/states?sort=cases',
    fn: (data) => {
      return data.map(p => ({
        name: p.state,
        cases: parseInt(p.cases || "0"),
        deaths: parseInt(p.deaths || "0"),
        recovered: parseInt(p.recovered || "0"),
      }))
    }
  }

  jp = {
    url: 'https://covid19-japan-web-api.now.sh/api/v1/prefectures',
    fn: (data) => {
      return data.map(p => ({
        name: `${p.name_en} - ${p.name_ja}`,
        cases: parseInt(p.cases || "0"),
        deaths: parseInt(p.deaths || "0"),
        recovered: parseInt(p.recovered || "0"),
      }))
    }
  }

  ca = {
    url: 'https://api.apify.com/v2/key-value-stores/fabbocwKrtxSDf96h/records/LATEST?disableRedirect=true',
    fn: (data) => {
      return data.infectedByRegion.map(p => ({
        name: `${p.region}`,
        cases: parseInt(p.infectedCount || "0"),
        deaths: parseInt(p.deceasedCount || "0"),
        recovered: "0",
      }))
    }
  }

  ge = {
    url: 'https://api.apify.com/v2/key-value-stores/OHrZyNo9BzT6xKMRD/records/LATEST?disableRedirect=true',
    fn: (data) => {
      return data.infectedByRegion.map(p => ({
        name: `${p.region}`,
        cases: parseInt(p.infectedCount || "0"),
        deaths: parseInt(p.deceasedCount || "0"),
        recovered: "0",
      }))
    }
  }

  ng = {
    url: 'https://api.apify.com/v2/key-value-stores/Eb694wt67UxjdSGbc/records/LATEST?disableRedirect=true',
    fn: (data) => {
      return data.regions.map(p => ({
        name: `${p.region}`,
        cases: parseInt(p.onAdmissionCases || "0"),
        deaths: parseInt(p.deaths || "0"),
        recovered: parseInt(p.discharged || "0"),
      }))
    }
  }

  pa = {
    url: 'https://api.apify.com/v2/key-value-stores/SbribCOVf2wgR868y/records/LATEST?disableRedirect=true',
    fn: (data) => {
      return data.infecterByRegion.map(p => ({
        name: `${p.region}`,
        cases: parseInt(p.infected || "0"),
        deaths: "0",
        recovered: "0",
      }))
    }
  }

  mx = {
    url: 'https://api.apify.com/v2/key-value-stores/vpfkeiYLXPIDIea2T/records/LATEST?disableRedirect=true',
    fn: (data) => {
      const stateKeys = Object.keys(data.State);
      const statedata = [];

      stateKeys.forEach(stateKey => {
        const singleState =  data.State[stateKey];
        statedata.push({
          name: stateKey,
          cases: singleState.infected,
          deaths: singleState.deceased,
          recovered: "0",
        })
      });
      return statedata;
    }
  }

  sa = {
    url: 'https://api.apify.com/v2/key-value-stores/40xwYCZ57p5OkyBIJ/records/LATEST?disableRedirect=true',
    fn: (data) => {
      const stateKeys = Object.keys(data);
      const statedata = [];

      stateKeys.forEach(stateKey => {
        const singleState =  data[stateKey];
        if (/[\u0600-\u06FF]/.test(stateKey.charAt(0))) {
          statedata.push({
            name: stateKey,
            cases: singleState.infected,
            deaths: singleState.deceased,
            recovered: singleState.recovered,
          })
        }
      });
      return statedata;
    }
  }

  br = {
    url: 'https://api.apify.com/v2/key-value-stores/TyToNta7jGKkpszMZ/records/LATEST?disableRedirect=true',
    fn: (data) => {
      return data.infectedByRegion.map(p => ({
        name: `${p.state}`,
        cases: parseInt(p.count || "0"),
        deaths: parseInt((data.deceasedByRegion || []).filter(d => d.state === p.state).map(d => d.count)[0] || "0"),
        recovered: "0",
      }))
    }
  }

  sk = {
    url: 'https://api.apify.com/v2/key-value-stores/GlTLAdXAuOz6bLAIO/records/LATEST?disableRedirect=true',
    fn: (data) => {
      return data.infectedByRegion.map(p => ({
        name: `${p.region}`,
        cases: parseInt(p.infectedCount || "0"),
        deaths: "0",
        recovered: "0",
      }))
    }
  }

  se = {
    url: 'https://api.apify.com/v2/key-value-stores/8mRFdwyukavRNCr42/records/LATEST?disableRedirect=true',
    fn: (data) => {
      return data.infectedByRegion.map(p => ({
        name: `${p.region}`,
        cases: parseInt(p.infectedCount || "0"),
        deaths: parseInt(p.deathCount || "0"),
        recovered: "0",
      }))
    }
  }

  ch = {
    url: 'https://api.apify.com/v2/key-value-stores/lDegAca820XgvjE0C/records/LATEST?disableRedirect=true',
    fn: (data) => {
      return data.infectedByRegion.map(p => ({
        name: `${p.region}`,
        cases: parseInt(p.infected || "0"),
        deaths: "0",
        recovered: "0",
      }))
    }
  }

  pl = {
    url: 'https://api.apify.com/v2/key-value-stores/3Po6TV7wTht4vIEid/records/LATEST?disableRedirect=true',
    fn: (data) => {
      return data.infectedByRegion.map(p => ({
        name: `${p.region}`,
        cases: parseInt(p.infectedCount || "0"),
        deaths: parseInt(p.deceasedCount || "0"),
        recovered: "0",
      }))
    }
  }

  pt = {
    url: 'https://api.apify.com/v2/key-value-stores/BXGEYTTUQzYBboEQK/records/LATEST?disableRedirect=true',
    fn: (data) => {
      return data.infectedByRegion.map(p => ({
        name: `${p.region}`,
        cases: parseInt(p.value || "0"),
        deaths:  "0",
        recovered: "0",
      }))
    }
  }

  ru = {
    url: 'https://api.apify.com/v2/key-value-stores/1brJ0NLbQaJKPTWMO/records/LATEST?disableRedirect=true',
    fn: (data) => {
      return data.infectedByRegion.map(p => ({
        name: `${p.isoCode} - ${p.region}`,
        cases: parseInt(p.infected || "0"),
        deaths:  parseInt(p.deceased || "0"),
        recovered: parseInt(p.recovered || "0"),
      }))
    }
  }

  no = {
    url: 'https://api.apify.com/v2/key-value-stores/3qlmMu1XN2ZLoVIQt/records/LATEST?disableRedirect=true',
    fn: (data) => {
      return data.infectedByRegion.map(p => ({
        name: `${p.region}`,
        cases: parseInt(p.infectedCount || "0"),
        deaths: parseInt((data.deceasedByRegion || []).filter(d => d.state === p.state).map(d => d.count)[0] || "0"),
        recovered: "0",
      }))
    }
  }

}

export default Trans;