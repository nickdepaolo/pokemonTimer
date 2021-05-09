import React, { Component } from 'react'
import './PokeFetch.css';


class PokeFetch extends Component {
  constructor() {
    super()
    this.state = {
      pokeInfo: '',
      pokeSprite: '',
      pokeName: '',
      timer: 11
    }
  }

  fetchPokemon() {
    let min = Math.ceil(1);
    let max = Math.floor(152);
    let pokeNum = Math.floor(Math.random() * (max - min) + min);

    this.changeState();
    
    fetch(`https://pokeapi.co/api/v2/pokemon/${pokeNum}`, {
      method: 'GET'
    }).then(res => res.json())
    .then(res => {
      this.setState({
        pokeInfo: res,
        pokeSprite: res.sprites.front_default,
        pokeName: res.species.name,
      })
      this.setState({
        timer: 11
      })
      
      this.decrement();
      })
      .catch((err) => console.log(err))
  }

  changeState() {
    this.setState({
      pokeSprite: '',
      pokeName: '',
      timer: 11
    })
  }

  count() {
    this.setState({
      timer: (this.state.timer - 1)
    });
    setTimeout(() => this.decrement(), 1000)
  };

  decrement() {
    if (this.state.timer > 0) {
      this.count()
    }
  };

  render() {
    return (
      <div className={'wrapper'}>
        <button className={'start'} onClick={() => this.fetchPokemon()}>Start!</button>
        <h1 className={'timer'} >Timer Display</h1>
        <div className={'pokeWrap'}>
          <br/>
          {this.state.pokeSprite? <img className={'pokeImg'}  src={this.state.pokeSprite} /> : ''}
          <div>
             {this.state.pokeSprite? <h1 className={'pokeName'}>{this.state.pokeName}</h1> : ''}
          </div>
          <div>{this.state.timer < 11 && this.state.timer > 0 ? <h1 className={'count'} >{this.state.timer}</h1> : ''}</div>
        </div>
      </div>
    )
  }
}

export default PokeFetch;