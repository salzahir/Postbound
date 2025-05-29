import Header from "./components/layout/Header";

export default function Home() {
  return (
    <>
      <Header />
      <main className="max-w-4xl mx-auto px-6 py-12 text-white">
        <h1 className="text-3xl font-bold mb-8">Welcome to Postbound</h1>
        <p className="text-lg mb-6">
          Postbound is a modern blog platform built with Next.js. It&apos;s designed to be a simple and elegant way to share your thoughts and ideas with the world.
        </p>
        <p className="text-lg mb-6">
          Whether you&apos;re a writer, a creator, or just someone who wants to share their thoughts, Postbound is the perfect place to do it.
        </p>
        <p className="text-lg mb-6">
          Get started by creating your first post or exploring what others have shared.
        </p>
      </main>
    </>
  );
}
