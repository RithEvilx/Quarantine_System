// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isNA = (txt: any, textReturn = "") => {
  if (isEmptyOrWhiteSpace(txt)) {
    return txt;
  } else return textReturn;
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const isEmptyOrWhiteSpace = (...list: any[]) => {
  let index = 0;
  list.forEach((element) => {
    switch (typeof element) {
      case "number":
      case "string":
        if (element.toString().trim() !== "") index = index + 1;
        break;
      case "object":
        if (element) if (isEmptyOrWhiteSpace(element.toString())) index = index + 1;
        break;
      default:
        return null;
    }
  });
  return index === list.length;
};

export const trimSeconds = (time: string | undefined | null): string => {
  return typeof time === "string" && time.length >= 5 ? time.slice(0, 5) : "";
};
