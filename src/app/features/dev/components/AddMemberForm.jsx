import FormBackground from '@/components/ui/FormBackground'
import React from 'react'
import { X } from "@mynaui/icons-react";
import FormField from '@/components/ui/FormFields';
import CustomBox from '@/components/ui/CustomBox';

function AddMemberForm() {
  const users = [
    { id: 1, name: "Alice", photo: "/photos/alice.jpg" },
    { id: 2, name: "Bob", photo: "/photos/bob.jpg" },
    { id: 3, name: "Charlie", photo: "/photos/charlie.jpg" },
    { id: 4, name: "Charlie Charlie", photo: "/photos/charlie.jpg" },
    { id: 5, name: "Charlie Charlie Charlie", photo: "/photos/charlie.jpg" },
    { id: 6, name: "Charlie Charlie Charlie Charlie", photo: "/photos/charlie.jpg" },
    { id: 7, name: "Charlie Charlie Charlie Charlie Charlie", photo: "/photos/charlie.jpg" },
    { id: 8, name: "Charlie Charlie Charlie Charlie Charlie Charlie", photo: "/photos/charlie.jpg" },
    { id: 9, name: "Charlie Charlie Charlie", photo: "/photos/charlie.jpg" },
    { id: 10, name: "Charlie Charlie Charlie Charlie", photo: "/photos/charlie.jpg" },
    { id: 11, name: "Charlie Charlie", photo: "/photos/charlie.jpg" },
  ];

  return (
    <div>
      <FormBackground
        className="gap-6"
        style={{
          width: "724px",
          height: "576px",
          position: "absolute",
          top: "172px",
          left: "358px",
          padding: "2rem 3rem",
          transform: "rotate(0deg)",
          opacity: 1,
        }}
      >
        {/* Header */}
        <div
          style={{
            width: "628px",
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "0 10px",
            position: "relative",
          }}
        >
          <span
            style={{
              width: "125px",
              height: "28px",
              fontFamily: "sans-serif",
              fontWeight: 600,
              fontSize: "20px",
              lineHeight: "28px",
              color: "#F9FAFB",
            }}
          >
            Add Member
          </span>
          <X width={18} height={18} color="#F9FAFB" className="cursor-pointer" />
        </div>

        <FormField noFocus />

        {/* Scrollable Cards */}
        <CustomBox>
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: "12px",
              maxHeight: "300px",
              overflowY: "scroll",
              padding: "8px",

              /* Scrollbar styling for Chrome/Safari/Edge */
              scrollbarWidth: "thin", // Firefox
              scrollbarColor: "#FFFFFF17 #0868e7", // Firefox thumb | track

              /* Inline Webkit scrollbar styles */
              WebkitOverflowScrolling: "touch",
            }}
          >
            {users.map((user) => (
              <div
                key={user.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "8px",
                  padding: "8px 12px",
                  background: "#FFFFFF17",
                  border: "1px solid #FFFFFF26",
                  borderRadius: "0.5rem",
                  minWidth: "150px",
                  flex: "0 0 auto",
                  position: "relative",
                }}
              >
                <img
                  src={user.photo}
                  alt={user.name}
                  style={{
                    width: "40px",
                    height: "40px",
                    borderRadius: "50%",
                    objectFit: "cover",
                  }}
                />
                <span
                  style={{
                    color: "#F9FAFB",
                    fontWeight: 500,
                    flexGrow: 1,
                    whiteSpace: "nowrap",
                  }}
                >
                  {user.name}
                </span>
                <X
                  width={18}
                  height={18}
                  color="#F9FAFB"
                  className="cursor-pointer"
                  onClick={() => console.log("Remove", user.name)}
                />
              </div>
            ))}
          </div>
        </CustomBox>

        <CustomBox />
      </FormBackground>
    </div>
  );
}

export default AddMemberForm;
