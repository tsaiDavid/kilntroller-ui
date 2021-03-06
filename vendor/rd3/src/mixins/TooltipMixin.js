'use strict';

const React = require('react');

module.exports = {

  propTypes: {
    showTooltip: React.PropTypes.bool,
    tooltipFormat: React.PropTypes.func,
  },

  getDefaultProps() {
    return {
      showTooltip: true,
      tooltipFormat: (d) => String(d.yValue),
    };
  },

  getInitialState() {
    return {
      tooltip: {
        x: 0,
        y: 0,
        dangerousInnerHTML: '',
        show: false,
      },
      changeState: false,
    };
  },

  componentWillReceiveProps() {
    this.setState({
      changeState: false,
    });
  },

  onMouseOver(x, y, dataPoint) {
    if (!this.props.showTooltip) {
      return;
    }
    this.setState({
      tooltip: {
        x,
        y,
        dangerousInnerHTML: this.props.tooltipFormat.call(this, dataPoint),
        show: true,
        parentWidth: this.props.width,
      },
      changeState: true,
    });
  },

  onMouseLeave() {
    if (!this.props.showTooltip) {
      return;
    }
    this.setState({
      tooltip: {
        x: 0,
        y: 0,
        dangerousInnerHTML: '',
        show: false,
        parentWidth: this.props.width,
      },
      changeState: true,
    });
  },
};
