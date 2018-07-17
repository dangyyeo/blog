
import React from 'react';
import classNames from 'classnames';
import styles from './index.less';

export default ({ className, links, quotes }) => {
  const clsString = classNames(styles.Footer, className);
  return (
    <div className={clsString}>
      {links && (
        <div className={styles.links}>
          {links.map(link => (
            <a key={link.key} target={link.blankTarget ? '_blank' : '_self'} href={link.href}>
              {link.title}
            </a>
          ))}
        </div>
      )}
      {quotes && <div className={styles.quotes}>{quotes}</div>}
    </div>
  );
};
