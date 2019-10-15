# react-star-rating-controlled-component

[![npm version](http://https://www.npmjs.com/package/react-star-rating-controlled-component.svg)](https://www.npmjs.com/package/react-star-rating-controlled-component)
[![Dependency Status](http://david-dm.org/voronianski/react-star-rating-controlled-component.svg)](http://david-dm.org/voronianski/react-star-rating-controlled-component)
[![Download Count](http://img.shields.io/npm/dm/react-star-rating-controlled-component.svg?style=flat)](http://www.npmjs.com/package/react-star-rating-controlled-component)

> Tiny [React.js](https://facebook.github.io/react) component for star (or any other *icon based*) ratings.

This is a fork of Dmitri Voronianski's [react-star-rating-component](https://github.com/voronianski/react-star-rating-controlled-component), a *"Tiny [React.js](https://facebook.github.io/react) component for star (or any other *icon based*) ratings."*

This version is updated to be fully controlled, i.e. it does not maintain state internally and just renders its props. This makes it easy to operate with React-Redux. 

Also, the componentWillMount function has been removed, which will no longer be supported with React 17. And lastly, the packages in package.json have been brought up to date.

## Install

```bash
npm install react-star-rating-controlled-component --save
```

or, if you use yarn:

```bash
yarn add react-star-rating-controlled-component 
```

## [Demo Here](http://networkandsoftware.github.io/react-star-rating-controlled-component/example)


## Props

```javascript
<StarRatingComponent
    name={String} /* name of the radio input, it is required */
    value={Number} /* number of selected icon (`0` - none, `1` - first). *Also required* */
    starCount={Number} /* number of icons in rating, default `5` */
    onStarClick={Function(nextValue, prevValue, name)} /* on icon click handler */
    onStarHover={Function(nextValue, prevValue, name)} /* on icon hover handler */
    onStarHoverOut={Function(nextValue, prevValue, name)} /* on icon hover out handler */
    renderStarIcon={Function(nextValue, prevValue, name)} /* it should return string or react component */
    renderStarIconHalf={Function(nextValue, prevValue, name)} /* it should return string or react component */
    starColor={String} /* color of selected icons, default `#ffb400` */
    emptyStarColor={String} /* color of non-selected icons, default `#333` */
    editing={Boolean} /* is component available for editing, default `true` */
/>
```

## Examples

### Editable 

```javascript
import React from 'react';
import ReactDOM from 'react-dom';
import StarRatingComponent from 'react-star-rating-controlled-component';

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      rating: 1
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({rating: nextValue});
  }

  render() {
    const { rating } = this.state;
    
    return (                
      <div>
        <h2>Rating from state: {this.state.rating}</h2>
        <StarRatingComponent 
          name="rate1" 
          starCount={10}
          value={rating}
          onStarClick={this.onStarClick.bind(this)}
        />
      </div>
    );
  }
}

ReactDOM.render(
  <App />, 
  document.getElementById('app')
);
```

### React-Redux

```javascript
import React from 'react'
import ReactDOM from 'react-dom'
import { createStore } from 'redux'
import { connect, Provider } from 'react-redux'
import StarRatingComponent from '../'

const SET_RATING_ACTION = 'SET_RATING_ACTION'

const reducer = (state, action) => {
  switch (action.type) {
    case SET_RATING_ACTION:
      return { ...state, rating: action.rating }
    default:
      return state
  }
}

const preloadedState = { rating: 3 }
const store = createStore(reducer, preloadedState)

const createSetRatingAction = rating => ({ type: SET_RATING_ACTION, rating: rating })

const Component = props =>
  <div style={{ marginLeft: 20 }}>
    <h3>React-Redux:</h3>
    <div style={{ fontSize: 24 }}>
      <StarRatingComponent name="reduxStarRating" value={props.rating} onStarClick={props.createSetRatingAction} />
    </div>
  </div>

const mapStateToProps = state => ({ rating: state.rating })

const Container = connect(mapStateToProps, { createSetRatingAction })(Component)

ReactDOM.render(
  <Provider store={store}>
    <Container />
  </Provider>
  , document.getElementById('redux-app')
)
```

More in [examples folder](https://github.com/networkandsoftware/react-star-rating-controlled-component/tree/master/example).

---

**MIT Licensed**
