import { Table, TBody, TR, TD } from "oy-vey";
import * as React from "react";
import env from "@server/env";
import EmptySpace from "./EmptySpace";

const url = env.CDN_URL ?? env.URL;
const isCloudHosted = env.DEPLOYMENT === "hosted";

export default () => {
  return (
    <Table width="100%">
      <TBody>
        <TR>
          <TD>
            <EmptySpace height={40} />
            <img
              alt="Outline"
              src={
                isCloudHosted
                  ? `${url}/email/header-logo.png`
                  : "cid:header-image"
              }
              height="48"
              width="48"
            />
          </TD>
        </TR>
      </TBody>
    </Table>
  );
};
