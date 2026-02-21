import { Dialog } from '@radix-ui/themes';
import { X } from 'lucide-react';
import { Button } from './ui/button';

interface TermsAndConditionsProps {
  isTermsAccepted: boolean;
  isTermsError: boolean;
  onCheckedChange: (checked: boolean) => void;
}

export default function TermsAndConditions({
  isTermsAccepted,
  isTermsError,
  onCheckedChange,
}: TermsAndConditionsProps) {
  return (
    <div className="flex items-center gap-1">
      <input
        type="checkbox"
        name="terms"
        id="terms"
        checked={isTermsAccepted}
        onChange={(event) => onCheckedChange(event.target.checked)}
      />
      <label
        htmlFor="terms"
        className={`${isTermsError ? 'text-red-600' : 'text-white'}`}
      >
        I agree to the{' '}
      </label>

      <Dialog.Root>
        <Dialog.Trigger className="cursor-pointer">
          <span
            className={`${isTermsError ? 'text-red-600' : 'text-[#6F28B3]'} hover:text-white underline`}
          >
            Terms and Conditions
          </span>
        </Dialog.Trigger>

        <Dialog.Content
          size="4"
          maxWidth="758px"
          className="bg-black! text-white py-10! px-16! rounded-3xl! max-h-[90vh] overflow-y-auto"
        >
          <div className="flex flex-col gap-6">
            <div className="flex items-center justify-end">
              <Dialog.Close>
                <X className="cursor-pointer" size={30} />
              </Dialog.Close>
            </div>
            <Dialog.Title size="7" className="mb-0!">
              Terms and Conditions
            </Dialog.Title>
            <hr className="my-6" />

            <p className="text-lg font-semibold">
              Hackathon Registration (Next OPOM)
            </p>
            <p className="text-gray-400">
              To participate in an OPOM Hackathon, additional information is
              required for coordination and team formation. By registering, you
              agree to provide:
            </p>

            <div className="px-6">
              <ul className="text-gray-400 list-disc">
                <li>Contact Details</li>
                <li>Gmail address</li>
                <li>Telegram username</li>
                <li>Phone Number</li>
                <li>
                  Technical Role: Your primary discipline (e.g., Frontend,
                  Backend, UIUX etc.)
                </li>
                <li>Data Usage for Events</li>
              </ul>
            </div>
            <p>
              This specific data is collected solely to manage the hackathon,
              facilitate communication between organizers and participants, and
              assist in team matching. We will not sell this data to third
              parties.
            </p>
          </div>

          {/* Buttons */}
          <div className="flex items-center justify-end gap-6">
            <Dialog.Close>
              <Button type="button" variant="black_button" size="primary">
                Cancel
              </Button>
            </Dialog.Close>
            <Dialog.Close>
              <Button
                type="button"
                className="text-lg"
                onClick={() => onCheckedChange(true)}
              >
                Agree
              </Button>
            </Dialog.Close>
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
