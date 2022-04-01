import React, { Component } from "react"
import axios from 'axios'
import Carousel from 'react-elastic-carousel'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content:space-evenly;
    align-items: center;
    height:85vh;
`

const Title = styled.h2`
    font-size:2vw;
`

const P = styled.p`
    font-size: 1.5vw;
`

const Box = styled.div`
    width:60%;
    padding:1vw;
    border: 2px dashed #F8FFF4;
    border-radius:1vw;
`

const Img = styled.img`
    width:18vw;
`

const ApiHome = axios.create({
    baseURL: "https://api.themoviedb.org/3/trending/all/day?api_key=1f39bbe7f1f238b5821d8f9dd9f30a36"
})


export default class Home extends Component {

    state = {
        content: [],
        contentSearch: []
      }

    componentDidMount(){
        this.getTrending()
    }
    
    getTrending = async () => {
        const response = await ApiHome.get()
        const trending = response.data.results.map((item) => {
            return{
                ...item,
                poster_path: `https://image.tmdb.org/t/p/w200/${item.poster_path}`
            }
        })
    
        this.setState({
            content: trending,
        })
    }
    
    render(){
        return(
            <Container>
                <Title>Home</Title>
                <P>See whats trending in movies and series today!!!</P>
                <Box>
                    <Carousel>
                        {this.state.content.map((item)=> (
                                <Img src={item.poster_path} alt={`Banner de ${item.name}`} />
                        ))}
                    </Carousel>
                </Box>
            </Container>
        )
    }
}