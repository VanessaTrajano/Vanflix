import React, { Component } from "react"
import axios from "axios"
import styled from 'styled-components'
import { createGlobalStyle } from "styled-components"

const GlobalStyle = createGlobalStyle`
    *{
        margin:0;
        padding:0;
        box-sizing:border-box;
    }
    body{
        background-color:#000;
        color:#fff;
    }
`

const Container = styled.div``

const Movies = styled.div`
    display: flex;
    flex-wrap:wrap;
    justify-content: space-evenly;
`

const MovieBox = styled.div`
    margin-top: 2vw;
    border: 2px solid red;
    width: 22vw;
    height: 35vw;
    display:flex;
    flex-direction:column;
    justify-content:space-evenly;
    align-items:center;
`

const Img = styled.img`
    width: 90%;
`

const P = styled.p``

const apiFilmes = axios.create({
    baseURL: "https://api.themoviedb.org/3/movie/popular?api_key=1f39bbe7f1f238b5821d8f9dd9f30a36"
})

export default class App extends Component{
    state = {
        movies: []
    }

    async componentDidMount(){
        // é uma função que sempre é chamada quando a página é inicializada

        const response = await apiFilmes.get()

        const filmes = response.data.results.map((item) => {
            return{
                ...item,
                poster_path: `https://image.tmdb.org/t/p/w200/${item.poster_path}`
            }
        })

        this.setState({
            movies: filmes,
        })
    }

    render(){
        return(
            <Container>
                <GlobalStyle/>
                <h1>Movies</h1>
                <Movies>
                    {this.state.movies.map((item, index) => (
                        <MovieBox key={index}>
                            <P>{item.title}</P>
                            <Img src={item.poster_path} alt={`Banner de ${item.title}`}/>
                        </MovieBox>
                    ))}
                </Movies>
            </Container>
        )
    }   
}