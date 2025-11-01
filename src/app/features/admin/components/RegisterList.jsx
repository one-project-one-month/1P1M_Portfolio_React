
import React from "react";

const RegisterList = ({ role}) => {
  

  const filterUser=[]

  const tHead = ["No", "Name", "Email", "Phone", "Role"];



  return (
    <table className="text-white/90 w-full h-full mt-4 p-2  border-separate border-spacing-y-1">
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
