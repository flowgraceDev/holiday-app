export default function Testimonials() {
  return (
    <div className="p-10 bg-gray-100">
      <h2 className="text-2xl font-bold mb-6">Testimonials</h2>

      <div className="grid grid-cols-2 gap-6">
        <div className="shadow p-4">
          <p>Excellent, Culture Tour India made our trip memorable.</p>
          <h4 className="mt-2 font-bold">Aminesh - India</h4>
        </div>

        <div className="shadow p-4">
          <p>Wonderful experience with tour guide.</p>
          <h4 className="mt-2 font-bold">Michael - Australia</h4>
        </div>
      </div>
    </div>
  );
}