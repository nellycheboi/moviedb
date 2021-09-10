import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";
import { data } from "autoprefixer";
import Loading from "../../components/loading";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export function useMovie(query) {
  const { data, error } = useSWR(
    () => query && `/api/searchById?q=${query}`,
    fetcher
  );
  return {
    data: data?.data,
    isLoading: !error && !data,
    isError: error,
  };
}

export default function Movie() {
  const { query } = useRouter();

  const { data, isLoading, isError } = useMovie(query?.id);
  if (isLoading) return <Loading />;

  return (
    <>
      <div className="container mx-lg mx-auto pt-8 pl-8 flex justify-center">
        <div>
          <div className="mb-6">
            <Link href="/">
              <a>
                <button className="bg-red-400 hover:bg-red-300 rounded text-white p-2 pl-4 pr-4 animate-pulse">
                  Back
                </button>
              </a>
            </Link>
          </div>
          <div className="bg-white shadow p-3 rounded w-96">
            <div>
              <div
                className="bg-cover bg-center bg-gray-300 h-64 rounded"
                style={{ backgroundImage: `url('${data?.Poster}')` }}
              ></div>
              <div className="mt-6">
                <p className="text-lg text-bold tracking-wide text-gray-600 mb-2">
                  {data?.Title}
                </p>
                <p className="text-sm text-gray-600 font-hairline">
                  {data?.Plot}
                </p>
                <div className="mt-6 flex justify-between text-center">
                  <div>
                    <p className="text-gray-700 font-bold">{data?.Year}</p>
                    <p className="text-xs mt-2 text-gray-600 font-hairline">
                      Year
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-bold">{data?.Metascore}</p>
                    <p className="text-xs mt-2 text-gray-600 font-hairline">
                      Metascore
                    </p>
                  </div>
                  <div>
                    <p className="text-gray-700 font-bold">{data?.imdbVotes}</p>
                    <p className="text-xs mt-2 text-gray-700 font-hairline">
                      IMDB Votes
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
