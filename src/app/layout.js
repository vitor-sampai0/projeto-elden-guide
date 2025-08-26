import "./globals.css";
import Header from '../components/Header';


export const metadata = {
    title: "Elden Guide",
    description: "Projeto pra mostrar tudo que eu sei",
    icons: {
        icon: "/icons/favicon.ico",
    },
};

export default function RootLayout({ children }) {
    return (
        <html>
            <div>
                <Header /> 
            <body>{children}
            </body>
            </div>

        </html>
    );
}

