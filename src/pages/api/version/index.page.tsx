export default async function handler(req, res) {
  res.send({
    version: process.env.NEXT_PUBLIC_VERSION,
  });
}
