import Filter from "@/components/ui/Filter";
import SearchInput from "@/components/ui/SearchInput";
import TechStack from "@/constants/TechStack";



function RegisterListPage(){
    return(
      <div className="flex w-full justify-between items-center ">
        {/* Title & Searchbar */}
          <div className="flex items-center gap-x-14 w-7/12  justify-between">
                <div className="text-5xl font-bold underline-offset-8 text-white">
                Registered
                <div className="max-w-32 mt-3.5 h-1.5 bg-yellow-500"/>
          </div>
        <SearchInput placeholder={`Search`} className={`w-[487px]`}/>
          </div>


          {/* Filter & total count */}

          <div className="flex items-center justify-end gap-x-20 text-white w-full ">
                <div >
                    Total Count-200
                </div>

                <div>
                    <Filter className="w-96" menuList={TechStack} placeholder={"ROLE"}/>
                </div>


                <div>
                    Filter2
                </div>

          </div>



      </div>
    )
}

export default RegisterListPage;