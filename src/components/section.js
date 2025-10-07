export default function Section({ title, text }) {
  return (
    <div className="p-6 border rounded-md my-6 bg-white shadow-sm">
      <h2 className="text-xl font-semibold">{title}</h2>
      <p className="text-gray-600 mt-2">{text}</p>
    </div>
  );
}
