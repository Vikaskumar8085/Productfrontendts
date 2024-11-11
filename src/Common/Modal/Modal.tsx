import React, { ReactNode } from 'react'

interface ModalProps {
    children: ReactNode,
    setOpen: (open: boolean) => void;

}

function Modal({ setOpen, children }: ModalProps) {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-3 rounded-lg shadow-lg relative">
                <button className='float-right font-bold text-1xl' onClick={() => setOpen(false)}>&times;</button>
                <div className="mt-4">{children}</div>
            </div>
        </div>
    )
}

export default Modal