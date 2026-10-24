import Link from "next/link";

const NotFound = () => {
  return (
    <section className="min-h-[75vh] flex items-center justify-center bg-[#F8F6F0] px-6">
      <div className="max-w-md w-full text-center space-y-6">
        <span className="text-xs uppercase tracking-[0.35em] text-[#8C6F48]">
          Lost in Sillage
        </span>
        <h1 className="text-7xl font-light text-[#121212] tracking-widest font-serif">
          404
        </h1>
        <p className="text-sm text-[#736E65] leading-relaxed font-light">
          The flacon or olfactory note you are seeking seems to have evaporated into thin air.
        </p>
        <div>
          <Link
            href="/"
            className="inline-block px-8 py-3.5 rounded-full bg-[#121212] text-[#F8F6F0] text-xs uppercase tracking-[0.2em] hover:bg-[#8C6F48] transition-all duration-300 shadow-sm"
          >
            Return to Sanctuary
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NotFound;