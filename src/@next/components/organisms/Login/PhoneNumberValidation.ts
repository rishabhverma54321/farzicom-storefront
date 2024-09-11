export const validateEmail = (email: string) => {
  const mailformat = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return email.match(mailformat);
};

export const validatePhoneNumber = number => {
  number = number.trim();
  if (number?.length < 10) {
    return false;
  }
  const phoneReg = /([1-9])+([0-9]){9}/;
  if (!phoneReg.test(number)) {
    return false;
  }

  return true;
};
