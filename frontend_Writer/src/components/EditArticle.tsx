import axios from "axios"
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { PostArticle } from "./Article"

const EditArticle = ()=>{
    const loaderData = useLoaderData<PostArticle>()
    console.log(loaderData)
    return(
        <>
        <div>Edit Article page</div>
        </>
    )
}
export default EditArticle

export const EditArticleLoader = async ({params}:LoaderFunctionArgs ) =>{
try {
        const response  = await axios.get(`${import.meta.env.VITE_ARTICLE_API_END_POINT}/edit-article/${params.id}`)
        return response?.data?.article;
    
} catch (error) {
    return error
    
}}