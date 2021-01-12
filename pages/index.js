import React, { useState } from "react";
import Head from "next/head";
import Header from "../components/Header/Header";
import PhotosGrid from "../components/PhotosGrid/PhotosGrid";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data } = useSWR("/api/photos", fetcher);
  const [searchTerm, setSearchTerm] = useState("");

  return (
    <div className="container mx-auto px-4 flex flex-col min-h-screen">
      <Head>
        <title>My Unsplash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* HEADER */}
      <Header searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {/* ERROR */}
      {data?.error && (
        <div className="m-2 text-red-500 text-lg text-center">
          {data?.error}
        </div>
      )}
      {/* GRID TO SHOW POSTS */}
      {data?.photos.length > 0 && (
        <PhotosGrid data={data.photos} searchTerm={searchTerm} />
      )}
      {/* FOOTER */}
      <h1 className="mt-auto text-center font-semibold text-gray-400">
        {`<Akshay Jadhav(AKS) @devchallenges.io/>`}
      </h1>
    </div>
  );
}
