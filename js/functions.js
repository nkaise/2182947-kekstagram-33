function checkStringLength (string, maxLength) {
  return string.length <= maxLength;
}

checkStringLength();

function isPalindrome (string) {
  string = string.replaceAll(' ', '').toLowerCase();
  let validateString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    validateString += string[i];
  }
  return string === validateString;
}

isPalindrome();

function extractNumberFromString (string) {
  let number = '';
  const numberList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < string.length; i++) {
    if (string[i] in numberList) {
      number += string[i].toString();
    }
  }
  return number !== '' ? +number : NaN;
}

extractNumberFromString();
