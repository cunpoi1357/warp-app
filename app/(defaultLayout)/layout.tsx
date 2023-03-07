import Footer from '../components/Footer'
import Header from '../components/Header'

export const metadata = {
    title: 'TrungDucTv.com',
    description: 'TrungDucTv.com'
}

export default function RootLayout({
    children
}: {
    children: React.ReactNode
}) {
    return (
        <html lang='en'>
            <head></head>
            <body className='flex flex-col max-w-5xl gap-6 mx-auto bg-light-gray'>
                <Header />
                <main className='flex flex-col gap-6 min-h-[calc(100vh-200px)]'>
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
