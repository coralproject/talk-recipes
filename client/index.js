import UserAvatar from './containers/UserAvatar';
import {gql} from 'react-apollo';

export default {
  slots: {
    commentAvatar: [UserAvatar]
  },
  fragments: {
    CreateCommentResponse: gql`
      fragment TalkAvatar_CreateCommentResponse on CreateCommentResponse {
        comment {
          user {
            avatar
          }
        }
      }`,
    },
    mutations: {
    PostComment: ({variables}) => ({
      optimisticResponse: {
        createComment: {
          comment: {
            __typename: 'Comment',
            user: {
              avatar: null,
            },
          }
        },
      },
    })
  }
};
