const LS_KEY_FREQ = 'freq';
class StringUtil {

  static formatNumber(num) {
    if (!num) {
      return "0";
    }
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
  }

  static flagImg(iso2) {
    if (!iso2) {
      return "";
    }
    return `https://corona.lmao.ninja/assets/img/flags/${iso2.toLowerCase()}.png`;
  }

  static getFreqCountries() {
    return localStorage.getItem(LS_KEY_FREQ) ? JSON.parse(localStorage.getItem(LS_KEY_FREQ)) :  ['US', 'IN', 'AU'];
  }

  static addFreqCountry(iso2) {
    if (!iso2) {
      return;
    }

    const freq = this.getFreqCountries();
    if (freq.indexOf(iso2) > -1) {
      return;
    }
    freq.push(iso2);
    while(freq.length > 5) {
      freq.shift();
    }
    localStorage.setItem(LS_KEY_FREQ, JSON.stringify(freq));
  }
}

export default StringUtil;