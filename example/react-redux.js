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