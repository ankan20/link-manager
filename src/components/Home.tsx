"use client";

import ModernButton from "@/components/ui/ModernButton";
import { useRouter } from "next/navigation";
import { Faqs } from "@/components/Faqs";

const Home = () => {
  const router = useRouter();

  const handleClick = () => {
    router.push("/dashboard");
  };

  return (
    <div className="h-screen w-full bg-black dark:bg-white bg-grid-white/[0.2] dark:bg-grid-black/[0.2] relative flex flex-col items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black dark:bg-white [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>

      {/* Centered Content */}
      <div className="relative  text-center flex flex-col items-center justify-center">
        {/* Heading */}
        <h1 className=" text-4xl sm:text-7xl font-bold mb-4 py-2 text-white">
          <span className="relative bg-gradient-to-r from-gray-200 to-gray-500 bg-clip-text text-transparent mask-image-gradient">
            Welcome to LinkSphere
          </span>
        </h1>
        {/* Description */}
        <p className="text-lg sm:text-xl mb-6 max-w-lg leading-relaxed text-white">
          LinkSphere is your ultimate platform for managing and organizing links with ease. Streamline your workflow by grouping links into intuitive projects and sharing them with teams or clients.
        </p>
        {/* Modern Button with custom onClick */}
        <ModernButton label="Get Started" onClick={handleClick} />
        {/* <div className=" text-white w-full">
        <Faqs />
        </div> */}
        
        
        
      </div>

      <div className=" text-white w-[80%] sm:w-[50%] mt-16 z-20">
        <Faqs />
        </div>
      
    </div>
  );
};

export default Home;
