import { createContext, ReactNode, useContext, useState } from "react";
import { api } from "../services/api";

interface Numbers {
  number1: number;
  number2: number;
}

interface CalcProviderProps {
  children: ReactNode
}

interface CalcData {
  operation: string;
  numbers: Numbers;
  setNumbers: (numbers: Numbers) => void;
  setOperation: (operation: string) => void;
  result: number;
  setResult: (result: number) => void;
  calculate: () => void;
}

const CalcContext = createContext({} as CalcData);

export function CalcProvider({ children }: CalcProviderProps) {
  const [operation, setOperation] = useState('');

  const [numbers, setNumbers] = useState({
    number1: 0,
    number2: 0
  } as Numbers);

  const [result, setResult] = useState(0);

  async function calculate() {

    if (!operation) return;

    try {
      const result = await api.post(`/calculator/${operation}`, numbers);
      setResult(result.data.result);
    } catch (error) {
      alert('Invalid operation');
    }
  }

  return (
    <CalcContext.Provider value={{ operation, setOperation, result, setResult, calculate, numbers, setNumbers }}>
      {children}
    </CalcContext.Provider>
  )
}

export function useCalc() {
  const context = useContext(CalcContext);

  return context;
}