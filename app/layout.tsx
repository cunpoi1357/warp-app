import './globals.css'
import '@fortawesome/fontawesome-free/css/all.min.css'
import 'react-quill/dist/quill.snow.css'
import { AuthProvider } from './Context/AuthContext'
export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return <AuthProvider>{children}</AuthProvider>
}
