import { useState } from 'react';
import { useCalc } from '../../hooks/useCalc';
import styles from './styles.module.scss';

interface Numbers {
  number1: number;
  number2: number;
}

export function Calculator() {

  const { numbers, operation, setOperation, result, setResult, setNumbers, calculate } = useCalc();
  const [displayOp, setDisplayOp] = useState('');

  function handleOperation(event) {
    const op = event.target.value;
    setOperation(op);
    switch (operation) {
      case 'sum':
        setDisplayOp('+');
        break;
      case 'sub':
        setDisplayOp('-');
        break;
      case 'mult':
        setDisplayOp('*');
        break;
      case 'div':
        setDisplayOp('/');
        break;
    }
  }

  function handleNumber(event) {
    const number = Number(event.target.value);

    if (!operation) {
      setNumbers({
        ...numbers,
        number1: numbers.number1 * 10 + number
      })
    } else {
      setNumbers({
        ...numbers,
        number2: numbers.number2 * 10 + number
      })
    }
  }

  function clear() {
    setOperation('');
    setDisplayOp('');
    setResult(0);
    setNumbers({
      number1: 0,
      number2: 0
    } as Numbers);
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.display}>
          <p>{numbers.number1} {displayOp ? displayOp : null}  {numbers.number2 ? numbers.number2 : null}</p>
          <h4>{result && result}</h4>
        </div>
        <div className={styles.buttons}>
          <button value={7} onClick={handleNumber}>7</button>
          <button value={8} onClick={handleNumber}>8</button>
          <button value={9} onClick={handleNumber}>9</button>
          <button onClick={clear} className={styles.clear}>AC</button>
          <button value={4} onClick={handleNumber}>4</button>
          <button value={5} onClick={handleNumber}>5</button>
          <button value={6} onClick={handleNumber}>6</button>
          <button value={'sum'} onClick={handleOperation}>+</button>
          <button value={1} onClick={handleNumber}>1</button>
          <button value={2} onClick={handleNumber}>2</button>
          <button value={3} onClick={handleNumber}>3</button>
          <button value={'sub'} onClick={handleOperation}>-</button>
          <button value={0} onClick={handleNumber}>0</button>
          <button value={'div'} onClick={handleOperation}>/</button>
          <button value={'mult'} onClick={handleOperation}>*</button>
          <button onClick={calculate}>=</button>
        </div>
      </div>
    </div>
  );
}