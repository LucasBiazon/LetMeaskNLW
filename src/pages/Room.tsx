import { FormEvent, useState } from 'react'
import logoImg  from '../assets/logo.svg'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { useParams } from 'react-router'
import { useAuth } from '../hooks/useAuth'
import { database } from '../services/firebase'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'

type RoomParams = {
  id: string;
}

export function Room(){
  const {user} = useAuth();
  const params = useParams<RoomParams>();
  const roomId = params.id
  const [newQuestion, setNewQuestion] = useState('');
  const {title, questions} = useRoom(roomId as string);
  
  async function handleSendQuestion(event: FormEvent) {
    event.preventDefault();
    if(newQuestion.trim() == ''){
      return
    }
    if(!user){
      throw new Error("VOcê não está logado");
    }
    const question = {
      content: newQuestion,
      author : {
        name: user.name,
      },
      isHighlighted: false,
      isAnswered: false
    }
    await database.ref(`rooms/${roomId}/questions`).push(question) 
    setNewQuestion('');
  }
  return (
   <div>
    <header className='p-6 border border-solid border-[#e2e2e2] w-full'>
      <div className='max-w-[1120px] mx-auto my-0 flex justify-between items-center w-full'>
        <img src={logoImg} alt="logo" className='max-h-11'/>
        <RoomCode code={roomId || 'Codigo da Sala'}/>
      </div>
    </header>
    <main className='max-w-[800px] w-full my-0 mx-auto'>
      <div className='mt-8 mb-6 flex items-center gap-4'>
        <h1 className='poppins text-2xl text-zinc-900'>
         Sala {title}
        </h1>
        {questions.length > 0  &&  (
        <div className="bg-[#e559f9] rounded-full py-2 px-4 flex gap-2 text-gray-50 text-sm font-semibold">
          <span className=" text-gray-50 text-sm font-semibold">{questions.length}</span>
          {questions.length > 1  ? (
            <span className=" text-gray-50 text-sm font-semibold"> 
              perguntas
            </span> 
          ): (
            <span className=" text-gray-50 text-sm font-semibold">
              pergunta
            </span>
          )}
        </div>
        )}
      </div>
      <form onSubmit={handleSendQuestion}>
        <textarea placeholder='O que você quer perguntar?' onChange={(event) => setNewQuestion(event.target.value)} value={newQuestion}
        className='w-full border-0 p-4 rounded-lg bg-[#fefefe] shadow-md resize-y min-h-32'/>
        <div className='flex justify-between items-center mt-4 '>
          { user ? 
          <div className='text-sm text-zinc-900 font-medium'>
            <span>{user.name}</span>
          </div>
          : (
          <span className='text-sm text-[#737388] font-medium'>
            Para enviar uma pergunta,   
            <button type="button" className='text-[#835AF0] underline-offset-1 underline text-sm ml-1'> 
               faça seu login 
            </button>.
          </span>
          )}
          <div className='flex-5'> 
          <Button type='submit' disabled={!user}>Enviar pergunta</Button>
          </div>
        </div>
      </form>
      <div className='flex flex-col gap-4 mt-12 pb-4'>
          {questions.map(question => {
          return (
          <Question
            key={question.id}
            content={question.content}
            author={question.author}
          />
          )
        })}
      </div>
    </main>
   </div>
  )
}