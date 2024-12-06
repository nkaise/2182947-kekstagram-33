const checkStringLength = (string, maxLength) => string.length <= maxLength;

checkStringLength('проверяемая строка', 18);

const isPalindrome = (string) => {
  string = string.replaceAll(' ', '').toLowerCase();
  let validateString = '';
  for (let i = string.length - 1; i >= 0; i--) {
    validateString += string[i];
  }
  return string === validateString;
};

isPalindrome('ДовОд');

const extractNumberFromString = (string) => {
  let number = '';
  const numbersList = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < string.length; i++) {
    if (string[i] in numbersList) {
      number += string[i].toString();
    }
  }
  return number !== '' ? +number : NaN;
};

extractNumberFromString('1 кефир, 0.5 батона');

const stringToMinutes = (string) => {
  let [hours, minutes] = string.split(':');
  hours = Number(hours) * 60;
  minutes = Number(minutes);
  return hours + minutes;
};

const isMeetingWithinWorkHours = (startWorkHours, endWorkHours, startMeetingHours, meetingLength) => {
  const startWorkInMinutes = stringToMinutes(startWorkHours);
  const endWorkInMinutes = stringToMinutes(endWorkHours);
  const startMeetingInMinutes = stringToMinutes(startMeetingHours);

  return !(startWorkInMinutes > startMeetingInMinutes || startMeetingInMinutes + meetingLength > endWorkInMinutes);
};

isMeetingWithinWorkHours('08:00', '17:30', '14:00', 90); // true
isMeetingWithinWorkHours('8:0', '10:0', '8:0', 120); // true
isMeetingWithinWorkHours('08:00', '14:30', '14:00', 90); // false
isMeetingWithinWorkHours('14:00', '17:30', '8:0', 90); // false
isMeetingWithinWorkHours('8:00', '17:30', '08:00', 900); // false
