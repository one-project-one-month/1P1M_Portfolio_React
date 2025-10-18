import React from 'react';
import Button from "../../../components/ui/Button";
import FormBackground from "../../../components/ui/FormBackground";
import TextField from "@/components/ui/TextField";
import FormTextArea from "@/components/ui/FormTextArea";

const Projectideaform = () => {
  return (
    <FormBackground className="flex items-center justify-center w-full h-full bg-black">
      <div className="w-[535px] flex flex-col gap-4">
        
        <TextField
          label="Project idea Name"
          id="projectName"
          name="projectName"
          placeholder="Enter your project name"
          className='w-full text-white font-sans text-sm font-medium leading-8'
        />

        <FormTextArea
          name="projectDetails"
          placeholder="Provide details about your project"
          className="w-full h-[150px] mt-[-25px] text-white"
        />

        <div className="mt-2">
          <h3 className="text-white text-sm font-medium mb-2">Project Type</h3>
          <div className="flex flex-wrap gap-4">
            {["Mobile", "Website", "Desktop", "Game"].map((type) => (
              <label key={type} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="projectType"
                  value={type.toLowerCase()}
                  className="w-4 h-4 text-purple-500 border-gray-500 bg-gray-800 focus:ring-purple-500"
                />
                <span className="text-white text-sm">{type}</span>
              </label>
            ))}
          </div>
        </div>

        <div className="flex justify-end gap-2 mt-4">
          <Button variant="black_button" size="black_small_button">
            Cancel
          </Button>
          <Button variant="primary" size="black_small_button">
            Submit
          </Button>
        </div>

      </div>
    </FormBackground>
  );
};

export default Projectideaform;
