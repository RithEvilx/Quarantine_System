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

type FormatNumberOptions = {
  decimals?: number;
};

// Usage: formatNumber(data, i18next.language) // ១,០០០
export const formatNumber = (value: number | string, language: string, options?: FormatNumberOptions): string => {
  const numValue = Number(value);

  if (Number.isNaN(numValue)) return String(value);

  const decimals = options?.decimals;

  const formatOptions: Intl.NumberFormatOptions = {
    ...(decimals !== undefined && {
      minimumFractionDigits: decimals,
      maximumFractionDigits: decimals,
    }),
  };

  if (language === "km") {
    try {
      return new Intl.NumberFormat("km-KH", {
        numberingSystem: "khmr",
        ...formatOptions,
      }).format(numValue);
    } catch {
      return new Intl.NumberFormat("km-KH-u-nu-khmr", formatOptions).format(numValue);
    }
  }

  return new Intl.NumberFormat("en-US", formatOptions).format(numValue);
};

// Usage: formatNumberInText(data, i18next.language) // ២ Adult, ០ Child, +៨៥៥១២៤១៥៣៣១
export const formatNumberInText = (value: number | string, language: string): string => {
  const text = String(value);

  if (language !== "km") return text;

  return text.replace(/\d/g, (digit) => khmerDigits[digit]);
};

// Usage: formatPrice(data, i18next.language, { decimals: 2, currency: "$" }) // $ ១,០០០.០០
export const formatPrice = (
  value: number | string,
  language: string,
  options?: {
    decimals?: number;
    currency?: string;
  },
): string => {
  const { currency = "" } = options || {};

  const numValue = Number(value);

  if (Number.isNaN(numValue)) return String(value);

  // auto detect decimal
  const isInteger = Number.isInteger(numValue);

  const formatOptions: Intl.NumberFormatOptions = {
    minimumFractionDigits: isInteger ? 0 : 2,
    maximumFractionDigits: isInteger ? 0 : 2,
  };

  let formatted: string;

  if (language === "km") {
    try {
      formatted = new Intl.NumberFormat("km-KH", {
        numberingSystem: "khmr",
        ...formatOptions,
      }).format(numValue);
    } catch {
      formatted = new Intl.NumberFormat("km-KH-u-nu-khmr", formatOptions).format(numValue);
    }
  } else {
    formatted = new Intl.NumberFormat("en-US", formatOptions).format(numValue);
  }

  return currency ? `${currency}${formatted}` : formatted;
};

// Usage
// formatNumberInText("+85512415331", "km");
// +៨៥៥១២៤១៥៣៣១

// formatNumberInText("2 Adult, 0 Child", "km");
// ២ Adult, ០ Child

// formatNumber(1000, "km");
// ១,០០០

// formatPrice(1000, "km", { currency: "$" });
// $ ១,០០០.០០
