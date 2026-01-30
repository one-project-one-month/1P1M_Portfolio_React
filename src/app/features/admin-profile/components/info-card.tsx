import React from 'react';

interface InfoCardProps {
  title: string;
  children: React.ReactNode;
}

export const InfoCard = ({ title, children }: InfoCardProps) => (
  <div className="bg-[#15192b] border border-gray-800 rounded-lg p-6 flex flex-col h-full">
    <h3 className="text-white text-lg font-medium mb-5">{title}</h3>
    <div className="flex-1">{children}</div>
  </div>
);
