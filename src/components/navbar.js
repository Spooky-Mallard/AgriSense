
export default function Navbar() {
  return (
    <nav className="flex items-center bg-primary justify-between p-4 shadow-sm">
      {/* Logo */}
      <div className="text-2xl font-bold">⚡</div>

      {/* Links */}
      <div className="hidden md:flex gap-6">
        <a href="/" className="hover:text-gray-600">Dashboard</a>
        <a href="/summary" className="hover:text-gray-600">Summary</a>
        <a href="/insights" className="hover:text-gray-600">Insights</a>
        <a href="#" className="hover:text-gray-600">Pricing</a>
        <a href="#" className="hover:text-gray-600">Contact</a>
        <a href="#" className="hover:text-gray-600">Support</a>
      </div>

      {/* Auth buttons */}
      <div className="flex gap-2">
        <button className="px-3 py-1 border rounded-md">Sign in</button>
        <button className="px-3 py-1 bg-black text-white rounded-md">Register</button>
      </div>
    </nav>
  );
}
