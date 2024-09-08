'use client'
import { ComponentPropsWithoutRef } from "react";


interface IButton extends ComponentPropsWithoutRef<'button'> {}
export const Button = ({ children, className = "", ...props}: IButton) => {

    return (
        <button {...props} className={`bg-blue-500 p-4 ${className}`}>
            {children}
        </button>
    )
}