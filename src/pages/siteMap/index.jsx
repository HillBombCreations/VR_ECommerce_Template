import { Component } from 'react';
import DesktopView from './desktop'
import MobileView from './mobile'

export default class SiteMap extends Component {
  constructor(props) {
    super(props)
    this.state = {
      width: window.innerWidth
    };
  }
  render() {
    return (
      <>
        {
          this.state.width <= 768 ? 
          <MobileView />
          :
          <DesktopView />
        }
      </>
    );
  }
}
