export default function InquiryForm() {
  return (
    <div className="absolute bottom-[-50px] w-full flex justify-center z-20">
      <form className="bg-white/90 backdrop-blur-md shadow-2xl rounded-xl px-6 py-4 flex gap-4 items-center w-[90%] max-w-8xl border">
        <input
          placeholder="Enter Your First Name"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />

        <input
          placeholder="Email Address"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />
        <input
          placeholder="Phone Number"
          className="flex-1 px-4 py-2 border border-gray-300 rounded-md bg-white text-black placeholder-gray-400 outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />

        <select className="flex-1 px-4 py-2 border rounded-md text-gray-500 outline-none">
          <option>Tour Packages</option>
          <option>Golden Triangle</option>
          <option>Taj Mahal Tour</option>
        </select>

        <input
          type="date"
          className="flex-1 px-4 py-2 border rounded-md text-gray-500 outline-none"
        />

        <button className="bg-yellow-500 hover:bg-yellow-600 text-white font-semibold px-6 py-2 rounded-md transition">
          SUBMIT
        </button>
      </form>
    </div>
  );
}
