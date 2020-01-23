import React, { Component } from 'react';
import { AppContext } from '../Provider';
import "./Index.css";

const Cell = (props) => {
  return (
    <AppContext.Consumer>
      {context => {
        const iconPasted = context.object[props.index]? context.object[props.index].value:null;
        const color = (context.coordsToColor.filter(c=>c==props.index).length)?"red":"";
      const icon  = iconPasted !== null? iconPasted==1? <i className={color+" fas fa-times"}></i> : <i className={color+" fas fa-circle"}></i>:'';
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
  
  static context = AppContext;

  constructor(props){
    super(props);
    this.state = {
      form:{
        height:null,
        width:null,
        length:null
      }
    }
  }


  onChangeFunction(val, e){
    let form = {...this.state.form}
    form[val] = e.target.value;
    this.setState({form:form});
  }

  saveOptions(){
    let form = {...this.state.form};
    if(!form.height || !form.width || !form.length){
      alert('ყველა ველის შევსება სავალდებულოა!');
    }else{
      this.context.setStateFromChild(this.state.form);
    }
  }

  clear(){
    this.context.clearAll();

  }

  render() {
    return (
      <div className="container">
        <div className="form">
            <input type='number' required name="height" placeholder="სირგძე" value={this.state.height} onChange={this.onChangeFunction.bind(this,'height')}/>
            <input type='number' required name="width" placeholder="სიგანე"  value={this.state.width} onChange={this.onChangeFunction.bind(this,'width')} />
            <input type='number' required name="length" placeholder="რამდენ მიმდევრობაში იგებს" value={this.state.length} onChange={this.onChangeFunction.bind(this,'length')}/>
            <button type="submit" onClick={this.saveOptions.bind(this)}>შენახვა</button>
            <button type="submit" onClick={this.clear.bind(this)}>გასუფთავება</button>
        </div>
        <Board />
      </div>
    );
  }
}


Index.contextType = AppContext;

export default Index;
