export const redirectToWhatsapp = () => {
  const phoneNumber = localStorage.getItem("phoneNumber");
  window.open(`https://web.whatsapp.com/send?phone=91${phoneNumber}`, "_blank");
};

export const getDate = (data: any) => {
  //
  if (data) {
    const date = new Date(data);
    const newDate = date ? date.toDateString().split(" ") : "-";
    //
    if (newDate) {
      return `${newDate[1]} ${newDate[2]} ${newDate[3]}`;
    }
    return newDate;
  }
  return "-";
};
export const getRate = (node: any) => {
  if (node?.order.metadata?.length) {
    //
    const rate = node?.order?.metadata.filter(
      (item: any) => item.key === "orderRate"
    )[0];
    return rate ? rate.value : "-";
  }
  return "-";
};

export const getDaysOutofTwoDates = (input1: any, input2: any) => {
  const date1 = new Date(input1);
  const date2 = new Date(input2);
  const difference = date1.getTime() - date2.getTime();
  const days = Math.ceil(difference / (1000 * 3600 * 24));
  return days;
};

export const removeUnderscore = (input: string) => {
  const arr = input.split("_");
  let result = "";
  for (let i = 0; i < arr.length; i++) {
    result += `${arr[i]} `;
  }
  return result;
};

export const calcProgForCompany = (input: any) => {
  const total = 10;
  let points = 0;
  if (input?.companyName) {
    points += 1;
  }
  if (input?.gstNumber) {
    points += 1;
  }
  if (input?.panNumber) {
    points += 1;
  }
  if (input?.noOfSpindles) {
    points += 1;
  }
  if (input?.avatar?.url) {
    points += 1;
  }
  if (input?.isVerified) {
    points += 1;
  }
  if (input?.categories?.length) {
    points += 1;
  }
  if (input?.companyType?.length) {
    points += 1;
  }
  if (input?.shippingAddress) {
    points += 1;
  }
  if (input?.paymentInfo) {
    points += 1;
  }
  return { total, points };
};
export const calcProgForProfile = (input: any) => {
  const total = 10;
  let points = 0;
  if (input?.companyName) {
    points += 1;
  }
  if (input?.departmentName) {
    points += 1;
  }
  if (input?.designation) {
    points += 1;
  }
  if (input?.access) {
    points += 1;
  }
  if (input?.companyAvatar) {
    points += 1;
  }
  if (input?.isVerified) {
    points += 1;
  }
  if (input?.categories?.length) {
    points += 1;
  }
  if (input?.firstName || input?.lastName) {
    points += 1;
  }
  if (input?.phoneNumber) {
    points += 1;
  }
  if (input?.email) {
    points += 1;
  }
  return { total, points };
};
