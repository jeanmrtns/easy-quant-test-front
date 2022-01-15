import { Calculator } from "../components/Calculator";
import styles from "../styles/Calculator.module.scss";

export default function CalculatorPage() {
  return (
    <>
      <div className={styles.container}>
        <main className={styles.main}>


          <h1>Easy Quant - Calculator</h1>

          <Calculator />

        </main>
      </div>
    </>
  )
}
