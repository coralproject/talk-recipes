import React from 'react';
import styles from './SubscriberBadge.css';
import {t} from 'plugin-api/beta/client/services';

const isStaff = (tags = []) => tags.some((t) => t.tag.name === 'STAFF');

export default ({comment}) => !isStaff(comment.tags) ? (
  <span className={styles.badge}>
    {t('talk-plugin-subscriber.subscriber')}
  </span>
) : null;
