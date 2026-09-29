const Header = () => {
  return (
    <div className="bg-linear-to-r md:h-[30%] h-[25%] mb-2 w-full from-green-600 to-emerald-600 p-4 md:p-6 flex flex-col justify-center">
      <p className="text-sm text-white/80">Welcome back</p>

      <h1 className="text-xl md:text-2xl font-bold text-white mt-1">
        Hi there! 👋 Let's make today count!
      </h1>

      <div className="mt-4 md:mt-6 bg-white/15 rounded-2xl px-4 py-3 md:px-5 md:py-4 flex items-center gap-3 md:gap-4">
        <span className="text-3xl md:text-4xl">💪</span>

        <p className="text-white font-semibold">
          Ready to crush today? Start logging!
        </p>
      </div>
    </div>
  );
};

export default Header;