import { createContext, ReactNode, useState, useContext } from "react"

// Type for just the state part
interface AuthorStateType {
    authorName: string | null;
    authorId: string | null;
    isLogin: boolean;
}
// Type for the context including functions
export interface ContextPropsType extends AuthorStateType {

    loginAuthor: (authorData: { name: string; _id: string }) => void;
    logoutAuthor: () => void;
}

export const AuthorContextData = createContext<ContextPropsType>({
    authorName: null,
    authorId: null,
    isLogin: false,
    loginAuthor: () => { },
    logoutAuthor: () => { }
});

export const AuthorProvider = ({ children }: { children: ReactNode }) => {

    const [authorData, setAuthorData] = useState<AuthorStateType>({
        authorName: null,
        authorId: null,
        isLogin: false
    });

    const loginAuthor = (authorData: { name: string, _id: string }) => {
        setAuthorData({
            authorName: authorData.name,
            authorId: authorData._id,
            isLogin: true
        });
    };
    const logoutAuthor = () => {
        setAuthorData({
            authorName: null,
            authorId: null,
            isLogin: false
        });
    };

    return (
        <AuthorContextData.Provider value={{ ...authorData, loginAuthor, logoutAuthor }} >
            {children}
        </AuthorContextData.Provider>
    )
};

// Custom hook to use the context
// export const useAuthor = () => {
//     const context = useContext(AuthorContextData);
//     // if (!context) {
//     //     throw new Error("useAuthor must be used within an AuthorProvider");
//     // }
//     return context; 
// }  
