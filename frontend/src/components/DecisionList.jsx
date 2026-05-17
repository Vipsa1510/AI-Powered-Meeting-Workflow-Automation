export default function DecisionList({ decisions }) {

  return (

    <div>

      <h2 className="text-3xl font-bold mb-6">
        Decisions
      </h2>

      <div className="space-y-4">

        {
          decisions.map((item, index) => (

            <div
              key={index}
              className="
                bg-[#13294d]
                border
                border-blue-900
                rounded-xl
                p-5
                text-gray-300
              "
            >

              {
                typeof item === "string"
                  ? item
                  : item.decision
              }

            </div>
          ))
        }

      </div>

    </div>
  );
}