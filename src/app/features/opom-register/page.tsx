import TrashIcon from '@/assets/icons/trash-icon';
import TermsConditionsContainer from '@/components/terms-conditions';
import { Button } from '@/components/ui/button';
import FormBackground from '@/components/ui/form-bg';
import FormDropdown from '@/components/ui/form-dropdown';
import FormField from '@/components/ui/form-field';
import { Platforms, TechStacks } from '@/constants';
import { useState } from 'react';
import { Controller, type SubmitHandler } from 'react-hook-form';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';
import {
  useOpomRegister,
  type OpomFormValues,
} from './hooks/use-opom-register';

export default function OpomRegisterPage() {
  const [isTermsAccepted, setIsTermsAccepted] = useState(false);
  const [isTermsError, setIsTermsError] = useState(false);

  const {
    isLoading,
    platformLinks,
    errors,
    register,
    control,
    handleSubmit,
    reset,
    addPlatformLink,
    removePlatformLink,
    handleRegister,
  } = useOpomRegister();

  const handleFormSubmit: SubmitHandler<OpomFormValues> = async (
    data,
    event,
  ) => {
    if (!isTermsAccepted) {
      setIsTermsError(true);
      return;
    }

    setIsTermsError(false);
    await handleRegister(data, event);
  };

  const handleFormError = () => {
    if (!isTermsAccepted) {
      setIsTermsError(true);
    }
  };

  return (
    <div className="flex items-center py-6">
      <div className="w-full h-full flex justify-center p-5 md:p-0 items-center">
        <FormBackground className="w-full md:w-[532px]  flex mx-auto items-center h-auto  flex-col  p-8">
          <h3 className="text-4xl text-center p-2 text-white mb-5 font-bold">
            OPOM REGISTER
          </h3>

          <form
            onSubmit={handleSubmit(handleFormSubmit, handleFormError)}
            className="w-full"
          >
            <div className="space-y-4 max-w-2xl mx-auto mb-5">
              <FormField
                placeholder="Name"
                className="w-full "
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}

              <FormField
                placeholder="Email"
                className="w-full"
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className="text-red-500 text-sm">{errors.email.message}</p>
              )}

              <Controller
                name="phone"
                control={control}
                rules={{ required: 'Phone number is required' }}
                render={({ field }) => (
                  <PhoneInput
                    {...field}
                    country="mm"
                    inputClass="!bg-[#374151] !w-full !h-12 !text-white"
                  />
                )}
              />

              <FormField
                placeholder="Telegram username"
                className="w-full"
                {...register('telegram_username', {
                  required: 'Telegram username is required',
                })}
              />
              {errors.telegram_username && (
                <p className="text-red-500 text-sm">
                  {errors.telegram_username.message}
                </p>
              )}

              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <FormDropdown
                    placeholder="Role"
                    menuList={TechStacks}
                    selectedValue={field.value}
                    onChange={field.onChange}
                  />
                )}
              />

              <FormField
                placeholder="GitHub Link"
                className="w-full"
                {...register('github_url', {
                  required: 'GitHub is required',
                })}
              />
              {errors.github_url && (
                <p className="text-red-500 text-sm">
                  {errors.github_url.message}
                </p>
              )}

              {platformLinks.map((_, index) => (
                <div
                  key={index}
                  className={`w-full grid  gap-3 items-center ${
                    platformLinks.length > 1 ? 'grid-cols-3' : 'grid-cols-3'
                  }`}
                >
                  <Controller
                    name={`platformLinks_${index}`}
                    control={control}
                    render={({ field }) => (
                      <FormDropdown
                        placeholder="Platform"
                        menuList={Platforms}
                        selectedValue={field.value}
                        onChange={field.onChange}
                        className="col-span-1"
                      />
                    )}
                  />

                  <div className="col-span-2">
                    <div className="flex justify-between gap-2">
                      {' '}
                      <FormField
                        placeholder="Platform URL"
                        {...register(`platformUrl_${index}`)}
                        className="w-full"
                      />
                      {platformLinks.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removePlatformLink(index)}
                          className="w-5"
                        >
                          <TrashIcon className="w-5 h-5 text-[#99A1AF]" />
                        </button>
                      )}
                    </div>{' '}
                  </div>
                </div>
              ))}

              <button
                type="button"
                onClick={addPlatformLink}
                className="text-sm underline text-[#6A7282]"
              >
                Add
              </button>
            </div>

            <TermsConditionsContainer
              isTermsAccepted={isTermsAccepted}
              isTermsError={isTermsError}
              onCheckedChange={(checked) => {
                setIsTermsAccepted(checked);
                if (checked) {
                  setIsTermsError(false);
                }
              }}
              title="Terms and Conditions"
            >
              <TermsCondition />
            </TermsConditionsContainer>

            <div className="flex justify-end gap-4 mt-8">
              <Button
                type="button"
                variant="black_button"
                onClick={() => {
                  reset();
                  setIsTermsAccepted(false);
                  setIsTermsError(false);
                }}
              >
                Cancel
              </Button>
              <Button variant="primary" type="submit" disabled={isLoading}>
                {isLoading ? 'Registering...' : 'Register'}
              </Button>
            </div>
          </form>
        </FormBackground>
      </div>
    </div>
  );
}

const TermsCondition = () => {
  return (
    <>
      <p className="text-xl font-semibold">
        Hackathon Registration (Next OPOM)
      </p>
      <p className="text-gray-400 text-lg">
        To participate in an OPOM Hackathon, additional information is required
        for coordination and team formation. By registering, you agree to
        provide:
      </p>

      <div className="px-6">
        <ul className="text-gray-400 list-disc text-lg">
          <li>Contact Details</li>
          <li>Gmail address</li>
          <li>Telegram username</li>
          <li>Phone Number</li>
          <li>
            Technical Role: Your primary discipline (e.g., Frontend, Backend,
            UIUX etc.)
          </li>
          <li>Data Usage for Events</li>
        </ul>
      </div>
      <p className="text-lg">
        This specific data is collected solely to manage the hackathon,
        facilitate communication between organizers and participants, and assist
        in team matching. We will not sell this data to third parties.
      </p>
    </>
  );
};
