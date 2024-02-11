import { ButtonHTMLAttributes } from "react"

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>; 


export function Button(props:ButtonProps){
  return (
    <button className=" h-12 rounded-lg font-[500] bg-[#835afd] text-white cursor-pointer flex items-center w-full justify-center border-0 gap-2 px-8  hover:brightness-90 duration-200 disabled:opacity-5 disabled:cursor-not-allowed"
      {...props}
    />
  )
}