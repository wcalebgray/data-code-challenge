import { helper } from '@ember/component/helper';
import moment from 'moment';

// TODO: Move most of the logic here out of the helper into some kind of service because it's used by other files

function getMomentFromFormattedString(formattedString) {
  return moment.parseZone(formattedString, moment.HTML5_FMT.DATETIME_LOCAL_MS + "ZZ", true);
}

function formatUTCOffset(dateString) {
  if (!dateString) return dateString;

  let offsetIndex = dateString.lastIndexOf("+");
  if (offsetIndex < 0) {
    offsetIndex = dateString.lastIndexOf("-");
  }

  let colonIndex = dateString.lastIndexOf(":");

  let offset = dateString.substring(offsetIndex + 1, colonIndex);
  offset = makeDoubleDigitString(parseInt(offset));

  return dateString.substring(0, offsetIndex + 1) + offset + dateString.substring(colonIndex);
}

export function formatDate(params) {
  let localDate = getMoment(params[0]);
  return formatMoment(localDate);
}

export function getMoment(string) {
  // add a '0' to single digit offsets to make moment's parser work correctly
  const formattedString = formatUTCOffset(string);
  return getMomentFromFormattedString(formattedString);
}

export function formatMoment(momentObject) {
  return momentObject.local().format('MM/DD/YYYY hh:mm A');
}

export function makeDoubleDigitString(int) {
  if (int < 10) {
    return '0' + int;
  } else {
    return String(int);
  }
}

export default helper(formatDate);