export const validatePhoneNumber = (value) => {
  return /\d{3}[ ]?\d{3}[ ]?\d{3}(?!\w)/.test(value);
};
