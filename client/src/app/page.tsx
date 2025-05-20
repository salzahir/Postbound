import Header from "./header";

export default function Home() {
  return (
    <>
      <Header />
          <main className="max-w-4xl mx-auto px-6 py-12 text-white">
            <h1 className="text-4xl font-bold mb-8">Welcome to Postbound</h1>
            <p className="text-lg mb-6">
              Postbound is a modern blog platform built with Next.js. It's designed to be a simple and elegant way to share your thoughts and ideas with the world.
            </p>
            <p className="text-lg mb-6">
              Whether you're a writer, a creator, or just someone who wants to share their thoughts, Postbound is the perfect place to do it.
            </p>
            <p className="text-lg mb-6">
              Get started today and start sharing your thoughts with the world!
            </p>
          </main>
    </>

  );
}
