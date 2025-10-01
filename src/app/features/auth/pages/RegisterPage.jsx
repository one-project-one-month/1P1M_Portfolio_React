import React from 'react'
import RegisterForm from '../components/RegisterForm'
import FormBackground from '../../../components/ui/FormBackground'
import Background from '../../../components/ui/Background'
import Button from '../../../components/ui/Button'

const RegisterPage = () => {
  return (
    <Background className='h-screen flex items-center justify-center mx-auto'>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 overflow-hidden">            

            <div className="font-sans text-sm font-semibold leading-8 p-8">
                <div className="h-full flex flex-col justify-center items-center border-r-2 border-[#FFFFFF17]">
                    <div className="w-72 text-center mb-12">
                        <h1 className='text-5xl font-bold text-white leading-[1.5]'>Join With Us</h1>
                        <p className='text-gray-200 leading-5 text-center '>Complete these steps to complete your profile</p>
                    </div>
                    <div className="space-y-4">
                        <Button variant="white_button" size="white_button" className='justify-start'><div className="w-[18px] h-[18px] flex justify-center items-center border rounded-full"><span className='text-xs'>1</span></div>Register Your Account</Button>
                        <Button variant="black_button" size="black_button" className='justify-start'><div className="w-[18px] h-[18px] flex justify-center items-center border rounded-full"><span className='text-xs'>2</span></div>Set up your profile</Button>
                    </div>
                </div>
            </div>

            <div className="px-24">
                <FormBackground className='h-auto shadow shadow-[#fff]/20'>
                            <RegisterForm />
                            <div className="flex text-sm text-[#99A1AF] my-4">
                                <div className="w-1/2 border-r border-[#FFFFFF17]"><a href='javascript:void(0);' className='text-center cursor-pointer block'>Terms of Use</a></div>
                                <div className="w-1/2 border-l border-[#FFFFFF17]"><a href='javascript:void(0);' className="text-center cursor-pointer block">Privacy Policy</a></div>
                            </div>
                </FormBackground>
            </div>

        </div>

    </Background>
  )
}

export default RegisterPage

