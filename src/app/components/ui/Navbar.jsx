import { opomIconUrl, UserImgUrl } from "@/assets/icons/iconUrls";
import { NavLink } from "react-router-dom";
import Button from "./Button";

function Navbar(){
    const nav_links=[
        {id:1,name:"Portfolio",path:"/Portfolios"},
        {id:2,name:"Dev Profiles",path:"/Dev-Profiles"},
        {id:3,name:"Ideas",path:"/Ideas"},
        {id:4,name:"Approved Ideas",path:"/Approved-Ideas"},
        {id:5,name:"Team",path:"/team"}
    ]

    const isAuth=true;

    return(
     <nav className="h-11 flex w-full justify-between items-center py-10">
        {/* LOGO */}
        <div className="text-2xl text-white">
            <img src={opomIconUrl}/>
        </div>
        {/* nav_links */}
        <div className=" font-medium flex gap-x-10 p-1">
            {nav_links.map((link)=>(
                <NavLink id={link.id} to={link.path} className={({isActive})=>`${isActive ? "text-white":"text-[#ADADADA3]"}`}>
                    <span>{link.name}</span>
                </NavLink>
            ))}
        </div>

        {/* create account btn or user profile */}
        <div>
            {!isAuth ? (<Button variant="secondary" size={"primary"}>Create Account</Button>):( <div className="text-white font-medium flex gap-x-2.5 items-center">
                <img src={UserImgUrl} className="size-9 rounded-full"/>
                <span >Thura</span>
                 </div>) }
            
    
        </div>



       </nav>
    )
}

export default Navbar;