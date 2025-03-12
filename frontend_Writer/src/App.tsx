// import { Container } from "postcss"
import { BrowserRouter } from 'react-router-dom'
import Container from './components/Container'
import { Toaster } from 'react-hot-toast'
import { createContext, useState } from 'react'
import {AuthorProvider} from './context/AuthorContext'

function App() {

  return (
    <>
      <AuthorProvider>
        {/* <BrowserRouter> */}
        <Container />
        <Toaster />
        {/* </BrowserRouter> */}
      </AuthorProvider>
      
    </>
  )
}

export default App
