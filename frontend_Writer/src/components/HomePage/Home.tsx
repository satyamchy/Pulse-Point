import { useNavigate } from "react-router-dom"
import MyArticles from "../MyArticles"
// import { useAuthor} from "../../context/AuthorContext"

const Home = () => {
    const navigate = useNavigate()
    // const {author} = useAuthor()
    return (
        <div className="gap-4">
            <div className="flex justify-center ">
                <button className=" w-4/5 h-20  mt-4 bg-[#1B1F3B] text-[#E63946] text-2xl font-bold rounded-2xl cursor-pointer hover:text-[#F4A261] hover:bg-[#111326]" onClick={() => { navigate('/createArticle') }}>create Article</button>
            </div>
            <MyArticles />
        </div>
    )
}
export default Home