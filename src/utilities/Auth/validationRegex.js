export function validateEmail(email) {
  const re = /\S+@\S+\.\S+/;
  return re.test(email);
}

export const validatePhoneNumber = (value) => {
  return /\d{3}[ ]?\d{3}[ ]?\d{3}(?!\w)/.test(value);
};
