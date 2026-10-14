
export default function Loading() {
  return (
    <main className="min-h-screen bg-[#f0f5f0] px-4 py-10">
      <div className="mx-auto max-w-7xl">

       
        <div className="mb-10 text-center">
          <div className="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-green-100">
            <span className="text-4xl">🛒</span>
          </div>

          <h1 className="text-3xl font-extrabold text-green-800">
            বাংলা বাজার
          </h1>

          <p className="mt-3 text-gray-600">
            আপনার নিত্যদিনের বাজারের বিশ্বস্ত সঙ্গী
          </p>

        
          <div className="mt-7 flex items-center justify-center gap-3">
            <span className="h-6 w-6 animate-spin rounded-full border-4 border-green-200 border-t-green-700" />

            <span className="font-medium text-green-800">
              তথ্য লোড হচ্ছে...
            </span>
          </div>

          <p className="mt-2 text-sm text-gray-500">
            অনুগ্রহ করে একটু অপেক্ষা করুন
          </p>
        </div>

        
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {[1, 2, 3, 4].map((item) => (
            <div
              key={item}
              className="animate-pulse rounded-2xl border border-green-100 bg-white p-5 shadow-sm"
            >
              <div className="mb-5 flex items-center gap-4">
                <div className="h-14 w-14 rounded-xl bg-gray-200" />

                <div className="flex-1 space-y-2">
                  <div className="h-4 w-3/4 rounded bg-gray-200" />
                  <div className="h-3 w-1/2 rounded bg-gray-100" />
                </div>
              </div>

              <div className="mb-3 h-3 w-full rounded bg-gray-100" />
              <div className="mb-6 h-3 w-2/3 rounded bg-gray-100" />

              <div className="flex items-center justify-between">
                <div className="h-6 w-20 rounded bg-green-100" />
                <div className="h-8 w-20 rounded-lg bg-gray-200" />
              </div>
            </div>
          ))}
        </div>


        <p className="mt-10 text-center text-sm text-gray-400">
          আপনার বাজারের সঠিক তথ্য পৌঁছে দিতে আমরা কাজ করছি।
        </p>
      </div>
    </main>
  );
}
