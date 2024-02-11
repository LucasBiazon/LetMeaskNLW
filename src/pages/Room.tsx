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
  async function handleLikeQuestion(questionId: string, likeId: string | undefined) {
    if (likeId) {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`).remove()
    } else {
      await database.ref(`rooms/${roomId}/questions/${questionId}/likes`).push({
        authorId: user?.id,
      })
    }
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
                isAnswered={question.isAnswered}
                isHighlighted={question.isHighlighted}
              >
                {!question.isAnswered && (
                  <button
                    className={`flex items-end text-[#737380] gap-2 hover:brightness-90 transition-all ${question.likeId ? 'text-[#835afd]' : ''}`}
                    type="button"
                    aria-label="Marcar como gostei"
                    onClick={() => handleLikeQuestion(question.id, question.likeId)}
                  >
                    { question.likeCount > 0 && <span>{question.likeCount}</span> }
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path className={`${question.likeId ? 'stroke-[#835afd]' : ''}`} d="M7 22H4C3.46957 22 2.96086 21.7893 2.58579 21.4142C2.21071 21.0391 2 20.5304 2 20V13C2 12.4696 2.21071 11.9609 2.58579 11.5858C2.96086 11.2107 3.46957 11 4 11H7M14 9V5C14 4.20435 13.6839 3.44129 13.1213 2.87868C12.5587 2.31607 11.7956 2 11 2L7 11V22H18.28C18.7623 22.0055 19.2304 21.8364 19.5979 21.524C19.9654 21.2116 20.2077 20.7769 20.28 20.3L21.66 11.3C21.7035 11.0134 21.6842 10.7207 21.6033 10.4423C21.5225 10.1638 21.3821 9.90629 21.1919 9.68751C21.0016 9.46873 20.7661 9.29393 20.5016 9.17522C20.2371 9.0565 19.9499 8.99672 19.66 9H14Z" stroke="#737380" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                )}
              </Question>
            );
          })}
      </div>
    </main>
   </div>
  )
}