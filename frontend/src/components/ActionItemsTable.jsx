export default function ActionItemsTable({ items }) {

  return (

    <div>

      <h2 className="text-3xl font-bold mb-6">
        Action Items
      </h2>

      <div className="overflow-x-auto">

        <table className="w-full border-collapse">

          <thead>

            <tr className="bg-[#13294d]">

              <th className="text-left p-4 rounded-l-xl">
                Owner
              </th>

              <th className="text-left p-4">
                Task
              </th>

              <th className="text-left p-4 rounded-r-xl">
                Deadline
              </th>

            </tr>

          </thead>

          <tbody>

            {
              items.map((item, index) => (

                <tr
                  key={index}
                  className="border-b border-blue-900"
                >

                  <td className="p-4 text-blue-300 font-medium">
                    {item.owner}
                  </td>

                  <td className="p-4 text-gray-300">
                    {item.task}
                  </td>

                  <td className="p-4 text-gray-400">
                    {item.deadline}
                  </td>

                </tr>
              ))
            }

          </tbody>

        </table>

      </div>

    </div>
  );
}