import React from 'react';
import { GET_API } from './types';

export const getApi = action => {
  return { type: GET_API, action };
};

export const toTitleCase = (str) => {
  if (typeof str !== 'string'){
    return str;
  }
  
  return str.replace(
      /\w\S*/g,
      (txt) => {
          return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
      }
  );
}

export const refsToValues = (refs) => {
  if (refs && typeof refs === "object"){
    let obj = {};
    refs._forEach(function(item, key) {
      obj[key] = item.current && item.current.value;
    });

    return obj;
  }

  throw new Error (`There was and error with the refs: ${refs}`);
}

export const formatPhone = number => {
  if (typeof number === "string" && number.length === 10){
    return number.replace(/(\d{3})(\d{3})(\d{4})/, "$1-$2-$3")
  } 

  return number;
}

var errorRegExp = /Error$/;

export const hasNoStateErrors = state => {
  for (let prop in state){
    if (errorRegExp.test(prop)){
      return (state[prop].message === null || state[prop].message === "") ? true : false;
    }
  }

  return true;
}

export const getElementAndAttributes = (elementID, useRoot = true) => {
  var element
  if (elementID){
    element = document.getElementById(elementID);
  }

  if (useRoot){
    if (!element) {
      element = document.getElementById('root');
    }

     if (!element) {
      throw new Error ("No root element found!")
    }
  } else {
    if (!element) {
      return false;
    }
  }

  var attrs = getAttributes(element);
  
  return {element, attrs};
}

export const getAttributes = (element) => {
  if (element && typeof element === 'object' ){

    let attrsArray = Array.prototype.map.call(element.attributes, (attr) => { return {[attr.name]:attr.value} });

    let attrs = attrsArray.reduce((i, acc) => Object.assign(acc, i), {})

    return attrs;
  }

  return false;
}

export const currency = (_price, isFree) => {
  var price = _price;

  if ( price === null || price === false || isNaN(price)) { // price of "0" is "free" not falsy
    return price;
  } else if (price === 0 && isFree) {
    return 'free';
  }

  if (typeof price === "string"){
    price = parseFloat(price)
  }

  return `$${price.toFixed(2)}`;
};



export const omit = (obj, blacklist) => {
  if (Array.isArray(blacklist)) {
    return Object.entries(obj)
      .filter(([key]) => !blacklist.includes(key))
      .reduce((obj, [key, val]) => Object.assign(obj, { [key]: val }), {});
  }

  throw new Error('blacklist needs to be an array');
};

export const formatDate = date => {
  return `${date.getFullYear()}-${pad( (date.getMonth() + 1) )}-${pad(date.getDate())}`; // must have a 1 based index for month
};

export const searchStringToObj = str => {
  var results = str.replace(/^\??/, '').split('='),
    obj = {};
  if (str) {
    for (let i = 0; i < results.length; i += 2) {
      let key = results[i],
        value = results[i + 1];

      if (booleanTest(value)) {
        value = value.toLowerCase() === 'true' ? true : false;
      }
      obj[key] = value;
    }
    return obj;
  }

  return false;
};

export const importAll = r => {
  return r.keys().map(r);
};


export const booleanTest = value =>
  value.toLowerCase() === 'true' || value.toLowerCase() === 'false';


export const isNotANumber = string => isNaN(parseInt(string, 10)); // trap for string === null conditon

export const validation = {
  telephone: /^\s*(?:\+?(\d{1,3}))?[-. (]*(\d{3})[-. )]*(\d{3})[-. ]*(\d{4})(?: *x(\d+))?\s*$/,
  email: /\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b/i,
  day: /(^0[1-9]$)|(^[1-2][0-9]$)|(^3[01]$)|(^[1-9]{1}$)/,
  year: /(^19\\d{2}$)|(^20\\d{2}$)/
};


export const validate = (str, pattern) => {
  if (validation[pattern]) {
    return validation[pattern].test(str);
  } else {
    let message = `Pattern ${pattern} is not supported!`;
    throw new Error(message);
  }
};

export const isEmpty = obj => {
  if (!obj) return true;
  return Object.keys(obj).length === 0 && obj.constructor === Object
    ? true
    : false;
};

export const createRefs = fields => {
  return fields.reduce(
    (acc, field) => Object.assign(acc, { [field]: React.createRef() }),
    {}
  );
};

export const scrollTo = (element) => {
  if (
    element &&
    element.parentElement &&
    element.parentElement.scrollIntoView
  ) {
    element.parentElement.scrollIntoView();
  }
}

export const pad = item => ('00' + item).slice(-2);

export const convertDayOfWeek = str => {
  switch (str) {
    case 'MON':
      return 'Monday';
    case 'TUE':
      return 'Tuesday';
    case 'WED':
      return 'Wednesday';
    case 'THU':
      return 'Thursday';
    case 'FRI':
      return 'Friday';
    case 'SAT':
      return 'Saturday';
    case 'SUN':
      return 'Sunday';
    default:
      return '--';
  }
};

