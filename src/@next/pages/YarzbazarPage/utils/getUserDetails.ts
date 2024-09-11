export const getUserCompanyId = () => {
  const userData: any = localStorage.getItem("userMeta");
  const companyId = JSON.parse(userData)?.company?.id;
  return companyId;
};
