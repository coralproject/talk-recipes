import React from 'react';
import SubscriberBadge from '../components/SubscriberBadge';
import {compose, gql} from 'react-apollo';
import {withFragments, excludeIf} from 'plugin-api/beta/client/hocs';

const isStaff = (tags = []) => tags.some((t) => t.tag.name === 'STAFF');

const enhance = compose(
  withFragments({
    comment: gql`
      fragment TalkSubscriberBadge_SubscriberBadge_comment on Comment {
        tags {
          tag {
            name
          }
        }
      }`
  }),
  excludeIf(({comment}) => isStaff(comment.tags))
);
  
export default enhance(SubscriberBadge);
