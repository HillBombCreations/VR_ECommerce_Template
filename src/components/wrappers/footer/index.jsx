import { Component } from 'react';
import DesktopView from './desktop'
import MobileView from './mobile'

export default class Footer extends Component {
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
