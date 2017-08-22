import React from 'react';
import cn from 'classnames';
import styles from './Tooltip.css';
import {t} from 'plugin-api/beta/client/services';
import {Icon} from 'plugin-api/beta/client/components/ui';
import moment from 'moment';

export default ({className = '', memberSinceDate}) => (
  <div className={cn(styles.tooltip, className)}>
    <Icon name="date_range" className={styles.icon} />
    <span className={styles.memberSince}>
      {t('talk-plugin-author-name.member_since')}: {moment(memberSinceDate).format('MMMM DD, YYYY')}
    </span>
  </div>
);
