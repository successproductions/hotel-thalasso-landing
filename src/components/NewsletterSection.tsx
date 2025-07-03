import React from "react";

export function NewsletterSection() {
  return (
    <section
      className="relative h-[400px] md:h-[500px] bg-center bg-cover"
      style={{ backgroundImage: `url("/images/news-bg.jpg")` }}
    >
      {/* dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      <div className="relative z-10 flex flex-col items-center justify-center h-full px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-serif text-white">
          Join Our Newsletter
        </h2>
        <p className="mt-2 text-sm md:text-base text-white/80 uppercase tracking-wide">
          Add your name to our mailing list for news and updates from DakhlaClub
        </p>

        {/* form */}
        <form className="mt-6 w-full max-w-md flex">
          <input
            type="email"
            placeholder="Email Address"
            className="flex-1 px-4 py-2 rounded-l-md focus:outline-none"
          />
          <button
            type="submit"
            className="bg-white text-gray-800 px-6 py-2 rounded-r-md font-medium hover:bg-gray-100 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
}
