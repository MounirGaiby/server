const isNumber = (string) => {
  if (!isNaN(string)) {
    const number = Number(string);
    return number;
  } else {
    return string;
  }
};

const filterKeyName = (data, newData, filtered_string) => {
  for (const key in data) {
    if (key.startsWith(filtered_string)) {
      if (key.replace(filtered_string, "") != "telephone") {
        newData[key.replace(filtered_string, "")] = isNumber(data[key]);
      } else {
        newData[key.replace(filtered_string, "")] = data[key];
      }
    }
  }
};

const filterBanques = (data, keysArray) => {
  const finalData = [];
  let data1 = {},
    data2 = {},
    data3 = {};
  let check = 0;
  for (let key in keysArray) {
    try {
      data1[keysArray[key]] = JSON.parse(data.banque1)[`${keysArray[key]}1`];
      if (data1[keysArray[0]] == "") {
        check = 1;
        break;
      }
    } catch (error) {
      console.log(`Error parsing JSON: ${error}`);
    }
  }
  if (check == 0) {
    finalData.push(data1);
  } else {
    check = 0;
  }
  for (let key in keysArray) {
    try {
      data2[keysArray[key]] = JSON.parse(data.banque2)[`${keysArray[key]}2`];
      if (data2[keysArray[1]] == "") {
        check = 1;
        break;
      }
    } catch (error) {
      console.log(`Error parsing JSON: ${error}`);
    }
  }
  if (check == 0) {
    finalData.push(data2);
  } else {
    check = 0;
  }
  for (let key in keysArray) {
    try {
      data3[keysArray[key]] = JSON.parse(data.banque3)[`${keysArray[key]}3`];
      if (data3[keysArray[2]] == "") {
        check = 1;
        break;
      }
    } catch (error) {
      console.log(`Error parsing JSON: ${error}`);
    }
  }
  if (check == 0) {
    finalData.push(data3);
  } else {
    check = 0;
  }
  return finalData;
};
const filterCommerciales = (data, keysArray) => {
  const finalData = [];
  let data1 = {},
    data2 = {},
    data3 = {};
  let check = 0;
  for (let key in keysArray) {
    try {
      data1[keysArray[key]] = JSON.parse(data.ref1)[`${keysArray[key]}1`];
      if (data1[keysArray[0]] == "") {
        check = 1;
        break;
      }
    } catch (error) {
      console.log(`Error parsing JSON: ${error}`);
    }
  }
  if (check == 0) {
    finalData.push(data1);
  } else {
    check = 0;
  }
  for (let key in keysArray) {
    try {
      data2[keysArray[key]] = JSON.parse(data.ref2)[`${keysArray[key]}2`];
      if (data2[keysArray[1]] == "") {
        check = 1;
        break;
      }
    } catch (error) {
      console.log(`Error parsing JSON: ${error}`);
    }
  }
  if (check == 0) {
    finalData.push(data2);
  } else {
    check = 0;
  }
  for (let key in keysArray) {
    try {
      data3[keysArray[key]] = JSON.parse(data.ref3)[`${keysArray[key]}3`];
      if (data3[keysArray[2]] == "") {
        check = 1;
        break;
      }
    } catch (error) {
      console.log(`Error parsing JSON: ${error}`);
    }
  }
  if (check == 0) {
    finalData.push(data3);
  } else {
    check = 0;
  }
  return finalData;
};

module.exports = {
  filterKeyName,
  filterBanques,
  filterCommerciales,
};
