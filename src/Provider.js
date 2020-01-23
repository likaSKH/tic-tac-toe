import React, { Component } from 'react';


export const AppContext = React.createContext();

export default class Provider extends Component {
state = {
    length : 4, //midevrobit ramdeni und asheivsos, rom gamarjvebuli gamovlindes
    height :5, //sigrdze
    width: 5,   //sigane
    startPlayer :0,
    object : [],
    coordsList :[],  
    gameOver:false,
    setInitialObject : (object)=>{
       this.settInitialObject(object); 
    },
    play: (index) => {
        this.play(index);
    },
    clearAll:()=>{
        this.clearAll();
    },
    orientations:{
        top:false,
        down:false,
        left:false,
        right:false,
        top_left:false,
        top_right:false,
        down_right:false,
        top_right:false,    
    },
    coordsToColor:[],
    lastIndex:null,
    setStateFromChild:(stateFromChild)=>{
        this.setStateFromChild(stateFromChild);
    },


  }

oppositeValues = {
    top:'down',
    down:'top',
    left:'right',
    right:'left',
    top_left:'down_right',
    down_right:'top_left',
    top_right:'down_left',
};

setStateFromChild(stateFromChild){
    this.setState({width:stateFromChild.width,height:stateFromChild.height,length:stateFromChild.length},()=>{
       this.generateCoords(); 
    });
}
componentDidMount(){

    this.generateCoords();
}


settInitialObject = (object)=>{
    this.setState({object:object});
}

play = (index) => {
    if(!this.state.gameOver){
    let object = [...this.state.object];
    let player = this.state.startPlayer;
    if(player>=(this.state.height*this.state.width)){
        alert("თამაში დასრულდა ფრედ");
        this.clearAll();
    }
    else{

    if(object[index].value==null){
        if(player % 2 == 0){
            object[index].value = 0;
        }else{
            object[index].value = 1;
        }
        player = player+1;
    }
    this.setState({startPlayer:player, object:object});
    this.checkWinner(index); 
    }
    }
}


checkWinner(index){
    this.setState({lastIndex:index},()=>{
        let orientations = this.cleanOrientations();
        this.setState({orientations:orientations},()=>{
            let coordinatesWhichWon = [];
            let res = this.searchInTree(index, 1, null, false, orientations, coordinatesWhichWon);
            let count = res? res[0]:'';
            if(count>=this.state.length){
                let obj = [...this.state.object];
                let player = obj[index].value==1?'X':"O";
                alert("მოთამაშე "+player+"-მა მოიგო");
                this.setState({coordsToColor:res[1], gameOver:true});
            }
        });
        
    });
}

cleanOrientations(){
    return {
        top:false,
        down:false,
        left:false,
        right:false,
        top_left:false,
        top_right:false,
        down_right:false,
        top_right:false,    
    }
}

searchInTree(index, count, orientation = null, reversed = false, orArr, coordinatesWhichWon){
    coordinatesWhichWon.push(index);
    if(count >= this.state.length) return [count,coordinatesWhichWon];
    let neighbours = this.getIndexNeighboursOfSameValue(index);
    if(orientation){

        if(reversed && !neighbours[orientation][0]){
            return this.searchInTree(this.state.lastIndex, 1, null, false, this.cleanOrientations, coordinatesWhichWon); 
        }

        if(neighbours[orientation][0]){
            return this.searchInTree(neighbours[orientation][0].index,++count, orientation, reversed, orArr, coordinatesWhichWon);
        }else{
            let opposite = this.oppositeValues[orientation];
            if(reversed==true) {


                return  this.searchInTree(this.state.lastIndex, 1, null, false, this.cleanOrientations,[]);
            }
            else{
                orArr[opposite] = true;
                return this.searchInTree(this.state.lastIndex, count, opposite, true, orArr, coordinatesWhichWon);
            }
        }
        
    }
    
    for(let key in  neighbours){
        if(neighbours[key].length>0){
            if(!orArr[key]){
                orArr[key] = true;
                return this.searchInTree(neighbours[key][0].index,++count, key, false,orArr, coordinatesWhichWon);
            }

        }
    }
    

}




getIndexNeighboursOfSameValue(index){
    let mainObj = this.state.object[index];
    let neighbours = [];
    let filtered = this.state.object.filter(obj => obj.value===mainObj.value);
    neighbours['left'] = filtered.filter(obj => obj.index===mainObj.left); 
    neighbours['right'] = filtered.filter(obj => obj.index===mainObj.right); 
    neighbours['top'] = filtered.filter(obj => obj.index===mainObj.top); 
    neighbours['down'] = filtered.filter(obj => obj.index===mainObj.down); 
    neighbours['top_left'] = filtered.filter(obj => obj.index===mainObj.top_left); 
    neighbours['top_right'] = filtered.filter(obj => obj.index===mainObj.top_right); 
    neighbours['down_right'] = filtered.filter(obj => obj.index===mainObj.down_right); 
    neighbours['down_left'] = filtered.filter(obj => obj.index===mainObj.down_left); 
    return neighbours;

}

clearAll(){
    let obj = [...this.state.object];
    for(let key in obj){
        obj[key].value = null;
    }
    this.setState({object:obj,startPlayer:0, gameOver:false});
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
            objects.push(this.generateNeighbours(x,y, iteration+x));
        }
    }
    this.setState({object:objects});
}


generateNeighbours(x,y,i){
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
        index : i
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