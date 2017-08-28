import React from 'react';
import SubscriberBadge from '../components/SubscriberBadge';
import {gql} from 'react-apollo';
import {withFragments} from 'plugin-api/beta/client/hocs';

const enhance = withFragments({
  comment: gql`
    fragment TalkSubscriberBadge_SubscriberBadge_comment on Comment {
      tags {
        tag {
          name
        }
      }
    }`
});
  
export default enhance(SubscriberBadge);
