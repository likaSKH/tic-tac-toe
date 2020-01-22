import React, { Component } from 'react';
import { AppContext } from '../Provider';
import "./Index.css";

const Cell = (props) => {
  return (
    <AppContext.Consumer>
      {context => {
        const iconPasted = context.object[props.index]? context.object[props.index].value:null;
        const icon = iconPasted !== null? iconPasted=='x'? <i className="fas fa-times"></i> : <i className="far fa-circle"></i>:'';
        return (
          <button onClick={()=>context.play(props.index)}>
              {icon}
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
        this.state = {
            object :{}
        }
    }

  componentDidUpdate() {
    
  }
  
  renderHTML(height, width){
    let items = [];
    for (var y=0; y<height; y++) {
        let resource = this.renderInnerHTML(width, y);
        let wrapper = <div className="row">{resource}</div>;
        items.push(wrapper);
    }
    return items;
  }

  renderInnerHTML(width, y){
    let items = [];
    let count = y*width;
    for (var x=0; x<width; x++) {
        items.push(<Cell index={count+x}/>);
        
    }
    return items;
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
