import React, { useCallback } from 'react';
import { Panel, Pivot, PivotItem, Stack } from '@fluentui/react';
import type { IRenderFunction, IPanelProps } from '@fluentui/react';
import ChatPanel from './chat';
import PeoplePanel from './people';
import {
  fluid,
  heading,
  panelStyles,
  pivotContainer,
  pivotStyles,
} from './styles';

type IPanelHeaders = 'people' | 'chat' | '';

interface SidePanelProps {
  onDismiss: () => void;
  panel: IPanelHeaders;
  setPanel: (arg0: IPanelHeaders) => void;
}

const SidePanel: React.FunctionComponent<SidePanelProps> = ({
  panel,
  onDismiss,
  setPanel,
}) => {
  const title = panel && panel[0].toLocaleUpperCase() + panel.slice(1);
  const onRenderNavigationContent: IRenderFunction<IPanelProps> = useCallback(
    (props, defaultRender) => (
      <Stack className={fluid} horizontal horizontalAlign="space-between">
        <h1 className={heading}>{title}</h1>
        {defaultRender?.(props)}
      </Stack>
    ),
    [title],
  );
  return (
    <div>
      <Panel
        styles={panelStyles}
        onRenderNavigationContent={onRenderNavigationContent}
        isHiddenOnDismiss
        // This prop makes the panel non-modal
        isBlocking={false}
        isOpen={Boolean(panel)}
        onDismiss={onDismiss}
        closeButtonAriaLabel="Close"
        isFooterAtBottom // For gull height
      >
        <Pivot
          selectedKey={panel}
          onLinkClick={(item) => {
            const key = item?.props.itemKey as IPanelHeaders;
            if (key) setPanel(key);
          }}
          className={pivotContainer}
          styles={pivotStyles}
          aria-label="Switch between Chat and People list">
          <PivotItem
            alwaysRender
            itemKey="people"
            itemIcon="People"
            headerText="People">
            <PeoplePanel />
          </PivotItem>
          <PivotItem
            alwaysRender
            itemKey="chat"
            itemIcon="Chat"
            headerText="Chat">
            <ChatPanel setPanel={setPanel} />
          </PivotItem>
        </Pivot>
      </Panel>
    </div>
  );
};

export default SidePanel;
