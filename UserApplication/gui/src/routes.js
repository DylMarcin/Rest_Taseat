import React from "react";
import { Route } from 'react-router-dom'
import RestaurantList from "./containers/RestaurantListView";
import RestaurantDetail from "./containers/RestaurantDetailView";
import login from "./containers/Login";
import ProfileView from "./containers/ProfileView";

const BaseRouter = () => (
    <div>
        <Route exact path='/' component={login}/>
        <Route exact path='/restaurants' component={RestaurantList}/>
        <Route exact path='/restaurants/:restaurantID' component={RestaurantDetail}/>
        <Route exact path='/profile' component={ProfileView}/>
    </div>
);

export default BaseRouter;