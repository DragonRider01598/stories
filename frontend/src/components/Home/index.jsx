import Navbar from "../Navbar";
import BrowseStory from "./components/BrowseStory";

const Home = () => {
   return (
      <div className="min-h-screen bg-gray-900 text-white">
         <Navbar />
         <section className="max-w-5xl mx-auto py-16 px-8">
            <h1 className="text-4xl font-semibold text-center mb-6">Welcome to Our Storytelling Platform</h1>

            <div className="mb-12">
               <h2 className="text-2xl font-semibold mb-4">Create Interactive Stories</h2>
               <p className="text-lg leading-relaxed text-gray-400 mb-4">
                  Our platform allows you to create dynamic, branching narratives with visual cards. These cards represent different parts of your story, and you can connect them to build a story tree. Users can then explore different paths with a simple click.
               </p>
               <img src="canvas.png" alt="Story Canvas" className="w-full h-auto rounded-lg shadow-md" />
            </div>

            <div className="mb-12">
               <h2 className="text-2xl font-semibold mb-4">Explore Stories with Our Reading Feature</h2>
               <p className="text-lg leading-relaxed text-gray-400 mb-4">
                  In addition to creating stories, you can browse through stories created by others. Read and experience different outcomes based on choices made along the way.
               </p>
               <img src="userflow.png" alt="Reading Stories" className="w-1/2 mx-auto rounded-lg shadow-md" />
            </div>

            <BrowseStory />
         </section>
      </div>
   );
};

export default Home;