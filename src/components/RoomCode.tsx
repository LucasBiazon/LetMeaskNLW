 import CopyImg from '../assets/copy.svg';

interface RoomCodeProps {
  code: string;
}

export function RoomCode(props:RoomCodeProps){
  function copyRoomCodeToClipBoard(){
    navigator.clipboard.writeText(props.code);
  }
  return(
    <button onClick={copyRoomCodeToClipBoard} className='h-10 rounded-lg overflow-hidden bg-white border-[1px] flex border-solid border-[#835afd]'>
      <div className='bg-[#835afd] px-3 flex justify-center items-center'>
        <img src={CopyImg} alt="Copy room code" />
      </div>
      <span className='block self-center flex-1 w-60 text-sm font-medium pl-4 pr-3'>Sala #{props.code}</span>
    </button>
  );
}
