import React, { Component } from "react";
import axios from 'axios'


class AccountForm extends Component {
    render(){
        return(
            <div>
                <div class="form-style-10">
                <h1>Dane użytkownika<span>Wypełnij pola</span></h1>
                <form>
                    
                    <div class="inner-wrap">
                        <label>Imie<input type = 'text' name="name"/></label>
                        <label>Stare hasło<input type = 'text' name="password"/></label>
                        <label>Nowe hasło<input type = 'text' name="newpass"/></label>
                		<label>Adres Email:<input type = 'text' name="mail"/></label>
                    </div>
                    <div class="button-section">
                    <input type="submit" name="Zmień dane użytkownika"/>
                    </div>
                </form>
                </div>
            </div>
        )
    }
}

export default AccountForm;