import { useNavigate } from 'react-router-dom';
import illustrationImg from "../assets/illustration.svg";
import logo from "../assets/logo.svg";
import googleIcon from "../assets/google-icon.svg";
import { Button } from '../components/Button';
import { useAuth } from '../hooks/useAuth';
import { FormEvent, useState } from 'react';
import { database } from '../services/firebase';

export default function Home() {  
  const navigate = useNavigate(); 
  const {user, signInWithGoogle} = useAuth();
  const [roomCode, setRoomCode] = useState('');
  async function navigateToNewRoom() {
    if(!user)
    {
     await signInWithGoogle()
    }
    navigate('/rooms/new'); 
  }

  async function handleJoinRoom (event: FormEvent) {
    event.preventDefault();
    if(roomCode.trim() === ''){
      return
    }
    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    if (!roomRef.exists()) {
      alert('Room does not exists.');
      return;
    }

    if (roomRef.val().endedAt) {
      alert('Room already closed.');
      return;
    }
    navigate(`/rooms/${roomCode}`)
  }
  return (
    <div className="flex items-stretch h-screen">
      <aside className="flex-[6] flex flex-col justify-center py-32 px-20 bg-[#835afd]">
        <img src={illustrationImg} alt="ilustration" className="max-w-80" />
        <strong className="font-[700] text-4xl poppiens text-gray-50 mt-4 "> Crie salas de Q&amp;A ao vivo</strong>
        <p className="text-2xl poppiens text-gray-50 mt-4">Tire dúvidas da sua audiência em tempo real!</p>
      </aside>
      <main className="flex-[8] px-8 flex items-center justify-center">
        <div className="flex flex-col w-full max-w-80 items-stretch text-center">
          <img src={logo} alt="letMeasK" className="self-center" />
          <button onClick={navigateToNewRoom} className="mt-16 h-12 rounded-lg font-[500] bg-[#ea4335] text-white cursor-pointer flex items-center justify-center border-0 gap-2 hover:brightness-90 duration-200">
            <img src={googleIcon} alt="icone do google" />
            Criar sua sala com o google
          </button>
          <div className="text-sm text-[#a8a8b3] mt-8 flex items-center justify-center traco">Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              onChange={(event) => setRoomCode(event.target.value)}
              value={roomCode}
              className="h-12 rounded-lg border border-solid border-[#a8a8b3] bg-[#fff] py-0 px-4 w-full"
            />
            <div className="mt-8">
              <Button type="submit">
                Entrar na sala
              </Button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}
