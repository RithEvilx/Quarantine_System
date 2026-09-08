import moment from "moment/min/moment-with-locales";

const khmerDigits: Record<string, string> = {
  "0": "០",
  "1": "១",
  "2": "២",
  "3": "៣",
  "4": "៤",
  "5": "៥",
  "6": "៦",
  "7": "៧",
  "8": "៨",
  "9": "៩",
};

const isKhmerLanguage = (lang: string = "en") => {
  return lang.toLowerCase().startsWith("km");
};

const toKhmerDigits = (value: string) => {
  return value.replace(/\d/g, (digit) => khmerDigits[digit]);
};

export const momentWithLocale = (date: moment.MomentInput, lang: string = "en", format?: string) => {
  return moment(date, format).locale(isKhmerLanguage(lang) ? "km" : "en");
};

// Usage: formatDate(data, "D MMM YYYY", i18n.language)
export const formatDate = (date: moment.MomentInput, format: string, lang: string = "en"): string => {
  if (!date) return "";

  const formatted = momentWithLocale(date, lang).format(format);

  return isKhmerLanguage(lang) ? toKhmerDigits(formatted) : formatted;
};

// Usage: formatTime(data, "hh:mm A", i18n.language)
export const formatTime = (time: string | null | undefined, format: string = "hh:mm A", lang: string = "en"): string => {
  if (!time) return "";

  const formatted = moment(time, "HH:mm:ss")
    .locale(isKhmerLanguage(lang) ? "km" : "en")
    .format(format);

  return isKhmerLanguage(lang) ? toKhmerDigits(formatted) : formatted;
};
