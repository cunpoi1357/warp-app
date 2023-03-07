import React from 'react'

function Footer() {
    return (
        <footer className='flex justify-center py-1 text-white bg-gray-33'>
            <p> &copy; Trung đức {new Date().getFullYear()}</p>
        </footer>
    )
}

export default Footer
