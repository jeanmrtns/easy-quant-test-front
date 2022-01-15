import { createContext, FormEvent, ReactNode, useContext, useState } from "react";
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
  handleSubmit: (event: FormEvent<HTMLFormElement>) => void;
  handleOptionChange: (event) => void;
  clear: () => void;
  calculate: () => void;
}

const CalcContext = createContext({} as CalcData);

export function CalcProvider({ children }: CalcProviderProps) {
  const [operation, setOperation] = useState('sum');

  const [numbers, setNumbers] = useState({
    number1: 0,
    number2: 0
  } as Numbers);

  const [result, setResult] = useState(0);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    calculate();
  }

  function handleOptionChange(event) {
    setOperation(event.target.value);
  }

  async function calculate() {
    try {
      const result = await api.post(`/calculator/${operation}`, numbers);
      setResult(result.data.result);
    } catch (error) {
      alert('Invalid operation')
    }
  }

  function clear() {
    setNumbers({ number1: 0, number2: 0 });
    setResult(0);
  }

  return (
    <CalcContext.Provider value={{ operation, setOperation, result, setResult, handleSubmit, handleOptionChange, calculate, numbers, setNumbers, clear }}>
      {children}
    </CalcContext.Provider>
  )
}

export function useCalc() {
  const context = useContext(CalcContext);

  return context;
}