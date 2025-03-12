import axios from "axios";
import News from './News'
import { useEffect, useState } from "react";
// import { ReactDOM } from "react-router-dom";

type Article = {
    author: String;
    content: String;
    description: String;
    title: String;
    publishedAt: String;
    source: {
        name: String;
        id: number;
    };
    url: string;
    urlToImage: string;
    name: String;
}

const Api = () => {
    const [news, setNews] = useState<Article[]>([]);
    const [selectedArticle, setSelectedAtricle] = useState<Article | null>(null)

    useEffect(() => {
        const load = async () => {
            try {
                const apiKey = import.meta.env.VITE_NEWS_API_KEY;
                const response = await fetch(`https://newsapi.org/v2/everything?q=bitcoin&apiKey=${apiKey}`);
                const data = await response.json();
                setNews(data.articles || []);
                console.log("news", data.articles)
            } catch (error) {
                console.error("Error fetching news:", error);
            }
        }
        load();
    }, []);

    { console.log("newwwwwwwws", news[0]) }

    return (
        <div className="w-[80%] m-auto">
            {
                selectedArticle ? (
                    <div>
                        <button className="bg-gray-200 rounded-lg p-2 my-4" onClick={() => setSelectedAtricle(null)}>Back to Articles</button>
                        <div className=" p-4  m-4 bg-slate-200 shadow shadow-gray-600 rounded-lg">
                            {/* <button onClick={() => setSelectedAtricle(null)}>Back to Articles</button> */}
                            <p className="pb-3"> {selectedArticle.description}</p>
                            <h1 className="pb-3"> {selectedArticle.title}</h1>
                            {/* <h1> {new Date(selectedArticle.publishedAt).toDateString()}</h1> */}
                            <h1 className="pb-3"> {selectedArticle.content}</h1>
                            <div className="flex space-x-6">
                            <h1 className="pb-3">Source: {selectedArticle.source.name}</h1>
                            <h1 className="pb-3"> Article By - {selectedArticle.author}</h1>
                            <h1> {new Date(selectedArticle.publishedAt).toDateString()}</h1>
                            </div>

                            <a href={selectedArticle.url} target="_blank" rel="noopener noreferrer"
                                className="text-blue-500 underline font-semibold">
                                Read Full Article
                            </a>
                        </div>
                    </div>

                ) : (
                    news.length > 0 ? (
                        news.map((article, index) => (
                            // <News article={news[0]} key={0}/>
                            <div key={index}
                                onClick={() => setSelectedAtricle(article)}
                                className="bg-slate-200 shadow shadow-gray-600 rounded-lg p-4 m-4 cursor-pointer">
                                <h1> {article.title}</h1>
                                <p> {article.description}</p>

                                <h1> Article By {article.author}</h1>
                                <h1> {new Date(article.publishedAt).toDateString()}</h1>
                            </div>

                        ))
                    ) : (<p className="flex justify-center mt-6 text-red-500">Loading...</p>)
                )
            }
            {/* {} */}
        </div>
    )
}
export default Api;