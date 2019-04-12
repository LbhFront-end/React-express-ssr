import React, { Component } from 'react';

class NotFound extends Component {

  componentWillMount() {
    const { staticContext } = this.props;
    staticContext && (staticContext.NOT_FOUNT = true);
  }
  render() {
    return <div>404,soory,page not found</div>
  }
}


export default NotFound;