export default function LoadingCover() {
  return (
    <div className="absolute inset-0 z-50 flex flex-col items-center justify-start pt-64 backdrop-blur-xs animate-in fade-in duration-700">
      <div className="relative flex items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-3 border-zinc-700"></div>
      </div>

      <p className="mt-6 flex flex-col items-center font-mono text-sm uppercase tracking-[0.3rem] text-zinc-800 animate-pulse">
        Initializing Portfolio{" "}
        <span className=" text-xs italic tracking-wide"> Please Wait</span>
      </p>
    </div>
  );
}
