import axios from 'axios'
import { useLoaderData, LoaderFunctionArgs, Link } from 'react-router-dom'

interface PostArticle {
    title: string,
    description: string,
    summary: string,
    content: string,
    tags: string[],
    readingTime: number,
    authorName: string,
    authorId: string,
    updatedAt: string,
    image: string[],
    media: string[] // {url:string, type: string}[]
}
export const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    const day = date.toLocaleDateString("en-IN", { day: "2-digit" });
    const month = date.toLocaleDateString("en-IN", { month: "long" });
    const year = date.toLocaleDateString("en-IN", { year: "numeric" });
    const formattedTime = date.toLocaleTimeString("en-IN", {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
        timeZone: "Asia/Kolkata",
        timeZoneName: "short",
    });
    return `${day} ${month}, ${year} ${formattedTime}`; // Comma only between month and year

};
const Article = () => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const data = useLoaderData<PostArticle>();
    const parsedTags = JSON.parse(data.tags[0]);
    // const parsedImage = JSON.parse(data.image[0])
    console.log(parsedTags)
    // console.log(parsedImage)

    console.log(data)
    return (
        <>
            <div className='flex justify-center bg-gray-100 min-h-screen py-10'>
                <div className='w-[80%] bg-white rounded-2xl shadow-lg p-8'>
                    <div className='font-bold text-5xl mb-4 text-gray-800'>{data.title}</div>
                    <div className='text-3xl mb-6 text-gray-600'>{data.description}</div>
                    <div className='flex items-center gap-3 mb-6'>
                        <Link className="text-red-500 hover:underline text-lg" to="">{data.authorName}</Link>
                        <div className='text-sm text-gray-500'>{formatDate(data.updatedAt)}</div>
                        <div className='text-green-500'>{data.readingTime} min read</div>
                    </div>
                    {data.image.length && (
                        <div className='mb-8 '>
                            <img src={`${backendUrl}/${data.image[0].replace(/\\/g, '/')}`} alt="article" className="w-[80%] m-auto h-96 object-cover rounded-xl" />
                        </div>
                    )}

                    <div className='text-2xl leading-relaxed text-gray-700'>{data.content}</div>
                    <div className='mt-8 flex flex-wrap gap-2'>
                        {
                            parsedTags.map((tag: string, index: number) => (
                                <span key={index} className='bg-blue-100 text-blue-600 text-sm px-3 py-1 rounded-full'>{tag}</span>
                            ))
                        }
                    </div>
                </div>
            </div>

        </>
    )
}
export default Article

export const ArticleLoader = async ({ params }: LoaderFunctionArgs) => {
    // console.log(params)
    try {
        const response = await axios.get(`${import.meta.env.VITE_ARTICLE_API_END_POINT}/myArticle/${params.id}`);
        return response.data?.article;
    } catch (error) {
        return error;
    }
}