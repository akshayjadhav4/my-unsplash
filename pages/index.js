import Head from "next/head";
import Header from "../components/Header/Header";
import PhotosGrid from "../components/PhotosGrid/PhotosGrid";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data } = useSWR("/api/photos", fetcher);

  return (
    <div className="container mx-auto px-4 flex flex-col min-h-screen">
      <Head>
        <title>My Unsplash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* HEADER */}
      <Header />
      {/* ERROR */}
      {data?.error && (
        <div className="m-2 text-red-500 text-lg text-center">
          {data?.error}
        </div>
      )}
      {/* GRID TO SHOW POSTS */}
      {data?.photos && <PhotosGrid data={data.photos} />}
      {/* FOOTER */}
      <h1 className="mt-auto text-center font-semibold text-gray-400">
        {`<Akshay Jadhav(AKS) @devchallenges.io/>`}
      </h1>
    </div>
  );
}
