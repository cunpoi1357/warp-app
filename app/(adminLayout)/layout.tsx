import Sidebar from '../components/Sidebar'
import AdminNavbar from '../components/AdminNavbar'
import HeaderStats from '../components/HeaderStats'
import FooterAdmin from '../components/FooterAdmin'

export default function AdminLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <head></head>
            <body>
                <Sidebar />
                <div className='relative md:ml-64 bg-slate-100'>
                    <AdminNavbar />
                    {/* Header */}
                    <HeaderStats />
                    <div className='w-full px-4 mx-auto -m-24 md:px-10'>
                        <div className='flex flex-wrap'>
                            <div className='w-full px-4'>
                                <div className='min-h-[600px] relative flex flex-col min-w-0 break-words w-full p-4 mb-6 shadow-lg rounded-lg bg-slate-100 border-0'>
                                    {children}
                                </div>
                            </div>
                        </div>

                        <FooterAdmin />
                    </div>
                </div>
            </body>
        </html>
    )
}
