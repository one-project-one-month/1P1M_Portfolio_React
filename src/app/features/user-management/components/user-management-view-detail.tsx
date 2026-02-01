import { getUserManagementDetailById } from '@/app/features/user-management/services/user-management.service';
import ArrowLeft from '@/assets/icons/arrowLeft.svg';
import Behance from '@/assets/icons/behance.png';
import Copy from '@/assets/icons/copy.png';
import Email from '@/assets/icons/Email.png';
import Eye from '@/assets/icons/eye.png';
import Github from '@/assets/icons/GitHub.png';
import Heart from '@/assets/icons/Heart.png';
import { sampleUserImgUrl } from '@/assets/icons/iconUrls';
import LinkedIn from '@/assets/icons/Linkedin.png';
import Phone from '@/assets/icons/Phone.png';
import Telegram from '@/assets/icons/Telegram.png';
import Image from '@/assets/project-image.png';
import { useQuery } from '@tanstack/react-query';
import { Link, useParams } from 'react-router-dom';

const UserManagementViewDetail = () => {
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useQuery({
    queryKey: ['user-management-detail', id],
    queryFn: () => getUserManagementDetailById(Number(id)),
  });
  const projectList = [
    {
      name: 'ERP Management System',
      image: Image,
      descripiton:
        'Integrating business processes into one system. Helps manage sales, inventory, and accounting efficiently.',
      heart: '245',
      like: '33k',
    },
    {
      name: 'ERP Management System',
      image: Image,
      descripiton:
        'Integrating business processes into one system. Helps manage sales, inventory, and accounting efficiently.',
      heart: '245',
      like: '33k',
    },
    {
      name: 'ERP Management System',
      image: Image,
      descripiton:
        'Integrating business processes into one system. Helps manage sales, inventory, and accounting efficiently.',
      heart: '245',
      like: '33k',
    },
  ];

  if (isLoading)
    return <div className="text-[#F9FAFB]">loading details...</div>;

  const user = data?.data;

  return (
    <div className="w-full">
      <div className="flex flex-col gap-[38px]">
        <Link to="/admin/user-management" className="flex ">
          <img src={ArrowLeft} alt="" />

          <h2 className="text-[#FFFFFF] text-lg leading-7">Back</h2>
        </Link>
        <div className="flex bg-slate-900 justify-between border border-[#99A1AF] rounded-xl pt-[17px] pr-[20px] pb-[18px] pl-[20px]">
          <div className="flex gap-3">
            <img
              src={sampleUserImgUrl}
              alt=""
              className="w-[163px] h-[185px] rounded-md "
            />
            <div className="flex flex-col gap-[18px]">
              <div className=" gap-2">
                <p className="text-[#FFFFFF] font-semibold text-base leading-7">
                  {user?.username || 'Cameron Williamson'}
                </p>
                <p className="text-[#99A1AF] leading-5 text-sm ">Front end</p>
              </div>

              <div className="flex flex-col gap-2">
                <div className="flex  items-center  gap-3">
                  <div className="flex justify-center items-center gap-1">
                    <img
                      src={Email}
                      alt=""
                      className="w-5 h-5  text-[#99A1AF]"
                    />
                    <p className="text-[#99A1AF] text-sm leading-5">
                      {user?.email}
                    </p>
                  </div>
                  <img src={Copy} alt="" className="w-4 h-4 text-[#364153]" />
                </div>

                <div className="flex  items-center  gap-3">
                  <div className="flex justify-center gap-1">
                    <img
                      src={Phone}
                      alt=""
                      className="w-5 h-5  text-[#99A1AF]"
                    />
                    <p className="text-[#99A1AF] text-sm leading-5">
                      +33333334534534
                    </p>
                  </div>
                  <img src={Copy} alt="" className="w-4 h-4 text-[#364153]" />
                </div>

                <div className="flex  items-center  gap-3">
                  <div className="flex justify-center gap-1">
                    <img
                      src={Telegram}
                      alt=""
                      className="w-5 h-5  text-[#99A1AF]"
                    />
                    <p className="text-[#99A1AF] text-sm leading-5">@nayGa4u</p>
                  </div>
                  <img src={Copy} alt="" className="w-4 h-4 text-[#364153]" />
                </div>
              </div>

              <div className="flex  gap-3">
                <div className="w-[30px] h-[30px] flex items-center justify-center border border-[#F3F4F6] text-[#F3F4F6] rounded-full">
                  <img src={Github} className="w-4 h-4" />
                </div>

                <div className="w-[30px] h-[30px] flex items-center justify-center border border-[#F3F4F6] text-[#F3F4F6] rounded-full">
                  <img src={LinkedIn} className="w-4 h-4" />
                </div>
                <div className="w-[30px] h-[30px] flex items-center justify-center border border-[#F3F4F6] text-[#F3F4F6] rounded-full">
                  <img src={Behance} className="w-4 h-4" />
                </div>
              </div>
            </div>
          </div>
          <div>
            <button className="bg-[#9C39FC] w-[108px] opacity-100 p-3 rounded-md text-sm text-[#F9FAFB]">
              Share Profile
            </button>
          </div>
        </div>
        <div className="w-full">
          <div className="w-full flex flex-col gap-5">
            <h1 className="text-[#FFFFFF] font-semibold text-3xl leading-9">
              Projects
            </h1>
            <div className=" gap-[35px] flex flex-row">
              {projectList.map((item) => (
                <div className="w-[337px] h-[368px] flex flex-col text-center gap-4 rounded-xl border border-[#364153] p-7 bg-[#000000]">
                  <img src={item.image} alt="" />
                  <p className="font-semibold text-xl leading-7 text-[#F9FAFB]">
                    {item.name}
                  </p>
                  <p className="text-[#99A1AF] font-light text-sm">
                    {item.descripiton}
                  </p>
                  <div className="flex justify-center items-center gap-5">
                    <div className="flex justify-center items-center gap-2">
                      {' '}
                      <img src={Heart} alt="" />
                      <span className="text-[#99A1AF] text-sm font-medium ">
                        {item.heart}
                      </span>
                    </div>
                    <div className="flex justify-center items-center gap-2">
                      {' '}
                      <img src={Eye} alt="" />
                      <span className="text-[#99A1AF] text-sm font-medium ">
                        {item.like}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserManagementViewDetail;
