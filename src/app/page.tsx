import Scene3D from "@/components/Scene3D";

export default function Home() {
  return (
    <main className="min-h-screen bg-black">
      <div className="absolute z-10 top-0 left-0 w-full p-4 text-center">
        <h1 className="text-4xl font-bold text-white">
          Interactive 3D Universe
        </h1>
        <p className="text-gray-300 mt-2">
          Click to enlarge • Hover for color change • Drag to rotate • Scroll to
          zoom
        </p>
      </div>
      <Scene3D />
    </main>
  );
}
