import { ReactNode } from "react";

interface QuestionProps {
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  children?: ReactNode;
  isAnswered?: boolean;
  isHighlighted?: boolean;
}

export function Question({
  content,
  author,
  isAnswered = false,
  isHighlighted = false,
  children,
}: QuestionProps) {
  return (
    <div className={`bg-[#fefefe] rounded-lg shadow-md p-6 max-h-72
    ${isAnswered && 'bg-[#DBDCDD]'}
     ${isHighlighted && !isAnswered ? 'bg-[#F4F0FF] border-[1px] border-solid border-[#835AFD]' : ''}`}>
      <p className="break-words  max-h-52 overflow-scroll">{content}</p>
      <footer className="flex justify-between items-center mt-6">
        <p className="text-zinc-900 font-medium">{author.name}</p>
        <div>
        {children}
        </div>
      </footer>
    </div>
  )
}