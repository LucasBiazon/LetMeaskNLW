import { useEffect, useState } from "react";
import { database } from "../services/firebase";

type Questions = {
  id: string,
  author: {
    name: string
  },
  content: string,
  isHighlighted: boolean,
  isAnswered: boolean
}

type FirebaseQuestions = Record<string, {
  author: {
    name: string
  },
  content: string,
  isHighlighted: boolean,
  isAnswered: boolean
}>

export function useRoom(roomId:string){
  const [questions, setQuestions] = useState<Questions[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    const roomRef =  database.ref(`rooms/${roomId}`)
    roomRef.on('value', room => {
       const databaseRoom = room.val();
       const firebaseQuestions: FirebaseQuestions = databaseRoom.questions;
       const parsedQuestions = Object.entries(firebaseQuestions ?? {}).map(([key, value]) => {
         return {
           id: key,
           content: value.content,
           author: value.author,
           isHighlighted: value.isHighlighted,
           isAnswered: value.isAnswered
         }
       })
       setTitle(databaseRoom.title)
       setQuestions(parsedQuestions)
    })
   }, [roomId])
 
  return {questions, title}
}