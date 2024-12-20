import { useEffect, useRef, useState } from 'react';
import './App.css';
import Block from './components/Block/Block';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  const [fromCurrency, setFromCurrency] = useState('UZS')
  const [toCurrency, setToCurrency] = useState('USD')
  const [fromPrice, setFromPrice] = useState(0)
  const [toPrice, setToPrice] = useState(1)

  // const [rates, setRates] = useState({});

  const ratesRef = useRef({})


  useEffect(() => {
    const fetchRates = async () => {
      try{
          const res = await fetch('https://www.cbr-xml-daily.ru/latest.js')
          const json = await res.json()
          ratesRef.current = json.rates
          onChangeToPrice(1)
      }
      catch(err) {
        console.log(err);
        toast.error("Не удалось получить информацию");
      };   
    } 

    fetchRates()
  }, []);

  const onChangeFromPrice = (value) => {
    if (ratesRef.current[fromCurrency] && ratesRef.current[toCurrency]) {
      const price = value / ratesRef.current[fromCurrency];
      const result = price * ratesRef.current[toCurrency];
      setToPrice(result.toFixed(3));
      setFromPrice(value);
    } else {
      toast.warn("Курсы валют еще не загружены");
    }
  }

  const onChangeToPrice = (value) => {
    const result = (ratesRef.current[fromCurrency] / ratesRef.current[toCurrency]) * value
    setFromPrice(result.toFixed(3))
    setToPrice(value)
  }

  useEffect(() => {
    onChangeFromPrice(fromPrice)
  }, [fromCurrency])

  useEffect(() => {
    onChangeToPrice(toPrice)
  }, [toCurrency])

  return (
    <div className='App'>
      <Block value={fromPrice} onChangeValue={onChangeFromPrice } currency={fromCurrency} onChangeCurrency={setFromCurrency}/>
      <Block value={toPrice} onChangeValue={onChangeToPrice} currency={toCurrency} onChangeCurrency={setToCurrency} />
      <ToastContainer 
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        pauseOnFocusLoss
      />
    </div>
  );
}

export default App;