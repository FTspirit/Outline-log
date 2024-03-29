import { m } from "framer-motion";
import { observer } from "mobx-react";
import { CloseIcon } from "outline-icons";
import * as React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useRouteMatch } from "react-router-dom";
import styled, { useTheme } from "styled-components";
import breakpoint from "styled-components-breakpoint";
import Event from "~/models/Event";
import Button from "~/components/Button";
import Empty from "~/components/Empty";
import Flex from "~/components/Flex";
import PaginatedEventList from "~/components/PaginatedEventList";
import Scrollable from "~/components/Scrollable";
import useKeyDown from "~/hooks/useKeyDown";
import useStores from "~/hooks/useStores";
import { documentUrl } from "~/utils/routeHelpers";

const EMPTY_ARRAY: Event[] = [];

function DocumentHistory() {
  const { events, documents } = useStores();
  const { t } = useTranslation();
  const match = useRouteMatch<{ documentSlug: string }>();
  const history = useHistory();
  const theme = useTheme();
  const document = documents.getByUrl(match.params.documentSlug);

  const eventsInDocument = document
    ? events.inDocument(document.id)
    : EMPTY_ARRAY;

  const onCloseHistory = () => {
    if (document) {
      history.push(documentUrl(document));
    } else {
      history.goBack();
    }
  };

  const items = React.useMemo(() => {
    if (
      eventsInDocument[0] &&
      document &&
      eventsInDocument[0].createdAt !== document.updatedAt
    ) {
      eventsInDocument.unshift(
        new Event(
          {
            id: "live",
            name: "documents.live_editing",
            documentId: document.id,
            createdAt: document.updatedAt,
            actor: document.updatedBy,
          },
          events
        )
      );
    }

    return eventsInDocument;
  }, [eventsInDocument, events, document]);

  useKeyDown("Escape", onCloseHistory);

  return (
    <Sidebar
      initial={{
        width: 0,
      }}
      animate={{
        transition: {
          type: "spring",
          bounce: 0.2,
          duration: 0.6,
        },
        width: theme.sidebarWidth,
      }}
      exit={{
        width: 0,
      }}
    >
      {document ? (
        <Position column>
          <Header>
            <Title>{t("History")}</Title>
            <Button
              icon={<CloseIcon />}
              onClick={onCloseHistory}
              borderOnHover
              neutral
            />
          </Header>
          <Scrollable topShadow>
            <PaginatedEventList
              aria-label={t("History")}
              fetch={events.fetchPage}
              events={items}
              options={{
                documentId: document.id,
              }}
              document={document}
              empty={<EmptyHistory>{t("No history yet")}</EmptyHistory>}
            />
          </Scrollable>
        </Position>
      ) : null}
    </Sidebar>
  );
}

const EmptyHistory = styled(Empty)`
  padding: 0 12px;
`;

const Position = styled(Flex)`
  position: fixed;
  top: 0;
  bottom: 0;
  width: ${(props) => props.theme.sidebarWidth}px;
`;

const Sidebar = styled(m.div)`
  display: none;
  position: relative;
  flex-shrink: 0;
  background: ${(props) => props.theme.background};
  width: ${(props) => props.theme.sidebarWidth}px;
  border-left: 1px solid ${(props) => props.theme.divider};
  z-index: 1;

  ${breakpoint("tablet")`
    display: flex;
  `};
`;

const Title = styled(Flex)`
  font-size: 16px;
  font-weight: 600;
  text-align: center;
  align-items: center;
  justify-content: flex-start;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
  width: 0;
  flex-grow: 1;
`;

const Header = styled(Flex)`
  align-items: center;
  position: relative;
  padding: 16px 12px;
  color: ${(props) => props.theme.text};
  flex-shrink: 0;
`;

export default observer(DocumentHistory);
