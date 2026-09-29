const FoodScan = () => {
  return (
    <div className="fixed inset-0 z-9999 flex items-center justify-center bg-black/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl border border-slate-700 bg-slate-900 p-6 text-center shadow-2xl shadow-black/30 sm:p-8">

        {/* Spinner */}
        <div className="mx-auto mb-5 h-12 w-12 animate-spin rounded-full border-4 border-slate-700 border-t-emerald-400 sm:h-14 sm:w-14" />

        {/* Heading */}
        <h2 className="text-lg font-semibold text-slate-100 sm:text-xl">
          Scanning your food...
        </h2>

        {/* Description */}
        <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-slate-400">
          Please wait while we identify your food and estimate its calories.
        </p>

        {/* Status */}
        <div className="mt-5 flex items-center justify-center gap-2 text-xs font-medium text-emerald-400">
          <span className="h-2 w-2 animate-pulse rounded-full bg-emerald-400" />
          Processing image
        </div>
      </div>
    </div>
  );
};

export default FoodScan;

