"use client";
import Link from "next/link";

export default function Home() {

  const heroBg = "https://i.ibb.co.com/9kKHqtgZ/Hero.jpg"; 
 
  return (
    <div className="min-h-screen">

      {/* HERO SECTION */}
      <section
        className="relative h-screen flex items-center justify-center text-center text-white"
        style={{
          backgroundImage: `url(${heroBg})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >

        {/* DARK OVERLAY */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* CONTENT */}
        <div className="relative z-10 px-6">

          <h1 className="text-4xl md:text-6xl font-bold mb-4">
            Find Your Perfect Lawyer Easily ⚖️
          </h1>

          <p className="text-lg md:text-xl mb-6 max-w-2xl mx-auto">
            Connect with verified lawyers, book consultation and solve legal problems faster.
          </p>

          <div className="flex gap-4 justify-center">

            <Link
              href="/browse-lawyers"
              className="bg-white text-black px-6 py-3 rounded-lg font-semibold hover:bg-gray-200"
            >
              Find Lawyers
            </Link>

            <Link
              href="/register"
              className="border border-white px-6 py-3 rounded-lg hover:bg-white hover:text-black"
            >
              Get Started
            </Link>

          </div>

        </div>
      </section>

    </div>
  );
}