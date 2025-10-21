import React from "react";
import CopyIcon from "@/assets/icons/Copy.png";
import Button from "../../../components/ui/Button";

export default function DevCard({ member, copyToClipboard }) {
  const handleVisitProfile = () => {
    const profileLink =
      member.profileUrl || `/user/profile/${member.telegram.replace("@", "")}`;
    window.open(profileLink, "_blank");
  };
  const handleInvite = () => {
    const inviteLink =
      member.inviteUrl || `/invite?dev=${member.telegram.replace("@", "")}`;
    window.open(inviteLink, "_blank");
  };

  return (
    <div className="bg-[#030712] rounded-2xl p-5 w-[420px] h-[225px]">
      <div className="flex items-start gap-4 mb-6">
        <img
          src={member.image}
          alt={member.name}
          className="w-[104px] h-[106px] rounded-full object-cover"
        />
        <div className="flex-1">
          <h3 className="text-[#F9FAFB] text-2xl font-normal mb-2 leading-8">
            {member.name}
          </h3>
          <div className="inline-block bg-white/10 border border-white/15 text-[#F9FAFB] text-sm rounded-md py-2.5 px-[10px]">
            {member.role}
          </div>
          <div className="flex items-center gap-2 leading-6 pt-[5px]">
            <span className="text-[#6A7282] text-[16px]">
              Telegram: {member.telegram}
            </span>
            <img
              src={CopyIcon}
              alt="Copy"
              onClick={() => copyToClipboard(member.telegram)}
              className="w-[26px] h-[26px] cursor-pointer p-1 bg-white/15 rounded hover:bg-white/25 transition"
            />
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between gap-10 ml-auto w-full">
        <div className="flex gap-3 pl-0.5">
          {member.socials.map((social, i) => (
            <a
              key={i}
              href={social.url}
              target="_blank"
              rel="noopener noreferrer"
              className="w-[17px] h-[16px] flex items-center justify-center rounded-full hover:bg-slate-700 transition-colors"
            >
              <img
                src={social.icon}
                alt={social.name}
                className="w-5 h-5 object-contain"
              />
            </a>
          ))}
        </div>

        <div className="flex flex-1 justify-center gap-3 max-w-sm">
          <Button
            variant="black_button"
            size="primary"
            type="button"
            className="flex-1 py-2 hover:bg-[#fffff4] transition-colors"
            onClick={handleVisitProfile}
          >
            Visit Profile
          </Button>
          <Button
            variant="primary"
            size="primary"
            className="lex-1 py-2  hover:bg-[#8A2BE2] transition-colors"
            onClick={handleInvite}
          >
            Invite
          </Button>
        </div>
      </div>
    </div>
  );
}
