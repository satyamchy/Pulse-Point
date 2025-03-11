import { useNavigate } from "react-router-dom"
import MyArticles from "../MyArticles"
import { useAuthor} from "../../context/AuthorContext"

const Home = () => {
    const navigate = useNavigate()
    const {author} = useAuthor()
    return (
        <>
            <div className="flex justify-center items-center flex-col ">
        
                    <button className="w-8/11 h-20  mt-4 bg-gray-300 text-blue-400 text-2xl font-bold rounded-2xl cursor-pointer hover:bg-gray-400" onClick={() => { navigate('/createArticle') }}>create Article</button>
                <div>
                    <MyArticles />
                </div>
            </div>

        </>
    )
}
export default Home