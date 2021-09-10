import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export function useMovies(query) {
  const { data, error } = useSWR(
    () => query && `/api/searchByName?q=${query}`,
    fetcher
  );
  return {
    data: data?.data?.Search,
    isLoading: !error && !data,
    isError: error,
  };
}
export default function MoviesTableView({ query }) {
    console.log(query);

  const { data, isLoading, isError } = useMovies(query);
  if (isLoading) return <div>Loading</div>;
  return (
    <>
      {data && data.length > 0 && (
        <table>
          {data.map(({ imdbID, Title, Year, Poster }) => (
            <Link key={imdbID} href={`/movies/${imdbID}`}>
              <a>
                <tr>
                  <td>
                    <img src={Poster} height={50} width={40} />
                  </td>
                  <td>{Title}</td>
                  <td>{Year}</td>
                </tr>
              </a>
            </Link>
          ))}
        </table>
      )}
    </>
  );
}
