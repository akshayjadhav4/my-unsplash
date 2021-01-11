import Head from "next/head";
import Header from "../components/Header/Header";

export default function Home() {
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
