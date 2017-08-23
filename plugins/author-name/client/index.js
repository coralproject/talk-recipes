import AuthorName from './containers/AuthorName';
import translations from './translations.yml';
import {gql} from 'react-apollo';

export default {
  translations,
  slots: {
    commentAuthorName: [AuthorName]
  },
  fragments: {
    CreateCommentResponse: gql`
      fragment TalkAuthorName_CreateCommentResponse on CreateCommentResponse {
        comment {
          user {
            created_at
          }
        }
      }`,
    },
    mutations: {
      PostComment: ({variables}) => ({
        optimisticResponse: {
          createComment: {
            comment: {
              user: {
                created_at: new Date(),
                __typename: 'User'
              },
              __typename: 'Comment'
            }
          },
        },
    })
  }
};
