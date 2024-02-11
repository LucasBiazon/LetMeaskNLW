interface QuestionsProps {
  content: string;
  author: {
    name: string
  }
}

export function Question({content, author}:QuestionsProps){
  return (
    <div className="bg-[#fefefe] rounded-lg shadow-md p-6 max-h-72">
      <p className="break-words  max-h-52 overflow-scroll">{content}</p>
      <footer className="flex justify-between items-center mt-6">
        <p className="text-zinc-900 font-medium">{author.name}</p>
        <div></div>
      </footer>
    </div>
  )
}