import React, { Component } from 'react';
import loginTab from '../../misc/openWindow';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import getCart from '../../actions/getCartAction';

class LoginNavBar extends Component {
    constructor() {
        super();
        this.state = {

        }
    }


    // The process:
    // 1. User clicks and opens the new window via loginTab
    // 2. New window is open to crossOrigin but is github.com
    // 3. Once user authenticates, github sends them to /auth
    // 4. The callback URL either gets the uid or inserts them
    // 5. Callback then takes the uid and tokenizes it with JWT (JSON web tokens)
    // 6. Token is sent back to the github window that loginTab opened and
    // window.opener.postMessage is in the script of that window which
    // sends the data back over to original page
    // 7. It's now available in this promise resolution
    // 8. Put it in localstorage so we can use it next time.

    githubAuth = (event) => {
        loginTab('http://localhost:3000/auth/github')
    }

    // componentWillReceiveProps(newProps){
    //     console.log('newProps = ' + newProps.auth.token)

    //     this.props.getCart(newProps.auth.token)
    // }

    // componentDidMount(){
    //     console.log("component mounted")
    //     console.log(this.props.auth.token)
    //     if(this.props.auth.token == undefined){
    //         console.log("token not undefined")
    //         this.props.getCart(this.props.auth.token)
    //     }
    // }


    render() {
        console.log(this.props.auth)
        let rightNavBar = ''

        if(this.props.auth.userName !== undefined){
            // user is logged in
            rightNavBar = <span> Welcome, {this.props.auth.userName}</span>
        }else{
            // user is not logged in
            rightNavBar = <span><Link to='/login'>Sign in</Link> or <Link to='/register'>Register</Link> | </span>
        }
        console.log(rightNavBar)
        return (
            <div className="login-nav-bar">
                <Link to="/"><div className="left valign-wrapper">WELCOME TO ZAPP GAMES</div></Link>
                <div className="right">
                    {rightNavBar}
                    <span><Link to="/cart"><i className="material-icons">shopping_cart</i> My Cart</Link> | {this.props.cart.items} items - ${this.props.cart.total}</span>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state){
    return{
        auth: state.auth, 
        cart: state.cart
    }
}

function mapDispatchToProps(dispatch){
    return bindActionCreators({
        getCart: getCart
    }, dispatch)
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginNavBar);


