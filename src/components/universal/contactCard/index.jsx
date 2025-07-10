import { Component } from 'react';
import PropTypes from 'prop-types';
import DesktopView from './desktop';
import MobileView from './mobile';

export default class ContactCard extends Component {
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
          <MobileView page={this.props.page} />
          :
          <DesktopView page={this.props.page} />
        }
      </>
    );
  }
}

ContactCard.propTypes = {
  page: PropTypes.string,
};
