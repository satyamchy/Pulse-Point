import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
// import { useAuthor } from "../context/AuthorContext";
import { AuthorContextData, ContextPropsType } from "../context/AuthorContext";


type Article = {
    title: string;
    description: string;
    _id: string,
    createdAt: string,
    status: string
}
const MyArticles = () => {
    const contextData = useContext<ContextPropsType>(AuthorContextData)
   
    const [article, setArticle] = useState<Article[]>([]);

    useEffect(() => {
        const loadData = async () => {
            try {
                //const token = localStorage.get('token'); //it will be sent during login 
                const response = await axios.get<{ articles: Article[] }>(`${import.meta.env.VITE_ARTICLE_API_END_POINT}/getMyArticles/${contextData.authorId}`,
                    {
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        withCredentials: true
                    }
                );
                console.log(response.data.articles)
                setArticle(response.data.articles || []);
            } catch (error) {
                console.error("Error fetching articles:", error);
            }
        }
        loadData();
    }, []);

    return (
        <div className="flex justify-center">
            <div className="w-[80%] ">
                <div className="text-3xl font-bold my-6">My Articles</div>

                {article.length > 0 ? (
                    article.map((item, index) => (
                        <div key={item._id} className=" bg-gray-200 rounded-2xl mx-auto my-8 p-6 shadow-lg shadow-gray-700 transition-transform hover:scale-103">
                            <NavLink className="font-bold text-2xl text-blue-600 hover:underline" to={`/myArticle/${item._id}`} >{item.title}</NavLink>
                            <p className="text-lg text-gray-700 mt-2">{item.description}</p>
                            <div className="text-sm text-gray-500 mt-1">{new Date(item.createdAt).toLocaleDateString()}</div>
                            <div className={`${item.status === 'draft' ? "bg-red-500" : "bg-green-400"} text-white text-center rounded-lg w-24  py-1 mt-3 `}>{item.status}</div>


                        </div>
                    ))
                ) : (
                    <p className="text-xl text-red-500 mt-10">No Articles found..</p>
                )
                }

            </div>
        </div>
    )
}
export default MyArticles;