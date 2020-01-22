import React, { Component } from 'react';
import { AppContext } from '../Provider';
import "./Index.css";
const ICON_PLACE_HOLDDER = 'I';

const Cell = (props) => {
  return (
    <AppContext.Consumer>
      {context => {
        // const value = context.cells[props.index];
        // const icon = value !== null ? ICON_CHARS[value] : ICON_PLACE_HOLDDER;
        // const isDoneClass = icon !== ICON_PLACE_HOLDDER ? 'done' : '';

        return (
          <button onClick={()=>context.play(props.index)}>
              
          </button>
        )
      }}
    </AppContext.Consumer>
  )
}

class Board extends Component {
    static context = AppContext;
    constructor(props) {
        super(props);
        this.boardRef = React.createRef();
    }

  componentDidUpdate() {
    
  }
  
  renderHTML(height, width){
    let items = [];
    for (var x=0; x<height; x++) {
        let wrapper = <div className="row">{this.renderInnerHTML(width, x)}</div>;
        items.push(wrapper); 
    }
    return items;
  }

  renderInnerHTML(width, x){
    let items = [];
      let count = x*width;
    for (var y=0; y<width; y++) {
        items.push(<Cell index={count+y}/>);
        console.log(this.getIterationNumber(x,y));
        console.log('count',count+y);
    }
    return items;
  }

  getIterationNumber(x,y){
      let i = this.context.coordsList.filter(coords => coords.coords===x+","+y);
    return i[0]? i[0].iteration:'';
  }


  render() {

    return (
        <AppContext.Consumer>
        {context => {
            return( 
            <div>
                {
                    this.renderHTML(context.height, context.width)
                }
            </div>
            )
        }}
        </AppContext.Consumer>

     
    )

  }
}



Board.contextType = AppContext;

class Index extends Component {
  render() {
    return (
      <div className="container">
        <Board />
      </div>
    );
  }
}


Index.contextType = AppContext;

export default Index;
