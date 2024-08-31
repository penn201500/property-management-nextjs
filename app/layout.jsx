import "@/assets/styles/globals.css"

export const metadata = {
    title: "Property Management",
    keywords: "rental,property,real estate",
    description: "Property management made easy",
}

const MainLayout = ({ children }) => {
    return (
        <html>
            <body>
                <main>{children}</main>
            </body>
        </html>
    )
}

export default MainLayout
