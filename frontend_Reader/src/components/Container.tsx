import Header2 from "./Header/Header2"
import Header from "./Header/Header"
import Api from "../API_Components/Api"

const Container = ()=>{
    return(
        <>
        <Header/>
        <hr className="border-b-2 "/>
        <Header2/>
        <hr className="border-b-2 "/>


        <Api/>
        </>
    )
}
export default Container