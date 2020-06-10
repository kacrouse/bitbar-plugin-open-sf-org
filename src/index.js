#!/usr/bin/env /usr/local/bin/node
import bitbar from "bitbar";
import templateImage from /* preval */ "./get-template-image";
import { findExecutable } from "./util";
import { getOrgs } from "./salesforce";

const sfdx = findExecutable("sfdx");
const orgs = getOrgs();

bitbar([
  {
    templateImage,
    text: "",
  },
  bitbar.separator,
  ...(orgs.length > 0
    ? orgs.map((org) => ({
        text: org.alias || org.username,
        bash: sfdx,
        param1: "force:org:open",
        param2: "--targetusername",
        param3: org.username,
        terminal: false,
      }))
    : [
        "No orgs found. To see orgs here, create or authenticate one with the Salesforce CLI.",
      ]),
]);
