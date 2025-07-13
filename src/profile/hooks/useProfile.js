import { useCallback, useState } from "react";
import { userApi } from "../../api/backend/userApi";

export const useProfile = () => {
  const [status, setStatus] = useState("idle");
  const [errorMsg, setErrorMsg] = useState(null);
  

  const updateProfile = useCallback(async (username, email, fullname) => {

    try{
        setStatus('loading');
        const res = await userApi.updateUser(username,fullname, email);
        setStatus('success')
        return res?.data;
    }catch (err){
        setStatus('error')
        setErrorMsg(err)
        throw err
    }

  },[])

  const resetStatus = () => {
    setStatus('idle');
    setErrorMsg(null);
  }

  return {
    status,
    errorMsg,
    resetStatus,
    updateProfile,
  }

}