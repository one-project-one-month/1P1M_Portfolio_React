import { Dialog } from '@radix-ui/themes';
import { X } from 'lucide-react';
import type { JSX, ReactNode } from 'react';
import { Button } from './ui/button';

interface Props {
  isTermsAccepted: boolean;
  isTermsError: boolean;
  onCheckedChange: (checked: boolean) => void;
  title: string;
  children: ReactNode;
}

export default function TermsConditionsContainer({
  isTermsAccepted,
  isTermsError,
  onCheckedChange,
  title,
  children,
}: Props): JSX.Element {
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
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-end">
              <Dialog.Close>
                <X className="cursor-pointer" size={30} />
              </Dialog.Close>
            </div>
            <Dialog.Title size="7" className="mb-0!">
              {title}
            </Dialog.Title>
            <hr className="border-muted-foreground" />

            <div className="flex flex-col items-start gap-8">{children}</div>
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
          </div>
        </Dialog.Content>
      </Dialog.Root>
    </div>
  );
}
