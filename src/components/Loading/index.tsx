export function Loading() {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="w-12 h-12 border-4 border-t-4 border-brown500 border-solid rounded-full animate-spin"></div>
      <p className="mt-4 text-lg">Loading...</p>
    </div>
  );
}
