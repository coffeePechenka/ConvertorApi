import React from 'react'
import './Block.css'
import defaultCurrencies from '../../currencies/currencies'
import { FaChevronDown } from 'react-icons/fa'

export default function Block({value, onChangeValue, onChangeCurrency, currency}) {
  return (
    <div className='block'> 
        <ul className='currencies'>
            {
                defaultCurrencies.map((cur) => (
                    <li
                    onClick={() => onChangeCurrency(cur)}
                    className={currency == cur ? 'active' : '' }
                    key={cur} 
                    > 
                        {cur}
                    </li>
                ))
            }
            <li className='icon_block'>
                <FaChevronDown className='currencies_icon'/>
            </li>
        </ul>

        <input
        onChange={(e) => onChangeValue(e.target.value)}
        value={value}
        type="number" 
        placeholder={0}
        />
    </div>
  )
}
