import { Component } from 'react';
import PropTypes from 'prop-types';
import DesktopView from './desktop'
import MobileView from './mobile'

export default class Header extends Component {
  static propTypes = {
    open: PropTypes.func,
  };
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth
    };
  }
  render() {
    return (
      <div style={{ zIndex: 2 }}>
        {
          this.state.width <= 768 ? 
          <MobileView />
          :
          <DesktopView />
        }
      </div>
    );
  }
}
