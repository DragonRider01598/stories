import Navbar from "../Navbar";

const About = () => {

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <section className="max-w-3xl mx-auto py-16 px-8">
        <h1 className="text-4xl font-semibold text-center mb-6">About Our Website</h1>
        <p className="text-lg leading-relaxed text-gray-400 mb-8">
          Welcome to our platform, where creativity meets technology! Here, you can create interactive stories using a visual canvas.
          Each story is built with cards that contain titles and text, which can be connected to form a dynamic tree of outcomes.
          With just a click, you can navigate down the tree, exploring different options and paths.
        </p>
        <p className="text-lg leading-relaxed text-gray-400 mb-8">
          Our mission is to provide a fun and engaging way to tell stories, whether you're building a branching narrative or simply exploring creative possibilities.
          The possibilities are endless, and we can't wait to see what you'll create!
        </p>
        <p className="text-lg leading-relaxed text-gray-400">
          Join us and start your storytelling journey today. Unleash your imagination!
        </p>
      </section>
    </div>
  );
};

export default About;