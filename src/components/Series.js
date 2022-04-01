import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
`

const Container = styled.div`
  display:flex;
  flex-direction:column;
`

const Intro = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 2vw 8vw;
    
    h2{
        font-size:2vw;
    }
`

const Input = styled.input`
    width: 30%;
    background-color: whitesmoke;
    border:none;
    padding: 0 1vw;
    border-radius: 1vw;
    color: black;
`

const SeriesDiv = styled.div`
    display: flex;
    flex-wrap:wrap;
    justify-content: space-evenly;
`

const SeriesBox = styled.div`
    margin-top: 2vw;
    border: 2px dashed #F8FFF4;
    border-radius:1vw;
    margin-bottom:2vw;
    width: 22vw;
    padding: 1.9vw 0;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;
    transition:0.4s;

    &:hover{
        img{
            width:90%;
        }
        font-weight:900;
        padding: 0.2vw 0;
        text-decoration: underline;
    }
`

const Img = styled.img`
    width: 80%;
    transition:0.4s;
`

const P = styled.p`
  margin-bottom: 1vw;
  font-size: 1.5vw;
  text-align: center;
  width:90%;
`

const apiSeries = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv/popular?api_key=1f39bbe7f1f238b5821d8f9dd9f30a36"
})

export default class Series extends React.Component{

  state = {
    tvSeries: [],
    seriesSearch: []
  }

  componentDidMount() {
    this.getSeries()
  }
    
  getSeries = async () => {
    const response = await apiSeries.get()
    
    const series = response.data.results.map((item) => {
      return{
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w200/${item.poster_path}`
      }
    })

    this.setState({
      tvSeries: series,
      seriesSearch: series
    })
  }

  handleChange = (e) => {

    const seriesFilter = this.state.tvSeries.filter((item) => {
      if(item.name.toLowerCase().includes(e.target.value.toLowerCase())){
        return true;
      }
    })

    this.setState({
      seriesSearch: seriesFilter,
    })
  }

  render(){
    return(
      <Container>
        <Intro>
        <h2>Series</h2>
          <Input type="text" placeholder='Buscar Series' onChange={this.handleChange}/>
          </Intro>
        <SeriesDiv>
          {this.state.seriesSearch.map((item, index) => (
              <SeriesBox key={index}>
                <P>{item.name}</P>
                <Img src={item.poster_path} alt={`Banner da série ${item.name}`} />
              </SeriesBox>
          ))}
        </SeriesDiv>
      </Container>
    )
  }
}