import { getDevProfiles } from "@/services/devProfileService";
import { useEffect, useState } from "react";

function useAddMember(){
    const [members, setMember] = useState([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)

    useEffect(()=>{
        const fetchDevelopers = async()=>{
            setLoading(true)

            try {
                const data = await getDevProfiles()
                console.log(data);
                
                if(Array.isArray(data)){
                    setMember(data)
                }

            } catch (error) {
                console.log(error);
                setError("Error at fetching all developers: " + error.message);
            }
            finally{
                setLoading(false)
            }
        }
        fetchDevelopers()
    },[])
    return {members, loading, error}
}

export default useAddMember