import React, { Component } from 'react';
// import { Link } from 'react-router-dom';
import './game.css';
import axios from 'axios';

class Game extends Component {
    constructor() {
        super()
        this.state = {
            game: []
        }
    }

    componentDidMount(){
        const gameId = this.props.match.params.id
        console.log(gameId)
        const gamePromise = axios.get(`${window.apiHost}/games/${gameId}`)
        gamePromise.then((results)=>{
            const gameData = results.data[0]
            this.setState({
                game : gameData
            })
        }).catch((error)=>{
            if(error){throw error}
        })
    }

    render() {
        if(this.state.game.length === 0){
            return(
                <div>

                </div>
            )
        }else{
            let image = this.state.game.screenshot_url.split(',')[0];
            image = image.replace('t_thumb','t_cover_big')
            return (
                <div className="game-container">
                    <div className="row">
                        <div className="col s12 m4">
                            <img src={image} alt="" className="game-pic" />
                        </div>
                        <div className="col s12 m8">
                            <div className="row">
                                <h3 className="game-title">{this.state.game.name}</h3>
                                <div className="game-desc">
                                    {this.state.game.summary}
                                </div>
                            </div>
                            <div className="row">
                                <div className="col s1">
                                    <span>Qty:</span>
                                </div>
                                <div className="col s8">
                                    <input type="text" name="quantity" />
                                </div>
                                <div className="col s2">
                                    <button>ADD</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )
        }
    }
}

export default Game;