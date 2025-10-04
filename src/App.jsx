import React from "react";
import Button from "./app/components/ui/Button";
import Background from "./app/components/ui/Background";
import FormBackground from "./app/components/ui/FormBackground";
import FormField from "./app/components/ui/FormFields";

function App() {
  return (
    <>
      <Background className="flex items-center justify-center">
        <div>
          <FormBackground className="flex flex-col items-center gap-6">
            <h2 className="text-white text-2xl font-bold">Sign In</h2>

            <FormField placeholder="Email" type="email" />
            <FormField placeholder="Password" type="password" />
            <FormField placeholder="Confirm Password" type="password" />

            <FormField placeholder="Confirm Password" type="password" />
            <FormField placeholder="Confirm Password" type="password" />
            <FormField placeholder="Confirm Password" type="password" />
            <Button variant="primary" size="primary">
              Login
            </Button>
          </FormBackground>
        </div>
      </Background>
    </>
  );
}

export default App;
