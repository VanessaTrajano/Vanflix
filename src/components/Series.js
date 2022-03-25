// chave: 1f39bbe7f1f238b5821d8f9dd9f30a36

// Como pegar a chave da API: 
// Perfil > Configuração > API > Chave de API

import React from 'react'
import axios from 'axios'
import styled from 'styled-components'
import { createGlobalStyle } from "styled-components"

const apiSeries = axios.create({
  baseURL: "https://api.themoviedb.org/3/tv/popular?api_key=1f39bbe7f1f238b5821d8f9dd9f30a36"
})

export default class MainPage extends React.Component{

  state = {
    tvSeries: []
  }

  async componentDidMount() {
    const response = await apiSeries.get()

    console.log(response.data.results)
    
    const series = response.data.results.map((item) => {
      return{
        ...item,
        poster_path: `https://image.tmdb.org/t/p/w200/${item.poster_path}`
      }
    })

    this.setState({
      tvSeries: series,
    })
  }

  render(){
    return(
      <div>
        <h1>Series</h1>
        {this.state.tvSeries.map((item, index) => (
            <div key={index}>
              <p>{item.name}</p>
              <img src={item.poster_path} alt={`Banner da série ${item.name}`} />
            </div>
        ))}
      </div>
    )
  }
}