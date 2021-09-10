export default async function handler(req, res) {
  const query = req.query.q;

  const response = query
    ? await fetch(
        `${process.env.RAPIDAPI_ENDPOINT}/?i=${query}&r=json&page=1`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "x-rapidapi-host": `${process.env.RAPIDAPI_HOST}`,
            "x-rapidapi-key": `${process.env.RAPIDAPI_KEY}`,
          },
        }
      )
    : [];
  const data = await response.json();

  if (data) {
    res.status(200).json({ data });
  } else {
    res.status(500).json({ message: `Error occured getting data` });
  }
}
