import { useState } from 'react'
import { Formik, Form } from 'formik'
import * as Yup from 'yup'
import Input from './components/Input'
import Button from './components/Button'
import Container from './components/Container'
import Section from './components/Section'
import Balance from './components/Balance'

const compoundInteres = (deposit, contribution, years, rate) => {
  let total = deposit
  for (let i = 0; i < years; i++){
    total = (total + contribution) * (rate + 1)
  }

  return Math.round(total)
}

const formatter = new Intl.NumberFormat('en-US', {
  style: 'currency', 
  currency: 'USD',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,  
})


function App() {
  const [balance, setBalance] = useState('')
  const handleSubmit = ({deposit, contribution, years, rate}) => {
    const val = compoundInteres(Number(deposit), Number(contribution), Number(years), Number(rate))
    setBalance(formatter.format(val))
  }

  return (
    <Container>
      <Section>
        <h1>Calculadora de interés compuesto</h1>
        <Formik
          initialValues={{
            deposit:'',
            contribution:'',
            years:'',
            rate:''
          }}
          onSubmit={handleSubmit}
          validationSchema={Yup.object({
            deposit: Yup.number().required('Si no depositas, seras castigada.').typeError('Debe ser un número'),
            contribution: Yup.number().required('Si no contribuís, seras castigada.').typeError('Debe ser un número'),
            years: Yup.number().required('Póngale vida a los años, que es mejor.').typeError('Debe ser un número').min(0, 'La cantidad de años es incorrecta'),
            rate: Yup.number().required('Interés señora. Interés!!').typeError('Debe ser un número').min(0, 'El valor mínimo es 0').max(1, 'El valor máximo es 1'),
          })}
        >
          <Form>
            <Input name='deposit' label="Deposito inicial" />
            <Input name='contribution' label="Contribucion anual" />
            <Input name='years' label="Años" />
            <Input name='rate' label="Interes estimado" />
            <Button type='submit'>Calcular</Button>
          </Form>
        </Formik>
        {balance !== '' ? <Balance>Balance final: {balance} </Balance> : null }
      </Section>
      
    </Container>
  );
}

export default App
