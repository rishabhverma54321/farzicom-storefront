export default function Custom500() {
  if (typeof window !== "undefined") {
    window.location.href = "/";
  }

  return <></>;
}
