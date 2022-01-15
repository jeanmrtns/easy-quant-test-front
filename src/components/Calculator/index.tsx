import { ButtonHTMLAttributes, MouseEventHandler } from "react";
import { useCalc } from "../../hooks/useCalc";

import styles from "./styles.module.scss";

const options = [
  { value: 'sum', label: '+' },
  { value: 'sub', label: '-' },
  { value: 'div', label: '/' },
  { value: 'mult', label: '*' },
];

export function Calculator() {

  const { handleSubmit, numbers, setNumbers, handleOptionChange, result, clear } = useCalc();

  function handleClear(event) {
    event.preventDefault();
    clear();
  }

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit} className={styles.content}>
        <input type="number" value={numbers.number1} onChange={e => setNumbers({
          ...numbers,
          number1: Number(e.target.value)
        })} />
        <input type="number" value={numbers.number2} onChange={e => setNumbers({
          ...numbers,
          number2: Number(e.target.value)
        })} />

        <select name="op" id="op" onChange={handleOptionChange}>
          {options.map(opt => {
            return (
              <option key={opt.value} value={opt.value} >{opt.label}</option>
            )
          })}
        </select>
        <button>Calculate</button>
        {result ? <button type="button" onClick={handleClear}>Clear</button> : null}
      </form>
      {result !== 0 ? <h1 className={styles.result}>The result of the operation is <span>{result}</span></h1> : null}
    </div>
  )
}