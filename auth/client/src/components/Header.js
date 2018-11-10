import React from 'react';
import {connect} from 'react-redux';
import { Link } from 'react-router-dom';
import './headerStyle.css';

class Header extends React.Component {
  renderLinks = () => {
    if (this.props.authenticated) {
      return (
        <div>
          <Link to='/feature'>Feature</Link>
          <Link to='/signout'>Sign out</Link>
        </div>
      )
    } else {
      return (
        <div>
          <Link to='/signup'>Sign up</Link>
          <Link to='/signin'>Sign in</Link>
        </div>
      )
    }
  }

  render () {
    return (
      <div className='header'>
        <Link to='/'>Redux Auth</Link>
        {this.renderLinks()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {authenticated: state.auth. authenticated};
}


export default connect(mapStateToProps, {})(Header);
