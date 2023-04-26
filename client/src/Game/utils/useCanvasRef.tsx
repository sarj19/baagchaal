import { Context, createContext, RefObject, useContext } from 'react';

export type CanvasContextType = RefObject<HTMLCanvasElement> | null;

export const CanvasContext: Context<CanvasContextType> =
  createContext<CanvasContextType>(null);

export default function useCanvasRef(): CanvasContextType {
  return useContext(CanvasContext);
}
