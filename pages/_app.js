import "tailwindcss/tailwind.css";

import { useState } from "react";

function App({ Component, pageProps }) {
  // we want to remember query in between navigation
  const [query, setQuery] = useState("");

  return <Component query={query} setQuery={setQuery} {...pageProps} />;
}

export default App;
