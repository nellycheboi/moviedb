import Head from 'next/head'
import Image from 'next/image'
import SearchBar from '../components/searchBar'
import MoviesTableView from '../components/moviesTableView'

export default function Home({query, setQuery}) {
  return (
    <div>
      <Head>
        <title>🍿 Movie Time</title>
        <meta name="description" content="Ready to binge?" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto px-4 pt-8 bg-yellow">
        <h2 className="text-center pb-4">
          <span className="text-3xl">🍿</span> Ready to binge?{" "}
          <span className="text-3xl">🍿</span>
        </h2>
        <SearchBar query={query} setQuery={setQuery} />
        <MoviesTableView query={query} />
      </main>
    </div>
  );
}
