import './layout.css'


const Layout = ({children})=>{
    return(
        <>
         <div className="container d-flex justify-content-center ">
            {children}
        </div>
        </>
    )


}
export default Layout;