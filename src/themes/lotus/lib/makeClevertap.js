/* eslint-env browser */

function makeOrGetClevertapObject() {
  const clevertap = {
    event: [],
    profile: [],
    account: [],
    onUserLogin: [],
    notifications: [],
    privacy: [],
  };
  if (!process.browser || !window) {
    pushBasicInfo(clevertap);
    return clevertap;
  }
  if (!window.clevertap) {
    window.clevertap = clevertap;
    pushBasicInfo(window.clevertap);
  }
  return window.clevertap;
}

function pushBasicInfo(clevertapObject) {
  clevertapObject.account.push({
    id: process.env.REACT_APP_CLEVERTAP_PROJECT_ID,
  });
  clevertapObject.privacy.push({ optOut: false });
  clevertapObject.privacy.push({ useIP: false });
}

export default makeOrGetClevertapObject;
