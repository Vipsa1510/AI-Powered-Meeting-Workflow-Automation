export default function EmailModal({ email }) {

  return (

    <div>

      <h2 className="text-3xl font-bold mb-6">
       
      </h2>

      <div
        className="
          bg-[#08172d]
          border
          border-blue-900
          rounded-2xl
          p-8
          whitespace-pre-wrap
          leading-8
          text-gray-300
        "
      >
        {email}
      </div>

    </div>
  );
}