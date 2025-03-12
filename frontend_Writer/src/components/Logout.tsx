import {redirect} from 'react-router-dom'
import {toast} from 'react-hot-toast'
import axios from 'axios'
import { AuthorContextData, ContextPropsType } from '../context/AuthorContext'
import { useContext } from 'react'
import {useAuthor} from '../context/AuthorContext'


export const logoutLoader = async () => {
    // const {context}  = useAuthor()
    //const contextData = useContext<ContextPropsType>(AuthorContextData)
   try{
         const res = await axios.get(`${import.meta.env.VITE_AUTHOR_API_END_POINT}/logout`);
         
         const contextData = AuthorContextData;
        //  console.log("contextDattttttttta", contextData)
        // if (contextData && contextData.logoutAuthor) {
        //     contextData.logoutAuthor();
        // }
        
        // console.log("context", contextData);
        // contextData.logoutAuthor()
        toast.success(res.data.message)
    }catch (err){
        toast.error("Failed to log out");
    }
   return redirect("/login")  // Redirect user after logout
}
