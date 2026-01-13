import { zodResolver } from '@hookform/resolvers/zod';
import { type UseFormProps, useForm } from 'react-hook-form';
import type { ZodObject, z } from 'zod';

/**
 * A helper hook that combines React Hook Form with Zod validation.
 *
 * This hook simplifies form handling by automatically configuring the Zod resolver
 * with your validation schema, reducing boilerplate code when setting up forms.
 *
 * @template T - The Zod schema type, must extend ZodObject
 * @param schema - Zod schema used for form validation. This defines the shape,
 *                 validation rules, and default values for your form fields.
 * @param options - Optional configuration options for React Hook Form.
 *                  The `resolver` option is handled internally and should not be provided.
 *                  All other `UseFormProps` options are supported (e.g., `defaultValues`, `mode`, `reValidateMode`).
 *
 * @returns A configured `useForm` instance with types inferred from your Zod schema.
 *          The return value is the same as `react-hook-form`'s `useForm` hook,
 *          but with fully typed form data and validation based on your Zod schema.
 *
 * @example
 * ```ts
 * const formSchema = z.object({
 *   name: z.string().min(1, "Name is required"),
 *   email: z.string().email("Invalid email address"),
 * });
 *
 * function MyForm() {
 *   const { register, handleSubmit, formState: { errors } } = useZodForm(formSchema);
 *
 *   const onSubmit = (data) => console.log(data);
 *
 *   return (
 *     <form onSubmit={handleSubmit(onSubmit)}>
 *       <input {...register("name")} />
 *       {errors.name && <span>{errors.name.message}</span>}
 *       <input {...register("email")} />
 *       {errors.email && <span>{errors.email.message}</span>}
 *       <button type="submit">Submit</button>
 *     </form>
 *   );
 * }
 * ```
 *
 * @see {@link https://react-hook-form.com} React Hook Form documentation
 * @see {@link https://zod.dev} Zod documentation
 */

export function useZodForm<T extends ZodObject>(
  schema: T,
  options?: Omit<UseFormProps<z.input<T>, unknown, z.output<T>>, 'resolver'>,
) {
  return useForm<z.input<T>, unknown, z.output<T>>({
    resolver: zodResolver(schema),
    ...options,
  });
}
