import logoImg  from '../assets/logo.svg'

import deleteImg from '../assets/delete.svg';
import checkImg from '../assets/check.svg';
import answerImg from '../assets/answer.svg';

import { Button } from '../components/Button';
import { Question } from '../components/Question';
import { RoomCode } from '../components/RoomCode';
import { useRoom } from '../hooks/useRoom';
import { useNavigate } from 'react-router';
import { useParams } from 'react-router';
import { database } from '../services/firebase';

type RoomParams = {
  id: string;
}

export function AdminRoom(){
  const navigate = useNavigate();
  const params = useParams<RoomParams>();
  const roomId = params.id
  const {title, questions} = useRoom(roomId as string);

  async function handleEndRoom() {
    await database.ref(`rooms/${roomId}`).update({
      endedAt: new Date(),
    })

    navigate('/');
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
    }
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isAnswered: true,
    })
  }
  async function handleHighlightQuestion(questionId: string) {
    await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
      isHighlighted: true,
    })
  }
  return (
    <div>
      <header className='p-6 border border-solid border-[#e2e2e2] w-full'>
        <div className="flex justify-between items-center">
          <img src={logoImg} alt="Letmeask" />
          <div className='flex gap-2'>
            <RoomCode code={roomId || 'undefined'} />
            <div className='max-w-52'>
              <Button isOutline={true} onClick={handleEndRoom}>Encerrar sala</Button>
            </div>
          </div>
        </div>
      </header>

      <main className='max-w-[800px] w-full my-0 mx-auto'>
        <div className="mt-8 mb-6 flex items-center gap-4">
          <h1 className='poppins text-2xl text-zinc-900'>Sala {title}</h1>
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

        <div className="flex flex-col gap-4 mt-12 pb-4">
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
                  <>
                    <button
                      type="button"
                      onClick={() => handleCheckQuestionAsAnswered(question.id)}
                    >
                      <img src={checkImg} alt="Marcar pergunta como respondida" />
                    </button>
                    <button
                      type="button"
                      onClick={() => handleHighlightQuestion(question.id)}
                    >
                      <img src={answerImg} alt="Dar destaque à pergunta" />
                    </button>
                  </>
                )}
                <button
                  type="button"
                  onClick={() => handleDeleteQuestion(question.id)}
                >
                  <img src={deleteImg} alt="Remover pergunta" />
                </button>
              </Question>
            );
          })}
        </div>
      </main>
    </div>
  )
}