'use client';

import { useChat } from 'ai/react';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

export default function Completion() {
  const { messages: letras, input, handleInputChange, handleSubmit } = useChat({
    api: '/api/letras',
  });

  return (
    <div className='w-screen flex items-center justify-center h-screen'>
      <form onSubmit={handleSubmit} className='flex flex-col gap-5 w-[80'>
        <input
          className='border border-black/30 rounded-lg p-2'
          value={input}
          placeholder="Enter your prompt..."
          onChange={handleInputChange}
        />
        <div className='w-full'>
          <Dialog>
            <DialogTrigger className='w-full'>
              <button type="submit" className='bg-indigo-200 py-1 rounded-lg w-full'>
                Enviar
              </button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Feedback</DialogTitle>
              </DialogHeader>
              <Tabs defaultValue="letras" className="w-full">
                <TabsList className='w-full'>
                  <TabsTrigger value="letras" className='flex-1'>Ortografia</TabsTrigger>
                  <TabsTrigger value="cognitivo" className='flex-1'>Interes</TabsTrigger>
                </TabsList>
                <TabsContent value="letras" className='h-[400px] overflow-y-auto bg-slate-300/20 p-4 rounded-lg whitespace-pre-wrap'>
                  {letras.findLast(letra => letra.role === "assistant")?.content || "No hay mensajes."}
                </TabsContent>
                <TabsContent value="cognitivo" className='h-[400px] overflow-y-auto bg-slate-300/20 p-4 rounded-lg whitespace-pre-wrap'>
                  {letras.findLast(letra => letra.role === "assistant")?.content || "No hay mensajes."}
                </TabsContent>
              </Tabs>
            </DialogContent>
          </Dialog>
        </div>
      </form>
    </div>
  );
}