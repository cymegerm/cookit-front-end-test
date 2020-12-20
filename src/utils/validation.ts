const emailRegex = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
const postalCodeRegex = /^[ABCEGHJ-NPRSTVXY]{1}[0-9]{1}[ABCEGHJ-NPRSTV-Z]{1}[ ]?[0-9]{1}[ABCEGHJ-NPRSTV-Z]{1}[0-9]{1}$/;

export const isValidEmail = (email: string) => {
  return emailRegex.test(email);
};

export const isValidPostalCode = (postalCode: string) => {
  return postalCodeRegex.test(postalCode);
};
