import React from 'react'
import RegisterForm from '../components/RegisterForm'
import FormBackground from '../../../components/ui/FormBackground'
import Background from '../../../components/ui/Background'
import Button from '../../../components/ui/Button'

const RegisterPage = () => {
  return (
    <Background className='h-screen flex items-center justify-center'>

        <div className="flex justify-between rounded-lg overflow-hidden shadow-lg">            
            <div className="w-1/2 border-r border-[#FFFFFF17] flex justify-center items-center p-8">
                <div className="">
                    <h1>Join With Us</h1>
                    <p>Complete these steps to complete your profile</p>
                </div>
                <div className="space-y-4">
                    <Button variant="white_button" size="white_button">Register Your Account</Button>
                    <Button variant="black_button" size="black_button">Set up your profile</Button>
                </div>
            </div>
            <FormBackground className='w-1/2 h-auto shadow shadow-[#fff]/20'>
                <RegisterForm />
                <div className="flex text-sm text-[#99A1AF] my-4">
                    <div className="w-1/2 border-r border-[#FFFFFF17]"><p className='text-center'>Terms of Use</p></div>
                    <div className="w-1/2 border-l border-[#FFFFFF17]"><p className="text-center">Privacy Policy</p></div>
                </div>
            </FormBackground>
        </div>

    </Background>
  )
}

export default RegisterPage

