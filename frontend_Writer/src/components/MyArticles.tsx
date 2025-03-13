import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { NavLink } from "react-router-dom";
// import { useAuthor } from "../context/AuthorContext";
import { AuthorContextData, ContextPropsType } from "../context/AuthorContext";
import {formatDate} from "../components/Article"

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
        <div className="flex justify-center bg-gradient-to-r from-[#e5d98e] to-[#F4A261] ">
            <div className="w-[80%] ]">
                <div className="text-3xl font-bold my-6 text-[#1B1F3B]">My Articles</div>

                <div className="grid grid-cols-1 md:grid-cols-2 ">
                    {article.length > 0 ? (
                        article.map((item, index) => (
                            <div key={item._id} className=" bg-[#1B1F3B] rounded-2xl mx-auto my-8 p-6 shadow-lg shadow-gray-700 transition-transform hover:scale-103">
                                <NavLink className="font-bold text-2xl text-white hover:underline" to={`/myArticle/${item._id}`} >{item.title}</NavLink>
                                <p className="text-lg text-white mt-2">{item.description}</p>
                                <div className="text-sm text-[#F8F9FA] mt-1">{formatDate(item.createdAt)}</div>
                                <div className="space-x-3">
                                <button className={`${item.status === 'draft' ? "bg-[#D72638]" : "bg-[#3CB371]"} text-white text-center rounded-lg w-24  py-1 mt-3 `}>{item.status}</button>
                                <button className="bg-[#F4A261] text-white text-center rounded-lg w-24 py-1 px-2">Edit</button>
                                </div>


                            </div>
                        ))
                    ) : (
                        <p className="text-xl text-red-500 mt-10">No Articles found..</p>
                    )
                    }
                </div>

            </div>
        </div>
    )
}
export default MyArticles;