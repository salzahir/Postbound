import Head from "next/head";
import Header from "../header";

function About() {
  return (
    <>
        <Header/>
    <div className="max-w-3xl mx-auto p-6 text-white">
      <h1 className="text-3xl font-bold mb-4 text-yellow-400">About Me</h1>
      <p className="mb-4 text-gray-300">
        Hey, I'm the developer behind this blog — a tech enthusiast who loves building full-stack applications, exploring new tools, and sharing what I learn along the way.
      </p>
      <p className="mb-4 text-gray-300">
        This platform serves as my digital space to post thoughts, tutorials, and insights on web development, programming, and anything else that sparks curiosity.
      </p>
      <p className="text-gray-400 italic">
        Built with ❤️ using Next.js, Tailwind CSS, and a custom Node.js API.
      </p>
    </div>
    </>
  );
}

export default About;