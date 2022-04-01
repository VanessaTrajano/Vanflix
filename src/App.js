import React from 'react'
import {
  BrowserRouter as Router, 
  Link, 
  Routes, 
  Route
} from 'react-router-dom'
import styled from 'styled-components'
import { createGlobalStyle } from "styled-components"
import Movies from './components/Movies'
import Serie from './components/Series'
import Home from './components/Home'

const GlobalStyle = createGlobalStyle`
  *{
    margin:0;
    padding:0;
    box-sizing:border-box;
    list-style:none;
    color: #fff;
    background-color: #000;
  }
`

const Navigation = styled.nav`
  padding: 1vw 0;
  display:flex;
  justify-content:space-around;
  width:100%;
`

const List = styled.ul`
  display:flex;
  justify-content:space-evenly;
  align-items: center;
  width: 45%;
  pading: 0.5vw 0;
  font-size: 1.6vw;
`

const Title = styled.h1`
  border-bottom:1px solid white;
  padding:0.5vw;
  width:45%;
  font-size: 2.5vw;
  text-decoration: overline;
`

const Item = styled.li`
  width: 6vw;
  text-align:center;

  &:hover{
    font-size:1.8vw;
    font-weight:900;
  }
`

const Page = () => {
  return(
    <Router>
      <GlobalStyle/>
      <Navigation>
        <Title>VanFlix</Title>
        <List>
          <Item><Link to="/">Home</Link></Item>
          <Item><Link to="movies">Movies</Link></Item>
          <Item><Link to="series">Series</Link></Item>
        </List>
      </Navigation>

      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route path='movies' element={<Movies/>}/>
        <Route path='series' element={<Serie/>}/>
      </Routes>
    </Router>
  )
}

export default Page