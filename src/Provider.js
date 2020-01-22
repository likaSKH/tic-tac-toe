import React, { Component } from 'react';


export const AppContext = React.createContext();

export default class Provider extends Component {

state = {
    length : 3, //midevrobit ramdeni und asheivsos, rom gamarjvebuli gamovlindes
    height :3, //sigrdze
    width: 3,   //sigane
    object : {},
    coordsList :[],  
    setInitialObject : (object)=>{
       this.settInitialObject(object); 
    },
    play: (index) => {
        this.play(index)
    },
  }

settInitialObject = (object)=>{
    this.setState({object:object});
}

play = (index) => {
   console.log(index);
}

componentDidMount(){
    let coords = [] ;
    for (var x=0; x<this.state.height; x++) {
        let iteration = x*this.state.width;
        for (var y=0; y<this.state.width; y++) {
            coords.push({coords:x+","+y, iteration:iteration+y});
        }
    }
    this.setState({coordsList:coords});
}


  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}