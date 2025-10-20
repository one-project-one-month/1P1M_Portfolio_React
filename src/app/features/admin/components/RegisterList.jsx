import React from "react";

const RegisterList = ({ role }) => {
  const users = [
    {
      name: "Alice Tan",
      email: "alice.tan@example.com",
      phone: "09123456789",
      role: "Frontend Developer",
    },
    {
      name: "John Smith",
      email: "john.smith@example.com",
      phone: "09234567890",
      role: "Backend Developer",
    },
    {
      name: "Mika Suzuki",
      email: "mika.suzuki@example.com",
      phone: "09345678901",
      role: "Fullstack Developer",
    },
    {
      name: "David Lee",
      email: "david.lee@example.com",
      phone: "09456789012",
      role: "UI/UX Designer",
    },
    {
      name: "Emma Chen",
      email: "emma.chen@example.com",
      phone: "09567890123",
      role: "Frontend Developer",
    },
    {
      name: "Noah Brown",
      email: "noah.brown@example.com",
      phone: "09678901234",
      role: "Backend Developer",
    },
    {
      name: "Sakura Ito",
      email: "sakura.ito@example.com",
      phone: "09789012345",
      role: "Mobile Developer",
    },

    // {
    //   name: "Sakura Ito",
    //   email: "sakura.ito@example.com",
    //   phone: "09789012345",
    //   role: "Mobile Developer",
    // },
    // {
    //   name: "Lucas Park",
    //   email: "lucas.park@example.com",
    //   phone: "09890123456",
    //   role: "DevOps Engineer",
    // },
    // {
    //   name: "Maria Gomez",
    //   email: "maria.gomez@example.com",
    //   phone: "09901234567",
    //   role: "Frontend Developer",
    // },
    // {
    //   name: "Kenji Nakamura",
    //   email: "kenji.nakamura@example.com",
    //   phone: "09112233445",
    //   role: "Backend Developer",
    // },
    // {
    //   name: "Sophia Lin",
    //   email: "sophia.lin@example.com",
    //   phone: "09123334455",
    //   role: "QA Engineer",
    // },
    // {
    //   name: "Ethan Carter",
    //   email: "ethan.carter@example.com",
    //   phone: "09234445566",
    //   role: "Fullstack Developer",
    // },
    // {
    //   name: "Hana Kim",
    //   email: "hana.kim@example.com",
    //   phone: "09345556677",
    //   role: "Frontend Developer",
    // },
    // {
    //   name: "Daniel Cruz",
    //   email: "daniel.cruz@example.com",
    //   phone: "09456667788",
    //   role: "Backend Developer",
    // },
    // {
    //   name: "Yuki Sato",
    //   email: "yuki.sato@example.com",
    //   phone: "09567778899",
    //   role: "Mobile Developer",
    // },
    // {
    //   name: "Olivia White",
    //   email: "olivia.white@example.com",
    //   phone: "09678889900",
    //   role: "UI/UX Designer",
    // },
    // {
    //   name: "Liam Johnson",
    //   email: "liam.johnson@example.com",
    //   phone: "09789990011",
    //   role: "Frontend Developer",
    // },
    // {
    //   name: "Isabella Wang",
    //   email: "isabella.wang@example.com",
    //   phone: "09890001122",
    //   role: "Backend Developer",
    // },
    // {
    //   name: "Arjun Patel",
    //   email: "arjun.patel@example.com",
    //   phone: "09901112233",
    //   role: "DevOps Engineer",
    // },
    // {
    //   name: "Chloe Nguyen",
    //   email: "chloe.nguyen@example.com",
    //   phone: "09112223344",
    //   role: "Fullstack Developer",
    // },
  ];

  const filterUser =
    role === "All" ? users : users.filter((user) => user.role.includes(role));

  const tHead = ["No", "Name", "Email", "Phone", "Role"];

  return (
    <table className="text-white/90 w-full mt-10 p-2  border-separate border-spacing-y-1">
      <thead>
        <tr className="">
          {tHead.map((title, index) => (
            <th key={index} className="text-lg px-4 font-normal pb-8 ">
              {title}
            </th>
          ))}
        </tr>
      </thead>

      <tbody className="">
        {filterUser.map((user, index) => (
          <tr key={index} className="text-center text-sm font-medium  ">
            <td className="px-4 py-5 border-s rounded-tl-xl border-t rounded-bl-xl border-b">
              {index + 1}
            </td>
            <td className="px-4 py-5 border-t border-b ">{user.name}</td>
            <td className="px-4 py-5 border-t border-b">{user.email}</td>
            <td className="px-4 py-5 border-t border-b">{user.phone}</td>
            <td className="px-4 py-5  border-e border-t rounded-tr-xl border-b rounded-br-xl">
              {user.role}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default RegisterList;
