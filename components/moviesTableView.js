import { data } from "autoprefixer";
import Link from "next/link";
import router from "next/router";
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

  const { data, isLoading, isError } = useMovies(query);
  if (query && isLoading) return <div>Loading</div>;

  const handleOnClick = (imdbID) => {
    router.push(`/movies/${imdbID}`);
  };
  return (
    <>
      {data && data.length > 0 && (
        <section className="container mx-auto p-6 font-mono">
          <div className="w-full mb-8 overflow-hidden rounded-lg shadow-lg">
            <div className="w-full overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="text-md font-semibold tracking-wide text-left text-gray-900 bg-gray-100 uppercase border-b border-gray-600">
                    <th className="px-4 py-3">Poster</th>
                    <th className="px-4 py-3">Title</th>
                    <th className="px-4 py-3">Year</th>
                  </tr>
                </thead>
                <tbody className="bg-white">
                  {data.map(({ imdbID, Title, Year, Poster }) => (
                    <tr
                      key={imdbID}
                      className="text-gray-700"
                      onClick={() => handleOnClick(imdbID)}
                    >
                      <td className="px-4 py-3 border">
                        <div className="flex items-center text-sm">
                          <div className="relative w-8 h-8 mr-3 rounded-full md:block">
                            <img
                              className="object-cover w-full h-full rounded-full"
                              src={Poster}
                              height={50}
                              width={40}
                              loading="lazy"
                            />
                            <div
                              className="absolute inset-0 rounded-full shadow-inner"
                              aria-hidden="true"
                            ></div>
                          </div>
                        </div>
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {Title}
                      </td>
                      <td className="px-4 py-3 text-ms font-semibold border">
                        {Year}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
