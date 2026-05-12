export const unicodeToKrutiDev = (text) => {
  let str = text;

  // Remove unsupported symbol
  str = str.replace(/₹/g, "Rs.");

  // Handle "ि"
  str = str.replace(/([क-ह])ि/g, "f$1");

  // Common ligatures
  str = str.replace(/क्ष/g, "{");
  str = str.replace(/त्र/g, "=");
  str = str.replace(/ज्ञ/g, "K");
  str = str.replace(/हज़ार/g, "हजार");
str = str.replace(/सिर्फ़/g, "सिर्फ");

  const map = {
    "क": "d", "ख": "[k", "ग": "x", "घ": "?k",
    "च": "p", "छ": "N", "ज": "t", "झ": "÷",
    "ट": "V", "ठ": "B", "ड": "M", "ढ": "<",
    "त": "r", "थ": "F", "द": "n", "ध": "/", "न": "u",
    "प": "i", "फ": "Q", "ब": "c", "भ": "H", "म": "e",
    "य": ";", "र": "j", "ल": "y", "व": "o",
    "श": "'k", "ष": "'k", "स": "l", "ह": "g",".":"-",

    "ा": "k", "ी": "h", "ु": "q", "ू": "w",
    "े": "s", "ै": "S", "ो": "ks", "ौ": "kS",
    "ं": "a", "ः": "%", "ँ": "¡", "्": "~",

    "0": "0", "1": "1", "2": "2", "3": "3", "4": "4",
    "5": "5", "6": "6", "7": "7", "8": "8", "9": "9",

    "/":"@",

    " ": " "
  };

  let result = "";
  for (let char of str) {
    result += map[char] || char;
  }

  return result;
};