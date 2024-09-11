// @ts-nocheck

function loadScript(src: string) {
  return new Promise(resolve => {
    const script = document.createElement("script");
    script.src = src;
    script.onload = () => {
      resolve(true);
    };
    script.onerror = () => {
      resolve(false);
    };
    document.body.appendChild(script);
  });
}

export async function loadGokwikScript() {
  if (
    !document.querySelectorAll(
      `script[src="https://checkout.gokwik.co/integration.js"]`
    ).length
  ) {
    const res = await loadScript("https://checkout.gokwik.co/integration.js");

    if (!res) {
      alert("Failed to Load Gokwik Script");
    }
  }
}

export const initiateGokwikCheckout = async (
  moid: string,
  request_id: string,
  gokwik_oid: string,
  mid: string
) => {
  // console.log('env', process.env)
  let merchantInfo = {
    order_type: "upi",
    mid,
    moid,
    environment: "sandbox",
    request_id,
    gokwik_oid,
    css: {
      primaryColor: "#f08080",
      secondaryColor: "#ffa07a",
    },
    showModal: true,
  };
  gokwikSdk.initPayment(merchantInfo);
};
