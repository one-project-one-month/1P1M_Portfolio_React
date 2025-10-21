import Background from "@/components/ui/Background";
import FormBackground from "@/components/ui/FormBackground";
import FormDropdown from "@/components/ui/FormDropdown";
import TextField from "@/components/ui/TextField";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import TechStack from "../../../constants/TechStack";
import Platform from "@/constants/Platform";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Button from "@/components/ui/Button";

const OpomRegisterPage = () => {
  const { control, handleSubmit, watch } = useForm({
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      role: "",
      platform: "",
    },
  });

  const role = watch("role");

  return (
    <Background className="h-screen flex items-center justify-center">
      <FormBackground className="flex items-center flex-col w-[500px] h-[580px]">
        {/* Heading */}
        <div className="text-white">
          <h1 className="font-sans font-bold text-2xl leading-8 mb-6">
            OPOM Register Page
          </h1>
        </div>

        {/* form fields */}
        <div className="w-[404px] h-[260px] flex flex-col justify-around">
          <div className="w-full relative">
            <TextField
              control={control}
              id="name"
              name="name"
              placeholder="Enter your name"
              showEditButton={false}
              className="relative w-full text-white font-sans text-sm font-semibold leading-8"
            />

            <TextField
              control={control}
              id="email"
              name="email"
              placeholder="Enter your email"
              showEditButton={false}
              className="relative w-full text-white font-sans text-sm font-semibold leading-8"
            />

            <Controller
              name="phone"
              control={control}
              render={({ field }) => (
                <PhoneInput
                  {...field}
                  country={"mm"}
                  containerClass="mb-6"
                  inputClass="!bg-[#111] !w-full !h-12 !text-white !border-gray-700"
                  buttonClass="!bg-[#111] !border-gray-700 hover:!bg-gray-800"
                  dropdownClass="!bg-[#111] !text-white"
                  searchClass="!bg-gray-800 !text-white"
                  placeholder="Enter phone number"
                />
              )}
            />

            <FormDropdown
              control={control}
              name="role"
              placeholder="Role"
              menuList={TechStack}
              className="relative w-full text-white font-sans text-sm font-semibold leading-8 mb-8"
            />

            <FormDropdown
              control={control}
              name="platform"
              placeholder="Platform link"
              menuList={Platform}
              className="relative w-full text-white font-sans text-sm font-semibold leading-8 mb-8"
            />

            <div className="flex justify-between w-full">
              <Button
                variant="black_small_button"
                size="primary"
                className="w-[50] text-white transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mt-3"
              >
                Cancel
              </Button>

              <Button
                variant="primary"
                size="primary"
                className="w-[50] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl mt-3"
              >
                Register
              </Button>
            </div>
          </div>
        </div>
      </FormBackground>
    </Background>
  );
};

export default OpomRegisterPage;