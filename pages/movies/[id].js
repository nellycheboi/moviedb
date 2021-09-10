import Link from "next/link";
import { useState } from "react";
import useSWR from "swr";
import { useRouter } from "next/router";

const fetcher = async (url) => {
  const res = await fetch(url);
  const data = await res.json();

  if (res.status !== 200) {
    throw new Error(data.message);
  }
  return data;
};

export function useMovie(query) {
  console.log("Use movies", query);
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
  if (isLoading) return <div>Loading</div>;
    return (
      <>
        <div>{JSON.stringify(data)}</div>
        <h1>{data?.Title}</h1>
        <h2>{data?.Year}</h2>
        <p>{data?.Plot}</p>
        <img src={data?.Poster} />
      </>
    );
}