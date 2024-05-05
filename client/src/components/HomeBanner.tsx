export default function HomeBanner() {
  return (
    <div className="h-screen w-screen relative">
      <img
        className="w-full h-full"
        src="https://assets.nflxext.com/ffe/siteui/vlv3/9d3533b2-0e2b-40b2-95e0-ecd7979cc88b/582aecb2-9125-46db-a907-3762d36d1f11/NL-en-20240311-popsignuptwoweeks-perspective_alpha_website_large.jpg"
        alt=""
      />
      <div className="absolute h-full w-full bg-black bg-opacity-40 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-white font-bold text-5xl">
            Unlimited movies tv shows and more
          </h1>
          <p className="text-white text-3xl mt-3">
            Watch anywhere, Cancel anutime
          </p>
          <div className="mt-8">
            <a
              href="/login"
              className="bg-red-700 text-white p-4 px-16 text-lg rounded font-semibold">
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
