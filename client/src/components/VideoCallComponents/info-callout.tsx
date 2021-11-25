import {
  Callout,
  ICalloutProps,
  mergeStyleSets,
  FontSizes,
  FontWeights,
  Link,
  Label,
} from '@fluentui/react';
import React from 'react';
import { useRecoilValue } from 'recoil';
import { roomState } from 'atoms';

const callout = mergeStyleSets({
  container: {
    padding: '1em',
  },
  title: {
    fontSize: '1.75em',
    fontWeight: FontWeights.semilight,
    margin: '0',
  },
  secondaryTitle: {
    fontSize: '1em',
    fontWeight: FontWeights.semilight,
    margin: '.25em 0',
  },
  body: {
    margin: '.5em 0',
  },
  footer: {
    fontSize: FontSizes.smallPlus,
    marginTop: '2em',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'space-between',
  },
});

interface MyCalloutProps {
  showFooter?: boolean;
}

const MyCallout: React.FC<ICalloutProps & MyCalloutProps> = ({
  showFooter,
  ...props
}) => {
  const room = useRecoilValue(roomState);
  const link = `${window.location.origin}/room/${room?.id}`;
  return (
    <Callout
      className={callout.container}
      role="dialog"
      calloutMaxWidth={400}
      {...props}>
      <h1 className={callout.title}>{room?.name}</h1>
      <h2 className={callout.secondaryTitle}>
        Room created by {room?.created_by || '<Enter your name next time>'}
      </h2>
      <h2 className={callout.secondaryTitle}>
        ID: <Label>{room?.id}</Label>
      </h2>
      <div className={callout.body}>
        You can invite people directly to this chat by sharing this link{' '}
        <Label>{link}</Label>
      </div>
      {showFooter && (
        <div className={callout.footer}>
          <span>
            Mooz by{' '}
            <Link
              href="https://github.com/muzam1l"
              target="_blank"
              rel="nofollow noreferrer noopener">
              muzam1l
            </Link>
          </span>
          <Link
            href="https://github.com/muzam1l/mooz"
            target="_blank"
            rel="nofollow noreferrer noopener">
            Fork me on GitHub
          </Link>
        </div>
      )}
    </Callout>
  );
};

export default MyCallout;
