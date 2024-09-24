export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(401).json({ message: "Invalid Request" });
  }
  const requestBody = JSON.parse(req.body);
  return res.status(200).json({ message: "Logged" });
}
