import axios from "axios"
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { LoaderFunctionArgs, useLoaderData } from "react-router-dom"
import { PostArticle } from "./Article"


export const EditArticleLoader = async ({ params }: LoaderFunctionArgs) => {
    try {
        // /getposts?postId=${}`
        const response = await axios.get(`${import.meta.env.VITE_ARTICLE_API_END_POINT}/getpost/${params.id}`)
        return response?.data?.article;

    } catch (error) {
        return error

    }
}


import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],
    ['link', 'image', 'video', 'formula'],

    [{ 'header': 1 }, { 'header': 2 }],               // custom button values
    [{ 'list': 'ordered' }, { 'list': 'bullet' }, { 'list': 'check' }],
    [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
    [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
    [{ 'direction': 'rtl' }],                         // text direction

    [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
    [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

    [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
    [{ 'font': [] }],
    [{ 'align': [] }],

    ['clean']                                         // remove formatting button
];
const module = {
    toolbar: toolbarOptions
}

const EditPost = () => {
    const loaderData = useLoaderData<PostArticle>()
    console.log(loaderData)
    const postId = loaderData.data._id;
    const navigate = useNavigate()
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("")
    const [content, setContent] = useState<string>("")
    const [image, setImage] = useState<FileList | null>(null)
    const [video, setVideo] = useState<FileList | null>(null)
    const [tags, setTags] = useState<string[]>([])
    const [action, setAction] = useState<'draft' | 'publish'>('draft');

    const submitHandler = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            console.log(title, description, content, image, video, tags, action);
            const formData = new FormData();
            formData.append("title", title);
            formData.append("description", description);
            formData.append("content", content);
            if (image && image.length > 0) {
                Array.from(image).forEach((pic) => formData.append("image", pic));
            }
            if (video && video.length > 0)
                Array.from(video).forEach((file) => formData.append("video", file));
            formData.append("tags", JSON.stringify(tags))
            formData.append("action", action)
            for (let pair of formData.entries()) {
                console.log(pair[0], pair[1]);
            }
            console.log(formData)

            const response = await axios.put(`${import.meta.env.VITE_ARTICLE_API_END_POINT}/update-post/${postId}`, formData,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                    withCredentials: true
                }
            );
            console.log(response.data)
            if (response.data.success) {
                navigate('/home');
                toast.success(response.data.message)
            }
        } catch (error: any) {
            toast.error(error.response?.data.message || "Article not updated")
            //toast.error("Article not created")
            console.log(error)
        }
    }
    return (
        <div className=" flex items-center justify-center my-10 ">
            <div className="w-[60%] p-10 bg-gray-100">
                <h1 className="text-3xl font-bold">Write an Article</h1>

                <form onSubmit={submitHandler} className="flex flex-col gap-4 mt-6 " encType="multipart/form-data">

                    <label htmlFor="title" className="font-bold text-mg">Title:</label>
                    <input type="text" name="title" className="border border-gray-300 rounded-md  p-2" value={title} onChange={(e) => setTitle(e.target.value)} id="title" placeholder="Enter article title" required />

                    <label htmlFor="description" className="font-bold text-mg">Description:</label>
                    <textarea name="description" className="border border-gray-300 rounded-md  p-2" value={description} onChange={(e) => setDescription(e.target.value)} id="description" placeholder="Write a brief description" />

                    <label htmlFor="content" className="font-bold text-mg">Content:</label>
                    {/* <textarea name="content" className="border border-gray-300 rounded-md  p-2 h-40" value={content} onChange={(e) => setContent(e.target.value)} id="content" placeholder="Write your article content" required /> */}
                    <ReactQuill className="h-72  mb-12" id="content" modules={module} theme="snow" value={content} onChange={setContent} placeholder="Write something here..." />

                    <label htmlFor="image" className="font-bold text-mg">Images of Article:</label>
                    <input type="file" name="image" className="border border-gray-300 rounded-md  p-2" onChange={(e) => setImage(e.target.files)} id="image" multiple />

                    <label htmlFor="video" className="font-bold text-mg">Video of Article</label>
                    <input type="file" name="video" className="border border-gray-300 rounded-md  p-2" onChange={(e) => setVideo(e.target.files)} id="video" multiple />

                    <label htmlFor="tags" className="font-bold text-mg">Tags (Comma Separated):</label>
                    <input type="text" name="tags" className="border border-gray-300 rounded-md  p-2" value={tags.join(", ")} onChange={(e) => setTags(e.target.value.split(",").map(tag => tag.trim()))} id="tags" placeholder="e.g. AI, Technology, future" />

                    <div className="py-4 ">
                        <button className="border border-gray-300 px-2 py-1 rounded-lg bg-yellow-400 mr-4 cursor-pointer" type="submit" onClick={() => setAction('draft')}>Save Draft</button>
                        <button className="border border-gray-300 px-2 py-1 rounded-lg bg-green-500 cursor-pointer" type="submit" onClick={() => setAction('publish')}>Publish</button>
                    </div>

                </form>
            </div>
        </div>
    )
}
export default EditPost;