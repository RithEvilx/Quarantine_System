export const all_header = () => ({ Accept: "*/*" });

export const auth_header = () => {
  return {
    Accept: "*/*",
  };
};

export const json_header = () => ({
  Accept: "*/*",
  "Content-Type": "application/json",
});

export const auth_form_header = () => {
  return {
    Accept: "*/*",
  };
};

export const auth_json_header = () => {
  return {
    Accept: "*/*",
    "Content-Type": "application/json",
  };
};

export const auth_multi_part_header = () => {
  return {
    Accept: "*/*",
    "Content-Type": "multipart/form-data",
  };
};
