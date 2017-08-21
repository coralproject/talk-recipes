import React from 'react';
import {t} from 'plugin-api/beta/client/services';
import Tooltip from './Tooltip';
import styles from './AuthorName.css';

export default ({props: {comment}, state: {tooltip}, showTooltip, hideTooltip}) => { 
  return (
    <span 
      className={styles.authorNameContainer}
      onMouseEnter={showTooltip}
      onMouseLeave={hideTooltip} >

      <span className={styles.authorName}>
        {comment.user.username}
      </span>
      
      {tooltip && <Tooltip memberSinceDate={comment.user.created_at} />}
    </span>
  );
};
