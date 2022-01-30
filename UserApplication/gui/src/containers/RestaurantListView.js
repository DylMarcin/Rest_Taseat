import React from "react";
import Restaurant from "../components/Restaurant";
import axios from 'axios'

class RestaurantList extends React.Component {
    state = {
        restaurants: []
    }

    componentDidMount(){
        axios.get('http://localhost:8000/restaurants')
        .then(res => {
            this.setState({
                restaurants: res.data
            });
        })
        }
    
    render(){
        return(
            <Restaurant data ={this.state.restaurants}/>
        )
    }
}

export default RestaurantList;