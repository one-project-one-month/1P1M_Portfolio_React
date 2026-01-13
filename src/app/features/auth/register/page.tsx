// import opomRegisterSchema from '@/types/auth';
// import { zodResolver } from '@hookform/resolvers/zod';
// import { Controller, useFieldArray, useForm } from 'react-hook-form';
// import PhoneInput from 'react-phone-input-2';
// import 'react-phone-input-2/lib/style.css';
// import z from 'zod';
// interface roleOptionsProps {
//   name: string;
// }
// const roleOptins: roleOptionsProps[] = [
//   { name: 'Frontend' },
//   { name: 'Backend' },
//   { name: 'UIUX' },
// ];

// interface platformLinkTypeProps {
//   name: string;
// }

// const platformLinkTypeProps: platformLinkTypeProps[] = [
//   { name: 'Github' },
//   { name: 'LinkedIn' },
//   { name: 'Behance' },
// ];

// const OpmRegister = () => {
//   type OpomRegisterType = z.infer<typeof opomRegisterSchema>;
//   // const { handleSubmit, control } = useForm<OpomRegisterType>({
//   //   resolver: zodResolver(opomRegisterSchema),
//   //   defaultValues: { platformLinks: [{ type: '', url: '' }] },
//   // });

//   const { handleSubmit, control } = useForm<OpomRegisterType>({
//     resolver: zodResolver(opomRegisterSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//       phone: '',
//       teleUserName: '',
//       role: '',
//       platformLinks: [{ type: '', url: '' }],
//     },
//   });

//   const { fields, append, remove } = useFieldArray({
//     control,
//     name: 'platformLinks',
//   });
//   const onSubmit = (data: OpomRegisterType) => {
//     data.phone = data.phone.replace(/\s/g, '');
//     console.log(data);
//   };

//   return (
//     <div className="w-full h-full">
//       <div className="w-full h-screen mx-auto content-center  justify-center items-center">
//         <div className="flex flex-col w-full md:w-133 h-full md:h-[80vh]  rounded-3xl mx-auto bg-[#030712] gap-7 p-3">
//           <div className="flex flex-col w-full md:w-117 h-144 mx-auto p-1 gap-14 ">
//             <h2 className="text-[#F9FAFB] text-2xl font-actor py-4 text-center font-medium">
//               OPOM Register Form
//             </h2>
//             <form
//               className=" flex flex-col gap-5"
//               onSubmit={handleSubmit(onSubmit)}
//             >
//               <Controller
//                 name="name"
//                 control={control}
//                 render={({ field }) => (
//                   <>
//                     <input
//                       {...field}
//                       placeholder="Bora"
//                       className="w-full border-[#FFFFFF26] rounded-lg pt-3.5 pb-3.5 pl-4 pr-4
//                  focus:border-0 focus:outline-none text-[#6A7282] bg-[#FFFFFF17]"
//                     />
//                   </>
//                 )}
//               />

//               <Controller
//                 name="email"
//                 control={control}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     placeholder="email"
//                     className="w-full border-[#FFFFFF26] rounded-lg pt-3.5 pb-3.5 pl-4 pr-4
//                  focus:border-0 focus:outline-none text-[#6A7282] bg-[#FFFFFF17]"
//                   />
//                 )}
//               />

//               {/* <Controller
//                 name="phone"
//                 control={control}
//                 render={({ field }) => (
//                   <PhoneInput
//                     country={'mm'}
//                     value={field.value}
//                     onChange={field.onChange}
//                     inputStyle={{
//                       width: '100%',
//                       borderRadius: '0.5rem',
//                       backgroundColor: '#FFFFFF17',
//                       border: '1px solid #FFFFFF26',
//                       color: '#6A7282',
//                       padding: '1.5rem',
//                       paddingLeft: '2.5rem',
//                     }}
//                     buttonStyle={{
//                       border: '  #FFFFFF26',
//                       backgroundColor: '#FFFFFF17',
//                       width: '0%',
//                     }}
//                     placeholder="000 000 000"
//                   />
//                 )}
//               /> */}

//               <Controller
//                 name="phone"
//                 control={control}
//                 render={({ field }) => (
//                   <PhoneInput
//                     country="mm"
//                     value={field.value || ''}
//                     onChange={(val) => field.onChange(val)}
//                     inputStyle={{
//                       width: '100%',
//                       borderRadius: '0.5rem',
//                       backgroundColor: '#FFFFFF17',
//                       border: '1px solid #FFFFFF26',
//                       color: '#6A7282',
//                       padding: '1rem',
//                       paddingLeft: '2.5rem',
//                     }}
//                     buttonStyle={{
//                       border: '1px solid #FFFFFF26',
//                       backgroundColor: '#FFFFFF17',
//                     }}
//                     placeholder="000 000 000"
//                   />
//                 )}
//               />

//               <Controller
//                 name="teleUserName"
//                 control={control}
//                 render={({ field }) => (
//                   <input
//                     {...field}
//                     placeholder="Telegram username"
//                     className="w-full border-[#FFFFFF26] rounded-lg pt-3.5 pb-3.5 pl-4 pr-4
//                  focus:border-0 focus:outline-none text-[#6A7282] bg-[#FFFFFF17]"
//                   />
//                 )}
//               />

//               <Controller
//                 name="role"
//                 control={control}
//                 render={({ field }) => (
//                   <select
//                     {...field}
//                     className="w-full border-[#FFFFFF26] rounded-lg pt-3.5 pb-3.5 pl-4 pr-4 focus:outline-none text-[#6A7282] bg-[#FFFFFF17]"
//                   >
//                     <option value="">Role</option>
//                     {roleOptins.map((role) => (
//                       <option key={role.name} value={role.name}>
//                         {role.name}
//                       </option>
//                     ))}
//                   </select>
//                 )}
//               />

//               {fields.map((fieldItem, index) => (
//                 <div
//                   key={fieldItem.id}
//                   className="w-full flex gap-3 mb-2 items-center"
//                 >
//                   <Controller
//                     name={`platformLinks.${index}.type`}
//                     control={control}
//                     render={({ field }) => (
//                       <select
//                         {...field}
//                         className="w-32.75 font-normal text-sm border-[#FFFFFF26] rounded-lg pt-3.5 pb-3.5 pl-4 pr-4 focus:outline-none text-[#6A7282] bg-[#FFFFFF17]"
//                       >
//                         <option value="">Platform link</option>
//                         {platformLinkTypeProps.map((option) => (
//                           <option key={option.name} value={option.name}>
//                             {option.name}
//                           </option>
//                         ))}
//                       </select>
//                     )}
//                   />

//                   <Controller
//                     name={`platformLinks.${index}.url`}
//                     control={control}
//                     render={({ field }) => (
//                       <input
//                         {...field}
//                         placeholder="URL"
//                         className="w-full border-[#FFFFFF26] rounded-lg pt-3.5 pb-3.5 pl-4 pr-4 focus:outline-none text-[#6A7282] bg-[#FFFFFF17]"
//                       />
//                     )}
//                   />

//                   {index > 0 && (
//                     <button
//                       type="button"
//                       onClick={() => remove(index)}
//                       className="text-white rounded-lg px-2 py-1 text-sm"
//                     >
//                       Delete
//                     </button>
//                   )}
//                 </div>
//               ))}

//               {fields.length < 2 && (
//                 <button
//                   type="button"
//                   onClick={() => append({ type: '', url: '' })}
//                   className="text-white text-start"
//                 >
//                   Add
//                 </button>
//               )}

//               <div className="flex  justify-end  gap-3">
//                 <button
//                   type="button"
//                   className="w-23.75 text-[#F9FAFB] border p-3 rounded-lg border-[#FFFFFF26]"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="w-23.75  bg-[#9C39FC] text-white border p-3 rounded-lg border-[#FFFFFF26]"
//                 >
//                   Register
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default OpmRegister;

import Flat from '@/assets/icons/Flag.svg';
import Trash from '@/assets/icons/Vector.png';
import opomRegisterSchema from '@/types/auth';
import { zodResolver } from '@hookform/resolvers/zod';
import { useFieldArray, useForm } from 'react-hook-form';
import z from 'zod';
interface roleOptionsProps {
  name: string;
}
const roleOptins: roleOptionsProps[] = [
  { name: 'Frontend' },
  { name: 'Backend' },
  { name: 'UIUX' },
];

interface phoneNumberOptinsProps {
  countryFlat: string;
  code: string;
  country: string;
}
const phoneNumberOptions: phoneNumberOptinsProps[] = [
  { countryFlat: Flat, code: '+95', country: 'Mya' },
  { countryFlat: Flat, code: '+14', country: 'USA' },
  { countryFlat: Flat, code: '+91', country: 'Indi' },
  { countryFlat: Flat, code: '+44', country: 'UK' },
  { countryFlat: Flat, code: '+81', country: 'JP' },
];

interface platformLinkTypeProps {
  name: string;
}

const platformLinkTypeProps: platformLinkTypeProps[] = [
  { name: 'Github' },
  { name: 'LinkedIn' },
  { name: 'Behance' },
];

const OpmRegister = () => {
  type OpomRegisterType = z.infer<typeof opomRegisterSchema>;
  const { handleSubmit, register, control } = useForm<OpomRegisterType>({
    resolver: zodResolver(opomRegisterSchema),
    defaultValues: { platformLinks: [{ type: '', url: '' }] },
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: 'platformLinks',
  });
  const onSubmit = (data: OpomRegisterType) => {
    data.phone = data.phone.replace(/\s/g, '');
    console.log(data);
  };

  return (
    <div className="w-full h-full">
      <div className="w-full h-screen mx-auto content-center  justify-center items-center">
        <div className="flex flex-col w-full md:w-133 h-full md:h-[80vh]  rounded-3xl mx-auto bg-[#030712] gap-7 p-3">
          <div className="flex flex-col w-full md:w-117 h-144 mx-auto p-1 gap-14 ">
            <h2 className="text-[#F9FAFB] text-2xl font-actor py-4 text-center font-medium">
              OPOM Register Form
            </h2>
            <form
              className=" flex flex-col gap-5"
              onSubmit={handleSubmit(onSubmit)}
            >
              <div className="w-full">
                <input
                  {...register('name')}
                  placeholder="Bora"
                  className=" w-full border-[#FFFFFF26] rounded-lg pt-3.5 pb-3.5 pl-4 pr-4 focus:border-0 focus:outline-none text-[#6A7282] bg-[#FFFFFF17]"
                />
              </div>
              <div>
                <input
                  {...register('email')}
                  placeholder="bora@gmail.com"
                  className=" w-full border-[#FFFFFF26] rounded-lg pt-3.5 pb-3.5 pl-4 pr-4 focus:border-0 focus:outline-none text-[#6A7282] bg-[#FFFFFF17]"
                />
              </div>

              <div className="flex gap-2">
                <select
                  {...register('phoneCode')}
                  className=" w-26 border-[#FFFFFF26] rounded-lg pt-3.5 pb-3.5 pl-4 pr-4 focus:border-0 focus:outline-none text-[#6A7282] bg-[#FFFFFF17]"
                >
                  {phoneNumberOptions.map((number) => (
                    <div className="relative">
                      {' '}
                      <option
                        key={number.code}
                        className="text-sm"
                        value={number.code}
                      >
                        {number.country} {number.code}
                      </option>
                      <img src={Flat} alt="" className="absolute" />
                    </div>
                  ))}
                </select>

                <input
                  {...register('phone')}
                  placeholder="000 000 000"
                  className=" w-full border-[#FFFFFF26] rounded-lg pt-3.5 pb-3.5 pl-4 pr-4 focus:border-0 focus:outline-none text-[#6A7282] bg-[#FFFFFF17]"
                />
              </div>

              <div>
                <input
                  {...register('teleUserName')}
                  placeholder="Telegram username"
                  className=" w-full border-[#FFFFFF26] rounded-lg pt-3.5 pb-3.5 pl-4 pr-4 focus:border-0 focus:outline-none text-[#6A7282] bg-[#FFFFFF17]"
                />
              </div>

              <div>
                <select
                  {...register('role')}
                  className=" w-full border-[#FFFFFF26] rounded-lg pt-3.5 pb-3.5 pl-4 pr-4 focus:border-0 focus:outline-none text-[#6A7282] bg-[#FFFFFF17]"
                >
                  <option value="">Role</option>
                  {roleOptins.map((role) => (
                    <option key={role.name} value={role.name}>
                      {role.name}
                    </option>
                  ))}
                </select>
              </div>

              {fields.map((_link, index) => (
                <div
                  key={index}
                  className="w-full flex gap-3 mb-2 items-center"
                >
                  <select
                    {...register(`platformLinks.${index}.type` as const)}
                    className="w-32.75 font-normal text-sm border-[#FFFFFF26] rounded-lg pt-3.5 pb-3.5 pl-4 pr-4 focus:border-0 focus:outline-none text-[#6A7282] bg-[#FFFFFF17]"
                  >
                    <option value="">Platform link</option>
                    {platformLinkTypeProps.map((option) => (
                      <option key={option.name} value={option.name}>
                        {option.name}
                      </option>
                    ))}
                  </select>

                  <input
                    {...register(`platformLinks.${index}.url` as const)}
                    placeholder="URL"
                    className="w-full border-[#FFFFFF26] rounded-lg pt-3.5 pb-3.5 pl-4 pr-4 focus:border-0 focus:outline-none text-[#6A7282] bg-[#FFFFFF17]"
                  />

                  {index > 0 && (
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-white rounded-lg px-2 py-1 text-sm"
                    >
                      <img src={Trash} alt="" className="w-7" />
                    </button>
                  )}
                </div>
              ))}

              {fields.length < 2 && (
                <button
                  type="button"
                  onClick={() => append({ type: '', url: '' })}
                  className="text-white text-start"
                >
                  Add
                </button>
              )}

              <div className="flex  justify-end  gap-3">
                <button
                  type="button"
                  className="w-23.75 text-[#F9FAFB] border p-3 rounded-lg border-[#FFFFFF26]"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-23.75  bg-[#9C39FC] text-white border p-3 rounded-lg border-[#FFFFFF26]"
                >
                  Register
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OpmRegister;
