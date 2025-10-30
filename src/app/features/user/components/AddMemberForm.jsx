
import React, { useState } from "react";
import { X } from "lucide-react";
import FormBackground from "@/components/ui/FormBackground";
import CustomBox from "@/components/ui/CustomBox";
import "../../../styles/index.css"
import Button from "@/components/ui/Button";


const MOCK_USERS = [
  { id: 1, name: "Bora", role: "UI | UX Designer", email: "bora@gmail.com", photo: "https://picsum.photos/200/300?random=1" },
  { id: 2, name: "Alice", role: "Frontend Developer", email: "alice@gmail.com", photo: "https://picsum.photos/200/300?random=2" },
  { id: 3, name: "David Luis", role: "Backend Developer", email: "david@gmail.com", photo: "https://picsum.photos/200/300?random=3" },
  { id: 4, name: "Charlie Charlie", role: "Fullstack Developer", email: "charlie@gmail.com", photo: "https://picsum.photos/200/300?random=4" },
  { id: 5, name: "Seth", role: "Fullstack Developer", email: "charlie@gmail.com", photo: "https://picsum.photos/200/300?random=4" },
  { id: 6, name: "Joey", role: "Fullstack Developer", email: "charlie@gmail.com", photo: "https://picsum.photos/200/300?random=4" },
  { id: 7, name: "Luis kuis tsg", role: "Fullstack Developer", email: "charlie@gmail.com", photo: "https://picsum.photos/200/300?random=4" },
  { id: 8, name: "Smith Jaguar William", role: "Fullstack Developer", email: "charlie@gmail.com", photo: "https://picsum.photos/200/300?random=4" },
  { id: 9, name: "Alex", role: "UI | UX Designer", email: "bora@gmail.com", photo: "https://picsum.photos/200/300?random=1" },
  { id: 10, name: "Austion", role: "UI | UX Designer", email: "bora@gmail.com", photo: "https://picsum.photos/200/300?random=1" },
  { id: 11, name: "Aaron", role: "UI | UX Designer", email: "bora@gmail.com", photo: "https://picsum.photos/200/300?random=1" },
  { id: 12, name: "Aron", role: "UI | UX Designer", email: "bora@gmail.com", photo: "https://picsum.photos/200/300?random=1" },


];

export default function AddMemberForm() {
  const [search, setSearch] = useState("");
  const [selectedMembers, setSelectedMembers] = useState([]);

  const filteredUsers =
    search.trim() === ""
      ? []
      : MOCK_USERS.filter(
        (user) =>
          user.name.toLowerCase().includes(search.toLowerCase()) &&
          !selectedMembers.find((m) => m.id === user.id)
      );

  const handleAdd = (user) => {
    if (!selectedMembers.find((m) => m.id === user.id)) {
      setSelectedMembers([...selectedMembers, user]);
    }
  };

  const handleRemove = (userId) => {
    setSelectedMembers(selectedMembers.filter((m) => m.id !== userId));
  };

  return (
    <div className="flex items-center justify-center">
      <FormBackground
        style={{
          width: "724px",
          height: "576px",
          borderRadius: "1.5rem", // 3xl = 1.5rem
          opacity: 1,
          paddingTop: "2rem",    // spacing/8 = 2rem
          paddingRight: "3rem",  // spacing/12 = 3rem
          paddingBottom: "2rem",
          paddingLeft: "3rem",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          gap: "24px",     
          position: "relative",
        }}
      >

        {/* Header */}
        <div
          style={{
            position: "absolute",
            top: "2rem",                // stick to top
            left: "50%",             // center horizontally
            transform: "translateX(-50%)", // center
            width: "628px",
            height: "40px",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            backgroundColor: "inherit", // keep background same as container
          }}
        >
          <h2
            style={{
              width: "125px",
              height: "28px",
              fontFamily: "sans-serif",
              fontWeight: 600,
              fontStyle: "normal",
              fontSize: "20px",
              lineHeight: "28px",
              letterSpacing: "normal",
              color: "var(--Text-Negative, #F9FAFB)",
              display: "flex",
              alignItems: "center",
            }}
          >
            Add Member
          </h2>
          <button
            style={{
              color: "white",
              width: "36px",
              height: "36px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <X />
          </button>
        </div>

        {/*body*/}
        <div
          style={{
            width: "630px",
            height: "448px",
            justifyContent: "space-between",
            opacity: 1,
            marginTop: "3rem",
            position: "relative",
          }}
        >

          {/* Search */}
          <input
            type="text"
            placeholder="Search member..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={{
              width: "628px",
              height: "48px",
              borderRadius: "0.5rem",
              border: "1px solid #FFFFFF26",
              backgroundColor: "#FFFFFF17",
              padding: "12px 16px",
              color: "#E5E7EB",
            }}
            className="text-sm placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-[#7C3AED]"
          />

          {/* Selected Members */}
          {selectedMembers.length > 0 && (
            <CustomBox
              style={{
                width: "628px",
                height: "150px",
                borderRadius: "0.5rem",
                borderWidth: "1px",
                padding: "13px 20px",
                display: "flex",
                flexWrap: "wrap",
                gap: "12px",
                overflowY: "auto",
                marginTop: "16px",
                alignContent: "flex-start",
                boxSizing: "border-box",
              }}
            >
              <div
                style={{
                  width: "566px",
                  height: "124px",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: "12px",
                  overflowY: "auto",
                  paddingRight: "8px",
                }}
                className="custom-scrollbar"
              >
                {selectedMembers.map((member) => (
                  <CustomBox
                    key={member.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      borderRadius: "0.5rem",
                      borderWidth: "1px",
                      borderStyle: "solid",
                      borderColor: "#3A3A3A",
                      padding: "8px 12px",
                      height: "56px",
                      gap: "24px",
                      flex: "0 1 auto",
                      width: "auto",
                      maxWidth: "100%",
                      boxSizing: "border-box",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        width: "100%",
                        gap: "8px",
                      }}
                    >
                      <div
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: "8px",
                          minWidth: 0,
                        }}
                      >
                        <img
                          src={member.photo}
                          alt={member.name}
                          style={{
                            width: "40px",
                            height: "40px",
                            borderRadius: "50%",
                            objectFit: "cover",
                            flexShrink: 0,
                          }}
                        />
                        <p
                          style={{
                            fontFamily: "sans-serif",
                            fontWeight: 500,
                            fontSize: "12px",
                            lineHeight: "16px",
                            color: "#D9D9D9",
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            maxWidth: "150px",
                          }}
                        >
                          {member.name}
                        </p>
                      </div>

                      <button
                        onClick={() => handleRemove(member.id)}
                        style={{
                          width: "24px",
                          height: "24px",
                          borderRadius: "50%",
                          backgroundColor: "#EDF3F3",
                          border: "none",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          cursor: "pointer",
                        }}
                      >
                        <X size={16} color="#000000" />
                      </button>
                    </div>
                  </CustomBox>
                ))}
              </div>
            </CustomBox>
          )}

          {/* Search Members */}
          <div
            className="custom-scrollbar"
            style={{
              width: "628px",
              flex: "1 1 auto",
              overflowY: "auto",
              marginTop: "8px",
              maxHeight: "150px",
            }}
          >
            {filteredUsers.length === 0 ? (
              <p className="text-gray-500 text-center text-sm mt-4">
                {search ? "No members found" : "Type a name to search"}
              </p>
            ) : (
              filteredUsers.map((user) => (
                <CustomBox
                  key={user.id}
                  style={{
                    width: "628px",
                    height: "48px",
                    borderRadius: "0.5rem",
                    padding: "0 16px",
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: "6px",
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
                  <div
                    style={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      gap: "40px",
                    }}
                  >
                    <div style={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
                      <p
                        style={{
                          width: "73px",
                          height: "16px",
                          fontFamily: "sans-serif",
                          fontWeight: 500,
                          fontSize: "12px",
                          lineHeight: "16px",
                          color: "#D9D9D9",
                        }}
                      >
                        {user.name.length > 9 ? `${user.name.slice(0, 9)}...` : user.name}
                      </p>
                      <p
                        style={{
                          width: "73px",
                          height: "13px",
                          fontFamily: "Actor, sans-serif",
                          fontWeight: 400,
                          fontSize: "10px",
                          lineHeight: "13px",
                          color: "#D9D9D9",
                        }}
                      >
                        {user.email}
                      </p>
                    </div>
                    <p
                      style={{
                        height: "20px",
                        fontFamily: "sans-serif",
                        fontWeight: 400,
                        fontSize: "14px",
                        lineHeight: "20px",
                        color: "#D9D9D9",
                        whiteSpace: "nowrap",
                      }}
                    >
                      {user.role}
                    </p>
                  </div>

                  <button
                    style={{
                      width: "56px",
                      height: "36px",
                      borderRadius: "1.5rem",
                      padding: "8px 16px",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      backgroundColor: "#9C39FC",
                      color: "#FFFFFF",
                      border: "none",
                      cursor: "pointer",
                      fontSize: "14px",
                      fontWeight: 500,
                    }}
                    onClick={() => handleAdd(user)}
                  >
                    Add
                  </button>
                </CustomBox>
              ))
            )}
          </div>

          {/* Buttons */}

          <div
            style={{
              position: "absolute",             
              width: "630px",
              height: "48px",
              display: "flex",
              gap: "16px",
              opacity: 1,
              right: "1px",
              bottom: "1px",
              width: "fit-content",
            }}
          >
            <button
              className="flex items-center justify-center gap-1 rounded-full"
              style={{
                width: "100px",
                height: "48px",
                backgroundColor: "var(--PrimaryColor-brandcolor-50, #F5EBFF)",
              }}
            >
              <span
                style={{
                  fontFamily: "Actor, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "var(--Text-Title, #101828)",
                }}
              >
                Discard
              </span>
            </button>
            <button
              className="flex items-center justify-center gap-1 rounded-full"
              style={{
                width: "131px",
                height: "48px",
                backgroundColor: "var(--PrimaryColor-brandcolor-50, #9C39FC)",
              }}
            >
              <span
                style={{
                  fontFamily: "Actor, sans-serif",
                  fontWeight: 400,
                  fontSize: "14px",
                  color: "var(--Text-Negative, #F9FAFB)",
                }}
              >
                Save Changes
              </span>
            </button>
          </div>


        </div>

      </FormBackground>
    </div>

  );
}
