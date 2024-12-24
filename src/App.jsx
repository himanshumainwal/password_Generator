import { useState, useCallback, useEffect, useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8)
  const [numberAllowed, setNumberAllowed] = useState(false)
  const [charAllowed, setCharAllowed] = useState(false)
  const [password, setPassword] = useState("")
  const passwordRef = useRef(null)

  const passwordGenerator = useCallback(() => {
    let pass = ''
    let str = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'

    if (numberAllowed) str += '0123456789'
    if (charAllowed) str += '!@#$%^&*()_+-=[]{}|,.<>/?~`'

    for (let i = 1; i <= length; i++) {
      let char = Math.floor(Math.random() * str.length + 1)
      pass += str.charAt(char)
    }
    setPassword(pass)
  }, [length, charAllowed, numberAllowed, setPassword])

  let copyPasswordToClipboard = useCallback(() => {
    passwordRef.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  useEffect(() => {
    passwordGenerator()
  }, [length, charAllowed, numberAllowed, passwordGenerator])

  return (
    <>
      <div className='w-screen h-[100vh] py-10 flex overflow-x-hidden flex-col items-center bg-gradient-to-r from-indigo-700 to-purple-800'>
        <h1 className='text-white text-3xl md:text-5xl border-b-4 pb-2'>
          Password Generator
        </h1>
        <div className='w-full max-w-md shadow-lg border my-auto rounded-lg px-6 py-8 text-orange-500 bg-gradient-to-r from-[#191970] to-[#4b0082]
         mx-4 sm:max-w-lg md:max-w-2xl lg:max-w-3xl'>
          <div className='flex mb-4'>
            <input
              type="text"
              value={password}
              className='outline-none w-full py-1 px-3 bg-transparent text-white border border-gray-500 rounded-l-md'
              readOnly
              placeholder='Password'
              ref={passwordRef}
            />
            <button
              onClick={copyPasswordToClipboard}
              className='bg-blue-700 text-white px-4 py-2 rounded-r-md'
            >
              Copy
            </button>
          </div>
          <div className='flex flex-wrap gap-4 text-sm'>
            <div className='flex items-center gap-x-1'>
              <input
                type="range"
                min={8}
                max={30}
                value={length}
                className='cursor-pointer'
                onChange={(e) => setLength(e.target.value)}
              />
              <label htmlFor="" className='text-white'>Length: {length}</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                checked={numberAllowed}
                id='numberInput'
                onChange={() => setNumberAllowed((pre) => !pre)}
              />
              <label htmlFor="" className='text-white'>Numbers</label>
            </div>
            <div className='flex items-center gap-x-1'>
              <input
                type="checkbox"
                checked={charAllowed}
                id='charInput'
                onChange={() => setCharAllowed((pre) => !pre)}
              />
              <label htmlFor="" className='text-white'>Characters</label>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

export default App
