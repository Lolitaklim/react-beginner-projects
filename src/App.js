import React, { useEffect, useRef, useState } from 'react'
import { Block } from './Block'
import './index.scss'

function App() {
  // const [valute, setValute] = useState({})
  const [fromCurrency, setFromCurrency] = useState('RUB')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(1)

  const valuteRef = useRef({})

  useEffect(() => {
    fetch('https://www.cbr-xml-daily.ru/daily_json.js')
      .then((res) => res.json())
      .then((data) => {
        data.Valute['RUB'] = {
          Value: 1,
        }
        // setValute(data.Valute)
        valuteRef.current = data.Valute
        onChangeToPrice(1)
        // console.log(data.Valute)
      })
      .catch((err) => {
        console.warn(err)
        alert('не удалось получить курсы валют')
      })
  }, [])

  const onChangeFromPrice = (value) => {
    // if (!valuteRef.current[fromCurrency] || !valuteRef.current[toCurrency]) return
    const result =
      (valuteRef.current[fromCurrency].Value * value) /
      valuteRef.current[toCurrency].Value
    setToPrice(result.toFixed(3))
    setFromPrice(value)
  }

  const onChangeToPrice = (value) => {
    // if (!valuteRef.current[fromCurrency] || !valuteRef.current[toCurrency]) return
    const result =
      (value * valuteRef.current[toCurrency].Value) /
      valuteRef.current[fromCurrency].Value
    setFromPrice(result.toFixed(3))
    setToPrice(value)
  }

  useEffect(() => {
    if (valuteRef.current[fromCurrency] && valuteRef.current[toCurrency]) {
      onChangeFromPrice(fromPrice)
    }
  }, [fromCurrency])

  useEffect(() => {
    if (valuteRef.current[fromCurrency] && valuteRef.current[toCurrency]) {
      onChangeToPrice(toPrice)
    }
  }, [toCurrency])

  return (
    <div className="App">
      <Block
        value={fromPrice}
        onChangeValue={onChangeFromPrice}
        currency={fromCurrency}
        onChangeCurrency={setFromCurrency}
      />
      <Block
        value={toPrice}
        onChangeValue={onChangeToPrice}
        currency={toCurrency}
        onChangeCurrency={setToCurrency}
      />
      <a href="https://www.cbr-xml-daily.ru/">Курсы валют, API</a>
    </div>
  )
}

export default App
