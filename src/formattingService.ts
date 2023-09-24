import { DateFormatConsts } from "./Constants/DateFormatConsts";

export class formattingService {

    getFormattedDate(date: Date, formattingForm = DateFormatConsts.DDMMYYY_DOTS) {
        const day = String(date.getDate()).padStart(2, '0'); // Get day and pad with leading zero if needed
        const month = String(date.getMonth() + 1).padStart(2, '0'); // Get month (months are zero-based) and pad with leading zero if needed
        const year = date.getFullYear(); // Get year
        switch (formattingForm) {
            case DateFormatConsts.DDMMYYY_DOTS:
                return `${day}.${month}.${year}`
            case DateFormatConsts.DDMMYYY_SLASH:
                return `${day}/${month}/${year}`
            default:
                break;
        }
    }
}