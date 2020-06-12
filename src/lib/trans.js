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

}

export default Trans;