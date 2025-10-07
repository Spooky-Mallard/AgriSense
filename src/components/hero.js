export default function Hero() {
  return (
    <section className="text-center py-20 bg-gray-50">
      <h1 className="text-5xl font-bold">App name</h1>
      <p className="text-gray-500 mt-2">App slogan</p>
      <div className="mt-6 flex justify-center gap-4">
        <button className="px-4 py-2 border rounded-md">Join</button>
        <button className="px-4 py-2 bg-black text-white rounded-md">Login</button>
      </div>
    </section>
  );
}
