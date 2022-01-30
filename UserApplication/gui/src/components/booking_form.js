import React, { Component } from "react";
import axios from 'axios'
import { withRouter } from "react-router";


class Booking_form extends Component {
    constructor(props) {
        super(props)
        this.state = {
            "time": "",
            "seats": '',
            "additionals": "",
            "restaurant": this.props.match.params.restaurantID
        }
    }

    changeHandler = e => {
        this.setState({[e.target.name]: e.target.value})
    }

    submitHandler = e => {
        e.preventDefault()
        console.log(this.state)
        axios
            .post('http://127.0.0.1:8000/bookings/', this.state)
            .then(response=> {
                console.log(response)
            })
            .catch(error => {
                console.log(error)
            })
    }

    render(){
        const {seats, additionals, time } = this.state;
        return(
            <div>
                <div class="form-style-10">
                <h1>Rezerwacja<span>Wypełnij pola</span></h1>
                <form onSubmit={this.submitHandler}>
                    
                    <div class="inner-wrap">
                        <label>Liczba osób:<input type = 'text' name="seats" value={seats} onChange={this.changeHandler}/></label>
                        <label>Godzina:<input type = 'time' name="time" value ={time} onChange={this.changeHandler}/></label>
                		<label>Informacje:<textArea name="additionals" value={additionals} onChange={this.changeHandler}/></label>
                    </div>
                    <div class="button-section">
                    <input type="submit" name="Zarezerwuj"/>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

export default withRouter(Booking_form);