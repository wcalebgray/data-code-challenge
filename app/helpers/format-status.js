import { helper } from '@ember/component/helper';
import { formatMoment, getMoment, makeDoubleDigitString } from './format-date';
import moment from 'moment';

export function formatStatus(params) {
  if(params && params[0]){
    const status = params[0];
    let errMessage = 'DATA ERROR OCCURRED: ';
    let startMoment, endMoment;

    if(!status.start_date) return 'not started';

    startMoment = getMoment(status.start_date);

    if (status.end_date) {
      endMoment = getMoment(status.end_date);

      if (endMoment.isSameOrAfter(startMoment)) {
        if (status.processed === status.total) {
          return 'Completed: ' + formatMoment(endMoment);
        } else if (status.processed < status.total) {
          return 'Halted: ' + formatMoment(endMoment);
        } else if (status.processed > status.total) {
          return errMessage + 'processed is more than total'
        }
      } else if (endMoment.isBefore(startMoment)) {
        return errMessage + 'end_date is before start_date';
      }
    }    

    if (startMoment && !endMoment && status.remaining) {
      return getTimeRemaining(status.remaining);
    }


    
  } else {
    return params;
  }
}

function getTimeRemaining(milliseconds) {
  let remainingTime;
  const duration = moment.duration(milliseconds);
  const durationInDays = duration.asDays();
  if(durationInDays > 2) {
    remainingTime = Math.ceil(durationInDays) + ' days';
  } else {
    remainingTime = makeDoubleDigitString(duration.hours()) + ':' + makeDoubleDigitString(duration.minutes()) + ':' + makeDoubleDigitString(duration.seconds());
  }
  
  return 'Time Remaining: ' + remainingTime;
}

export default helper(formatStatus);
