import React from 'react'
<<<<<<< Updated upstream
=======
import Button from './app/components/ui/Button'
import Background from './app/components/ui/Background'
import FormBackground from './app/components/ui/FormBackground'
import FormField from './app/components/ui/FormFields'
import RegisterPage from './app/features/auth/pages/RegisterPage'
>>>>>>> Stashed changes


function App() {

<<<<<<< Updated upstream
  return (
<div>hello</div>
  )
=======
  return <>
  <Background className='h-[100vh]'>
  <div>hello</div>
  <div className='p-10 space-x-4 space-y-4'>
  <Button variant="primary" size="primary">Continue</Button>
  <Button variant="primary" size="primary">Verify</Button>
  <Button variant="secondary" size="secondary" className='text-sm font-bold text-center text-[#F9FAFB]'>Create</Button>
  <Button variant="black_small_button" size="black_small_button" className='text-sm text-[#F9FAFB] font-bold text-center'>Cancel</Button>
  <Button variant="white_button" size="white_button">Register Your Account</Button>
  <Button variant="black_button" size="black_button">Set up your profile</Button>

  </div>

   <div className="flex items-center justify-center h-[768px]">
      <FormBackground className="flex flex-col items-center gap-6">
        <h2 className="text-white text-2xl font-bold">Sign In</h2>

        <FormField placeholder="Email" type="email" />
        <FormField placeholder="Password" type="password" />
        <FormField placeholder="Confirm Password" type="password" />

        <FormField placeholder="Confirm Password" type="password" />
        <FormField placeholder="Confirm Password" type="password" />
        <FormField placeholder="Confirm Password" type="password" />
        <Button variant="primary" size="primary">Login</Button>

      </FormBackground>
    </div>

  <RegisterPage />

      <h1>good</h1>

  </Background>


  </>
>>>>>>> Stashed changes
}

export default App
