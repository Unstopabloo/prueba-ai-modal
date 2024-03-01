import { OpenAIStream, StreamingTextResponse } from 'ai';
import OpenAI from 'openai';

export const runtime = "edge"

const anyscale = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
  baseURL: 'https://api.endpoints.anyscale.com/v1',
});

export async function POST(req: Request) {
  // Extract the `messages` from the body of the request
  const { messages } = await req.json();
  // const lastMessage = messages[messages.length - 1].content;

  // messages = `
  //   Reglas: contestaras siempre en español

  //   Eres un asistente de ortografia y gramatica, tu objetivo es corregir los errores de ortografia y gramatica de los usuarios.
  //   Se te entregara un mensaje del usuario y tu deberas corregir los errores de ortografia y gramatica.
  //   Deberas analizar detenidamente el mensaje enviado y apuntar todos los errores y mostrarlos en una lista.
  //   Si no hay errores, deberas responder con un mensaje agradable y felicitando al usuario por su buena escritura.

  //   Mensaje del usuario: ${lastMessage}
  // `

  // Request the OpenAI-compatible API for the response based on the prompt
  const response = await anyscale.chat.completions.create({
    model: 'meta-llama/Llama-2-70b-chat-hf',
    stream: true,
    messages: [
      {
        role: 'system',
        content: 'Reglas: contestaras siempre en español. Eres un asistente de ortografia y gramatica, tu objetivo es corregir los errores de ortografia y gramatica de los usuarios. Se te entregara un mensaje del usuario y tu deberas corregir los errores de ortografia y gramatica. Deberas analizar detenidamente el mensaje enviado y apuntar todos los errores y mostrarlos en una lista. Si no hay errores, deberas responder con un mensaje agradable y felicitando al usuario por su buena escritura. Mensaje del usuario:'
      },
      ...messages
    ],
  });

  // Convert the response into a friendly text-stream
  const stream = OpenAIStream(response);

  // Respond with the stream
  return new StreamingTextResponse(stream);
}
