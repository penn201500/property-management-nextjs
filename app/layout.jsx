import "@/assets/styles/globals.css"
import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import AuthProvider from "@/components/AuthProvider"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { GlobalProvider } from "@/context/GlobalContext"

export const metadata = {
    title: "Property Management",
    keywords: "rental,property,real estate",
    description: "Property management made easy",
}

const MainLayout = ({ children }) => {
    return (
        <AuthProvider>
            <GlobalProvider>
                <html>
                    <body>
                        <Navbar />
                        <main>{children}</main>
                        <Footer />
                        <ToastContainer />
                    </body>
                </html>
            </GlobalProvider>
        </AuthProvider>
    )
}

export default MainLayout
