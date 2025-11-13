export default function LoadingScreen() {
  return (
    <div className="flex flex-col items-center justify-center h-[60vh] text-white">
      <div className="w-12 h-12 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
      <p className="mt-4 text-lg animate-pulse">Loading your feed...</p>
    </div>
  );
}