# react-star-rating-component-new

[![npm version](https://badge.fury.io/js/react-star-rating-controlled-component.svg)](https://www.npmjs.com/package/react-star-rating-component-new)
[![Download Count](http://img.shields.io/npm/dm/react-star-rating-component-new.svg?style=flat)](http://www.npmjs.com/package/react-star-rating-component-new)

This is a fork of Dmitri Voronianski's [react-star-rating-component](https://github.com/voronianski/react-star-rating-component), a *"Tiny [React.js](https://facebook.github.io/react) component for star (or any other *icon based*) ratings."*

This version includes different render function prop for rendering the empty star icon. This removes the dependency of changing colors on basis of rating and displaying different icon altogether. A new prop renderEmptyStarIcon has been added with this package.

## Install

```bash
npm install react-star-rating-component-new --save
```

or, if you use yarn:

```bash
yarn add react-star-rating-component-new
```

## Props

```javascript
<StarRatingComponent
  name={String} /* name of the radio input, it is required */
  value={
    Number
  } /* number of selected icon (`0` - none, `1` - first). *Also required* */
  starCount={Number} /* number of icons in rating, default `5` */
  onStarClick={Function(nextValue, prevValue, name)} /* on icon click handler */
  onStarHover={Function(nextValue, prevValue, name)} /* on icon hover handler */
  onStarHoverOut={Function(
    nextValue,
    prevValue,
    name
  )} /* on icon hover out handler */
  renderStarIcon={Function(
    nextValue,
    prevValue,
    name
  )} /* it should return string or react component */
  renderEmptyStarIcon={Function(
    nextValue,
    prevValue,
    name
  )} /* it should return string or react component */
  renderStarIconHalf={Function(
    nextValue,
    prevValue,
    name
  )} /* it should return string or react component */
  editing={Boolean} /* is component available for editing, default `true` */
/>
```

## Examples

### React

```javascript
import React from "react";
import ReactDOM from "react-dom";
import StarRatingComponent from "react-star-rating-component-new";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faStar, faStarHalfAlt } from "@fortawesome/free-solid-svg-icons";
import { faStar as faStarEmpty } from "@fortawesome/free-regular-svg-icons";

class App extends React.Component {
  constructor() {
    super();

    this.state = {
      rating: 1,
    };
  }

  onStarClick(nextValue, prevValue, name) {
    this.setState({ rating: nextValue });
  }

  render() {
    const { rating } = this.state;

    return (
      <div>
        <h2>Rating from state: {this.state.rating}</h2>
        <StarRating
          name="productRating"
          editing={false}
          renderStarIcon={() => (
            <FontAwesomeIcon
              icon={faStar}
              style={{ color: "rgb(253, 186, 73)" }}
            />
          )}
          renderStarIconHalf={() => (
            <FontAwesomeIcon
              icon={faStarHalfAlt}
              style={{ color: "rgb(253, 186, 73)" }}
            />
          )}
          renderEmptyStarIcon={() => (
            <FontAwesomeIcon
              icon={faStarEmpty}
              style={{ color: "rgb(253, 186, 73)" }}
            />
          )}
          starCount={5}
          value={rating}
        />
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("app"));
```

---

**MIT Licensed**
