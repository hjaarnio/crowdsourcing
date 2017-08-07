import React from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import CategoryElement from './CategoryElement.js';
import AddCategoryContainer from './AddCategoryContainer.js';
import * as actionCreators from '../../actions/actionCreators';


class Categories extends React.Component {
  constructor(props){
    super(props);
  }

  componentDidMount(){
    this.props.onMount();
  }


  render(){
    var categories, admin;
    if(this.props.params && this.props.params.areaName){
      categories = this.props.categories[this.props.params.areaName];
      if(this.props.areas && this.props.areas[this.props.params.areaName])
        admin = this.props.areas[this.props.params.areaName].admin;
    } else {
      categories = null;
      admin = false;
    }

    var header = (
      <div className="row">
        <div className="col">
          <h2>Categories</h2>
        </div>
      </div>
    )

    if(this.props.params.areaName){
      if(!categories || categories.length === 0){
        header = (
          <div className="row">
            <div className="col">
              <h2>No categories in selected area</h2>
            </div>
          </div>
        )
      }
    } else {
      header = (
        <div className="row">
          <div className="col">
            <h2>No area selected. Please select or create an area from the area menu.</h2>
          </div>
        </div>
      )
    }

    return (
      <div className="row">
        <div className="col">
          {header}
          {admin &&
            <div className="row">
              <div className="col">
                <p>These categories let you divide issues to discuss with shareholders into concrete sub-areas. <br/>
                  For example transportation, urban planning, or education
                </p>
              </div>
            </div>
          }

        { categories && categories.map((category) => {
          return <CategoryElement
              key={category.id}
              id={category.id}
              title={category.title}
              description={category.description}
              url={`/area/${this.props.params.areaName}/${category.id}`}>
              </CategoryElement>
        })}
        {admin &&
          <AddCategoryContainer params={this.props.params} update={this.addNew}></AddCategoryContainer>
        }
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  return {
    categories: state.categories,
    areas: state.areas
    //categories: state.areas.selected ? state.categories[state.areas.selected.name] : []
  }
}

function mapDispatchToProps(dispatch) {
  return {
    onMount() {
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
