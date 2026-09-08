import { km } from "react-day-picker/locale";
import type { Formatters, Locale } from "react-day-picker";

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

const toKhmerNumbers = (value: number | string): string => {
  return String(value).replace(/\d/g, (digit) => khmerDigits[digit] ?? digit);
};

const khmerMonths = [
  "មករា",
  "កុម្ភៈ",
  "មីនា",
  "មេសា",
  "ឧសភា",
  "មិថុនា",
  "កក្កដា",
  "សីហា",
  "កញ្ញា",
  "តុលា",
  "វិច្ឆិកា",
  "ធ្នូ",
];

const khmerWeekdaysShort = ["អា", "ច", "អ", "ព", "ព្រ", "សុ", "ស"];

const formatKhmerMonthYear = (date: Date): string => {
  return `${khmerMonths[date.getMonth()]} ${toKhmerNumbers(date.getFullYear())}`;
};

export const khmerDayPickerLocale = {
  ...km,

  formatCaption: (date: Date) => {
    return formatKhmerMonthYear(date);
  },

  formatMonthCaption: (date: Date) => {
    return formatKhmerMonthYear(date);
  },

  formatWeekdayName: (date: Date) => {
    return khmerWeekdaysShort[date.getDay()];
  },

  formatWeekNumberHeader: () => {
    return "សប្តាហ៍";
  },
} as Locale;

export const khmerDayPickerFormatters: Partial<Formatters> = {
  formatDay: (date) => {
    return toKhmerNumbers(date.getDate());
  },

  formatCaption: (date) => {
    return formatKhmerMonthYear(date);
  },

  formatMonthCaption: (date) => {
    return formatKhmerMonthYear(date);
  },

  formatWeekdayName: (date) => {
    return khmerWeekdaysShort[date.getDay()];
  },

  formatWeekNumber: (weekNumber) => {
    return toKhmerNumbers(weekNumber);
  },

  formatWeekNumberHeader: () => {
    return "សប្តាហ៍";
  },
};