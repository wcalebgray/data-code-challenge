import { helper } from '@ember/component/helper';
import { htmlSafe } from '@ember/string';

export function formatNiceStatus(params/*, hash*/) {
  let returnString = params[0];
  const boldableWords = [
    'success',
    'fail',
    'error'
  ];
  returnString = boldMultipleWordsInString(returnString, boldableWords)
  return htmlSafe(returnString);
}

function boldMultipleWordsInString(string, findArray) {
  for (let i = 0; i < findArray.length; i++) {
    string = boldWordInString(string, findArray[i]);
  }
  return string;
}

function boldWordInString(string, find) {
  
  var re = new RegExp(find, 'ig');
  let index = string.search(re)
  if(index > -1) {
    string = string.substring(0, index) + '<b>' + string.substring(index, index + find.length) + '</b>' + string.substring(index + find.length);
  }
  return string;
}

export default helper(formatNiceStatus);
