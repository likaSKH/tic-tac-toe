import React, { Component } from 'react';


export const AppContext = React.createContext();

export default class Provider extends Component {

state = {
    length : 3, //midevrobit ramdeni und asheivsos, rom gamarjvebuli gamovlindes
    height :3, //sigrdze
    width: 3,   //sigane
    startPlayer :0,
    object : [],
    coordsList :[],  
    setInitialObject : (object)=>{
       this.settInitialObject(object); 
    },
    play: (index) => {
        this.play(index);
    },
  }

settInitialObject = (object)=>{
    this.setState({object:object});
}

play = (index) => {
    let object = [...this.state.object];
    let player = this.state.startPlayer;

    if(object[index].value==null){
        if(player % 2 == 0){
            object[index].value = '0';
        }else{
            object[index].value = 'x';
        }
        player = player+1;
    }
    this.setState({startPlayer:player, object:object});
}

componentDidMount(){
    this.generateCoords();
}

generateCoords(){
    let coords = [] ;
    for (var y=0; y<this.state.height; y++) {
        let iteration = y*this.state.width;
        for (var x=0; x<this.state.width; x++) {
            coords.push({coords:x+","+y, iteration:iteration+x});
        }
    }
    this.setState({coordsList:coords},()=>{
        this.generateObject(); 
    });
}

generateObject(){
    let objects = [];
    for (var y=0; y<this.state.height; y++) {
        let iteration = y*this.state.width;
        for (var x=0; x<this.state.width; x++) {
            objects.push(this.generateNeighbours(x,y));
        }
    }
    this.setState({object:objects});
}


generateNeighbours(x,y){
    return {
        left:(x-1<0)?null:this.getIterationNumber(x-1,y),
        right:this.getIterationNumber(x+1,y),
        top:this.getIterationNumber(x,y-1),
        down:this.getIterationNumber(x,y+1),
        top_left:(x-1<0 || y-1<0)?null: this.getIterationNumber(x-1,y-1),
        top_right:(y-1<0)?null: this.getIterationNumber(x+1,y-1),
        down_left:(x-1<0)?null: this.getIterationNumber(x-1,y+1),
        down_right:this.getIterationNumber(x+1,y+1),
        value : null,
    };

  }

  getIterationNumber(x,y){
    let i = this.state.coordsList.filter(coords => coords.coords===x+","+y);
  return i[0]? i[0].iteration:null;
}

  render() {
    return (
      <AppContext.Provider value={this.state}>
        {this.props.children}
      </AppContext.Provider>
    );
  }
}