
import { Link } from "react-router-dom";
import illustrationImg from "../assets/illustration.svg";
import logo from "../assets/logo.svg";
import { Button } from "../components/Button";

export default function NewRoom(){
  return (
    <div className="flex items-stretch h-screen">
      <aside className="flex-[6] flex flex-col justify-center py-32 px-20 bg-[#835afd]">
        <img src={illustrationImg} alt="ilustration" className="max-w-80"/>
        <strong className="font-[700] text-4xl poppiens text-gray-50 mt-4 "> Crie salas de Q&amp;A ao vivo</strong>
        <p className="text-2xl poppiens text-gray-50 mt-4">Tire dúvidas da sua audiência em tempo real!</p>
      </aside>
      <main className="flex-[8] px-8 flex items-center justify-center">
        <div className="flex flex-col w-full max-w-80 items-stretch text-center">
          <img src={logo} alt="letMeasK" 
          className="self-center"/>
          <h2 className="text-2xl mt-16 mb-6 poppins">Criar um nova sala</h2>
          <form>
            <input 
              type="text"
              placeholder="Nome da sala"
              className="h-12 rounded-lg border border-solid border-[#a8a8b3] bg-[#fff] py-0 px-4 w-full"
            />
            <Button type="submit">
                Criar sala
            </Button>
          </form>
          <p className="text-sm text-[#737380] mt-4">
            Quer entrar em uma sala existente?  
            <Link to="/" className="text-purple-600 ml-1">
              Clique aqui
            </Link>
          </p>
        </div>
      </main>
    </div>
  )
}