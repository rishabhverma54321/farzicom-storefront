export default async function handler(req, res) {
  const { key } = req.query;
  const { value } = req.query;

  res.setHeader("Content-Type", "text/html; charset=utf-8");

  if (key && value) {
    res.write(`
    <div>
        <h3>local storage set</h3>
        <p>"${key}","${value}"</p>
    </div>
    <script type="text/javascript">
        try {
            localStorage.setItem("${key}", "${value}");
        } catch (e) {
            console.log("error", e);
        }
    </script>
  `);
  } else {
    res.write(`
          <div>
              <h3>Key value missing</h3>
              <p>"${key}","${value}"</p>
          </div>
        `);
  }

  res.end();
}
