import copy from "copy-to-clipboard";
import { LinkIcon, RestoreIcon } from "outline-icons";
import * as React from "react";
import { matchPath } from "react-router-dom";
import stores from "~/stores";
import { createAction } from "~/actions";
import { RevisionSection } from "~/actions/sections";
import history from "~/utils/history";
import { documentHistoryUrl, matchDocumentHistory } from "~/utils/routeHelpers";

console.log(`173_app/actions/definitions/revisions.tsx`);

export const restoreRevision = createAction({
  name: ({ t }) => t("Restore revision"),
  icon: <RestoreIcon />,
  section: RevisionSection,
  visible: ({ activeDocumentId, stores }) =>
    !!activeDocumentId && stores.policies.abilities(activeDocumentId).update,
  perform: async ({ t, event, location, activeDocumentId }) => {
    console.log(
      `174_app/actions/definitions/revisions.tsx_restoreRevisionPerform`
    );
    event?.preventDefault();
    if (!activeDocumentId) {
      return;
    }

    const match = matchPath<{ revisionId: string }>(location.pathname, {
      path: matchDocumentHistory,
    });
    const revisionId = match?.params.revisionId;

    const { team } = stores.auth;
    const document = stores.documents.get(activeDocumentId);
    if (!document) {
      return;
    }

    if (team?.collaborativeEditing) {
      history.push(document.url, {
        restore: true,
        revisionId,
      });
    } else {
      await document.restore({
        revisionId,
      });
      stores.toasts.showToast(t("Document restored"), {
        type: "success",
      });
      history.push(document.url);
    }
  },
});

export const copyLinkToRevision = createAction({
  name: ({ t }) => t("Copy link"),
  icon: <LinkIcon />,
  section: RevisionSection,
  perform: async ({ activeDocumentId, stores, t }) => {
    console.log(
      `175_app/actions/definitions/revisions.tsx_copyLinkToRevisionPerform`
    );
    if (!activeDocumentId) {
      return;
    }

    const match = matchPath<{ revisionId: string }>(location.pathname, {
      path: matchDocumentHistory,
    });
    const revisionId = match?.params.revisionId;
    const document = stores.documents.get(activeDocumentId);
    if (!document) {
      return;
    }

    const url = `${window.location.origin}${documentHistoryUrl(
      document,
      revisionId
    )}`;

    copy(url, {
      format: "text/plain",
      onCopy: () => {
        stores.toasts.showToast(t("Link copied"), {
          type: "info",
        });
      },
    });
  },
});

export const rootRevisionActions = [];
