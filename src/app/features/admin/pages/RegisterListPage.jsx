import { filterIconUrl } from "@/assets/icons/iconUrls";
import Filter from "@/components/ui/Filter";
import SearchInput from "@/components/ui/SearchInput";
import TechStack from "@/constants/TechStack";
import RegisterList from "../components/RegisterList";
import Pagination from "@/components/ui/Pagination";
import { useState } from "react";
import FilterDropdown from "@/components/ui/Filter";





function RegisterListPage(){

const [role,setRole]=useState('All')

 const [page, setPage] = useState(1);
  const totalPages = 12;

const handleTechStackFilter=(selectedItem)=>{
  console.log(selectedItem.name);
  setRole(selectedItem.name)
  
  
}



    const filterList=["Newest","Oldest"]
    return(
    <div className="flex flex-col relative">
    
    
      <div className="flex w-full justify-between items-center  text-white ">
        {/* Title & Searchbar */}
          <div className="flex items-center  w-7/12  justify-between">
                <div className="text-5xl font-bold underline-offset-8 text-white">
                Registered
                <div className="max-w-32 mt-3.5 h-1.5 bg-yellow-500"/>
          </div>
        <SearchInput placeholder={`Search`} className={`w-[487px]`}/>
          </div>


          {/* Filter & total count */}
          <div className="flex items-center justify-end gap-x-20 text-white w-5/12 ">
                <div >
                    Total Count-40
                </div>

                {/* <div>
                  <FilterDropdown  isOpen={false} filters={filterList}/>
                </div> */}


                <div>
                    <Filter icon={filterIconUrl} menuList={filterList} placeholder={`Filter`} />
                </div>

          </div>



      </div>

      <RegisterList role={role}/>
     <div className="-bottom-16 absolute  left-0 right-0  flex justify-center">

       <Pagination currentPage={page} total={totalPages}  />
     </div>
    </div>
    )
}

export default RegisterListPage;