import { Routes, Route, BrowserRouter, createBrowserRouter, RouterProvider, Outlet } from 'react-router-dom'
import Login from '../components/Login'
import CreateArticle from '../components/CreateArticle';
import MyArticles from '../components/MyArticles';
import Home from './HomePage/Home';

import Article, { ArticleLoader } from './Article';
import Header from '../Header/Header';
import { logoutLoader } from './Logout';
import EditPost, { EditArticleLoader} from './EditPost';


const Layout = () => {

    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
const router = createBrowserRouter([
    {
        path: "/",
        element: <Login />
    },
    // {
    //     path: "/login",
    //     element: <Login />

    // },
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "/login",
                element: <Login />
        
            },
            {
                path: "/home",
                element: <Home />
            },
            {
                path: "/myArticles",
                element: <MyArticles />,
            },
            {
                path: "/createArticle",
                element: <CreateArticle />
            },
            {
                path: "/edit-article/:id",
                element: <EditPost/>,
                loader: EditArticleLoader
            },
            {
                path: "/myArticle/:id",
                element: <Article />,
                loader: ArticleLoader
            },
            {
                path: "/logout",
                element: <Login />,
                loader: logoutLoader
            }
        ]
    },

])
const Container = () => {
    // const { author } = useAuthor()
    return (
        <div>
            {/* <Routes>
                <Route path="/" element={<Login />} />
                <Route path="/login" element={<Login />} />
                <Route path="/home" element={<Home/>} />
                <Route path='/myArtiles' element={<MyArticles />} />
                <Route path="/createArticle" element={<CreateArticle />} />
            </Routes>
            <hr /> */}
            {/* <CreateArticle/> */}

            <RouterProvider router={router} />
        </div>

    )
}
export default Container;