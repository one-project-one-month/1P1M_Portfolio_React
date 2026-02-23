import { Dialog } from '@radix-ui/themes';
import { X } from 'lucide-react';
import Background from '../../../../components/background';
import { Button } from '../../../../components/ui/button';
import FormBackground from '../../../../components/ui/form-bg';
import RegisterForm from './components/register-form';

function RegisterPage() {
  return (
    <Background className="h-screen flex  mx-auto">
      <div className="h-screen grid grid-cols-1 lg:grid-cols-2 gap-8 overflow-hidden">
        <div className="hidden lg:block font-sans text-sm font-semibold leading-8 p-8">
          <div className="h-full flex flex-col justify-center items-center lg:border-r-2 border-[#FFFFFF17] px-60">
            <div className="w-72 text-center mb-12">
              <h1 className="text-5xl font-bold text-white leading-normal">
                Join With Us
              </h1>
              <p className="text-gray-200 leading-5 text-center">
                Complete these steps to complete your profile
              </p>
            </div>

            <div className="space-y-4">
              <Button
                variant="white_button"
                size="white_button"
                className="flex items-center justify-start gap-3"
              >
                <div className="w-5 h-5 flex justify-center items-center border rounded-full">
                  <span className="text-xs">1</span>
                </div>
                Register Your Account
              </Button>

              <Button
                variant="black_button"
                size="black_button"
                className="flex items-center justify-start gap-3"
              >
                <div className="w-5 h-5 flex justify-center items-center border rounded-full">
                  <span className="text-xs">2</span>
                </div>
                Set up your profile
              </Button>
            </div>
          </div>
        </div>

        <div className="flex justify-center items-center">
          <div className="w-full max-w-md lg:max-w-lg">
            <FormBackground className="h-auto shadow shadow-white/20">
              <RegisterForm />

              <div className="flex justify-center gap-8 text-white/60 mt-6">
                <Dialog.Root>
                  <Dialog.Trigger>
                    <span className="hover:text-white cursor-pointer transition-colors">
                      Terms of Use
                    </span>
                  </Dialog.Trigger>

                  <Dialog.Content
                    size="4"
                    maxWidth="758px"
                    className="bg-black! text-white py-10! px-16! rounded-3xl! max-h-[90vh] overflow-y-auto"
                  >
                    <div className="flex flex-col gap-8">
                      <div className="flex items-center justify-end">
                        <Dialog.Close>
                          <X className="cursor-pointer" size={30} />
                        </Dialog.Close>
                      </div>
                      <Dialog.Title size="7" className="mb-0!">
                        Terms and Conditions
                      </Dialog.Title>
                      <hr className="border-muted-foreground" />

                      <div className="flex flex-col items-start gap-8">
                        <p className="text-xl font-semibold">
                          Hackathon Registration (Next OPOM)
                        </p>
                        <p className="text-gray-400 text-lg">
                          To participate in an OPOM Hackathon, additional
                          information is required for coordination and team
                          formation. By registering, you agree to provide:
                        </p>

                        <div className="px-6">
                          <ul className="text-gray-400 list-disc text-lg">
                            <li>Contact Details</li>
                            <li>Gmail address</li>
                            <li>Telegram username</li>
                            <li>Phone Number</li>
                            <li>
                              Technical Role: Your primary discipline (e.g.,
                              Frontend, Backend, UIUX etc.)
                            </li>
                            <li>Data Usage for Events</li>
                          </ul>
                        </div>
                        <p className="text-lg">
                          This specific data is collected solely to manage the
                          hackathon, facilitate communication between organizers
                          and participants, and assist in team matching. We will
                          not sell this data to third parties.
                        </p>
                      </div>
                      {/* Buttons */}
                      <div className="flex items-center justify-end gap-6">
                        <Dialog.Close>
                          <Button
                            type="button"
                            variant="black_button"
                            size="primary"
                          >
                            Cancel
                          </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                          <Button type="button" className="text-lg">
                            Agree
                          </Button>
                        </Dialog.Close>
                      </div>
                    </div>
                  </Dialog.Content>
                </Dialog.Root>

                <span className="text-white/20">|</span>
                <Dialog.Root>
                  <Dialog.Trigger>
                    <span className="hover:text-white cursor-pointer transition-colors">
                      Privacy Policy
                    </span>
                  </Dialog.Trigger>

                  <Dialog.Content
                    size="4"
                    maxWidth="758px"
                    className="bg-black! text-white py-10! px-16! rounded-3xl! max-h-[90vh] overflow-y-auto"
                  >
                    <div className="flex flex-col gap-8">
                      <div className="flex items-center justify-end">
                        <Dialog.Close>
                          <X className="cursor-pointer" size={30} />
                        </Dialog.Close>
                      </div>
                      <Dialog.Title size="7" className="mb-0!">
                        Terms and Conditions
                      </Dialog.Title>
                      <hr className="border-muted-foreground" />

                      <div className="flex flex-col items-start gap-8">
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold">
                            1. Acceptance of Terms
                          </h3>
                          <p className="text-gray-400 text-lg">
                            By creating a profile on the One Project One Month
                            (Opom) portal or registering for an Opom hackathon,
                            you agree to be bound by these Terms and Conditions
                            and our data usage practices. If you do not agree,
                            you will not be able to create a profile or
                            participate in our events.
                          </p>
                        </div>
                        <div className="space-y-2">
                          <h3 className="text-xl font-semibold">
                            2. User Profiles & Public Visibility
                          </h3>
                          <p className="text-gray-400 text-lg">
                            When you create a profile on the Opom portal, you
                            acknowledge that certain information will be visible
                            to the public and other registered users to
                            facilitate networking and collaboration. This
                            includes:
                          </p>
                          <div className="p-6">
                            <ul className="text-gray-400 list-disc text-lg">
                              <li>Full Name and Profile Picture</li>
                              <li>Professional descriptions and bios</li>
                              <li>
                                Links to external social/professional accounts
                                (GitHub, LinkedIn, etc.)
                              </li>

                              <li>Your registered email address.</li>
                            </ul>
                          </div>
                        </div>
                        <p className="text-lg">
                          By creating a profile, you allow OPOM permission to
                          display this data publicly on our platform.
                        </p>
                      </div>
                      {/* Buttons */}
                      <div className="flex items-center justify-end gap-6">
                        <Dialog.Close>
                          <Button
                            type="button"
                            variant="black_button"
                            size="primary"
                          >
                            Cancel
                          </Button>
                        </Dialog.Close>
                        <Dialog.Close>
                          <Button type="button" className="text-lg">
                            Agree
                          </Button>
                        </Dialog.Close>
                      </div>
                    </div>
                  </Dialog.Content>
                </Dialog.Root>
              </div>
            </FormBackground>
          </div>
        </div>
      </div>
    </Background>
  );
}

export default RegisterPage;
