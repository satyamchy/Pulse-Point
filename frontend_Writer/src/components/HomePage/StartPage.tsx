import { AxiosHeaders } from "axios"
import Header from "../../Header/Header"
import StartHeader from "./StartHeader"

const StartPage = ()=>{
    return(
        <>
        {/* <AxiosHeaders/> */}
        <StartHeader/>
        <div>We are here to create news in short form</div>
        </>
    )
}
export default StartPage