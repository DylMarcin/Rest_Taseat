import React from "react";
import axios from 'axios'
import Bookings from "./bookings";

class Requests extends React.Component {
    state = {
        requests: []
    }

    componentDidMount() {
        axios.get(`http://127.0.0.1:8000/bookings/`)
          .then(res => {
            const requests = res.data;
            this.setState({ requests });
          })
      }
    
    render(){
        return(
            <Bookings data ={this.state.requests}/>
        )
    }
}

export default Requests;