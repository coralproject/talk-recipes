import React from 'react';
import AuthorName from '../components/AuthorName';
import {gql} from 'react-apollo';
import {withFragments} from 'plugin-api/beta/client/hocs';

class AuthorNameContainer extends React.Component {
  constructor() {
    super();

    this.state = {
      tooltip: false
    };

  }

  showTooltip = () => {
    this.setState({
      tooltip: true
    })
  }

  hideTooltip = () => {
    this.setState({
      tooltip: false
    })
  }

  render() {
    return <AuthorName 
      {...this}
    />;
  }
}

const enhance = withFragments({
    comment: gql`
      fragment TalkAuthorName_AuthorName_comment on Comment {
        user {
          id
          username
          created_at
        }
      }`
  });
  
  export default enhance(AuthorNameContainer);
