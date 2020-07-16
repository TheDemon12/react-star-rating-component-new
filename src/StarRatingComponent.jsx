import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cx from 'classnames';

class StarRatingComponent extends Component {
  static propTypes = {
    name: PropTypes.string.isRequired,
    value: PropTypes.number.isRequired,
    editing: PropTypes.bool,
    starCount: PropTypes.number,
    onChange: PropTypes.func,
    onStarClick: PropTypes.func,
    onStarHover: PropTypes.func,
    onStarHoverOut: PropTypes.func,
    renderStarIcon: PropTypes.func,
    renderStarIconHalf: PropTypes.func,
    renderEmptyStarIcon: PropTypes.func
  };

  static defaultProps = {
    starCount: 5,
    editing: true
  };

  onStarClick(index, name, e) {
    e.stopPropagation();

    const { onStarClick, editing } = this.props;

    if (!editing) {
      return;
    }
    onStarClick && onStarClick(index, name, e);
  }

  onStarHover(index, name, e) {
    e.stopPropagation();

    const { onStarHover, editing } = this.props;

    if (!editing) {
      return;
    }

    onStarHover && onStarHover(index, name, e);
  }

  onStarHoverOut(index, name, e) {
    e.stopPropagation();

    const { onStarHoverOut, editing } = this.props;

    if (!editing) {
      return;
    }

    onStarHoverOut && onStarHoverOut(index, name, e);
  }

  renderStars() {
    const { name, starCount, editing, value } = this.props;

    const starStyles = (i, value) => ({
      float: 'right',
      cursor: editing ? 'pointer' : 'default'
    });

    // populate stars
    let starNodes = [];

    for (let i = starCount; i > 0; i--) {
      const id = `${name}_${i}`;
      const starNodeLabel = (
        <label
          key={`label_${id}`}
          style={starStyles(i, value)}
          className={
            'dv-star-rating-star ' +
            (value >= i
              ? 'dv-star-rating-full-star'
              : 'dv-star-rating-empty-star')
          }
          htmlFor={id}
          onClick={(e) => this.onStarClick(i, name, e)}
          onMouseOver={(e) => this.onStarHover(i, name, e)}
          onMouseLeave={(e) => this.onStarHoverOut(i, name, e)}
        >
          {this.renderIcon(i, value, name, id)}
        </label>
      );

      starNodes.push(starNodeLabel);
    }

    return starNodes.length ? starNodes : null;
  }

  renderIcon(index, value, name, id) {
    const {
      renderStarIcon,
      renderStarIconHalf,
      renderEmptyStarIcon
    } = this.props;

    if (
      typeof renderStarIconHalf === 'function' &&
      Math.ceil(value) === index &&
      value % 1 !== 0
    ) {
      return renderStarIconHalf(index, value, name, id);
    }

    if (typeof renderStarIcon === 'function' && index > value) {
      return renderEmptyStarIcon(index, value, name, id);
    }

    if (typeof renderStarIcon === 'function') {
      return renderStarIcon(index, value, name, id);
    }

    return (
      <i key={`icon_${id}`} style={{ fontStyle: 'normal' }}>
        &#9733;
      </i>
    );
  }

  render() {
    const { editing, className } = this.props;
    const classes = cx(
      'dv-star-rating',
      {
        'dv-star-rating-non-editable': !editing
      },
      className
    );

    return (
      <div
        style={{ display: 'inline-block', position: 'relative' }}
        className={classes}
      >
        {this.renderStars()}
      </div>
    );
  }
}

export default StarRatingComponent;
