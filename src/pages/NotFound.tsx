import { Link } from 'react-router-dom';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#FAF8F4] flex flex-col items-center justify-center p-6 text-center font-sans">
      <div className="max-w-md w-full bg-white p-12 border border-zinc-100 shadow-xl relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-1 bg-[#C89B3C]"></div>
        <span className="text-xs uppercase tracking-[0.25em] font-semibold text-[#C89B3C] block mb-4">Error 404</span>
        <h1 className="font-display text-4xl font-light text-zinc-900 mb-6">
          Portfolio Not Found
        </h1>
        <p className="text-zinc-500 font-light text-sm leading-relaxed mb-10">
          The property, developer, or brief you are searching for has been relocated or is strictly off-market.
        </p>
        <Link 
          to="/"
          className="inline-block border border-zinc-200 bg-white hover:bg-zinc-950 text-zinc-900 hover:text-white px-8 py-3.5 text-[11px] uppercase tracking-widest font-bold transition-all duration-300"
        >
          Return to Summit
        </Link>
      </div>
    </div>
  );
}
