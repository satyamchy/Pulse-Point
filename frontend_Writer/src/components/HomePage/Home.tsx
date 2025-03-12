import { useNavigate } from "react-router-dom"
import MyArticles from "../MyArticles"
// import { useAuthor} from "../../context/AuthorContext"

const Home = () => {
    const navigate = useNavigate()
    // const {author} = useAuthor()
    return (
        <>
            <div className="flex justify-center ">
                <button className=" w-4/5 h-20  mt-4 bg-gray-300 text-blue-400 text-2xl font-bold rounded-2xl cursor-pointer hover:text-green-800 hover:bg-gray-400" onClick={() => { navigate('/createArticle') }}>create Article</button>
            </div>
            <MyArticles />

        </>
    )
}
export default Home