import Head from "next/head";
import Header from "../components/Header/Header";
import useSWR from "swr";

const fetcher = (...args) => fetch(...args).then((res) => res.json());

export default function Home() {
  const { data, error } = useSWR("/api/photos", fetcher);

  return (
    <div className="container mx-auto px-4 flex flex-col min-h-screen">
      <Head>
        <title>My Unsplash</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <h1>Content</h1>

      <h1 className="mt-auto text-center font-semibold text-gray-400">
        {`<Akshay Jadhav(AKS) @devchallenges.io/>`}
      </h1>
    </div>
  );
}
