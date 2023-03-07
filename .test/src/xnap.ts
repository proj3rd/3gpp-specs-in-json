import { assert } from "console";
import { Definitions } from "lib3rd/dist/ran3/classes/definitions";
import { TC } from "./types";

export const tcListXnap: TC[] = [
  {
    specNumbering: "38423",
    type: "tabular",
    versionFrom: "15.2.0",
    func: (def) => {
      if (!(def instanceof Definitions)) {
        return;
      }
      it("SN UL PDCP UP TNL Information of PDU Session Resource Setup Response Info - SN terminated should refer 9.2.3.76", function () {
        const defFound = def.findDefinition("9.2.1.6");
        assert(defFound);
        const elemFound = defFound?.elementList.find((elem) => {
          const { name } = elem;
          return name === "SN UL PDCP UP TNL Information";
        });
        assert(elemFound);
        const tokenList = elemFound?.reference.trim().split(" ");
        assert(tokenList?.includes("9.2.3.76"));
      });
    },
  },
  {
    specNumbering: "38423",
    type: "tabular",
    versionFrom: "15.0.0",
    func: (def) => {
      if (!(def instanceof Definitions)) {
        return;
      }
      it("9.1.1.8 RETRIEVE UE CONTEXT REQUEST should exist", function () {
        const defFound = def.findDefinition("9.1.1.8");
        assert(defFound);
      });
    },
  },
  {
    specNumbering: "38423",
    type: "tabular",
    versionFrom: "15.0.0",
    func: (def) => {
      if (!(def instanceof Definitions)) {
        return;
      }
      it("9.1.1.9 RETRIEVE UE CONTEXT RESPONSE should exist", function () {
        const defFound = def.findDefinition("9.1.1.9");
        assert(defFound);
      });
    },
  },
  {
    specNumbering: "38423",
    type: "tabular",
    versionFrom: "15.0.0",
    func: (def) => {
      if (!(def instanceof Definitions)) {
        return;
      }
      it("9.1.1.10 RETRIEVE UE CONTEXT FAILURE should exist", function () {
        const defFound = def.findDefinition("9.1.1.10");
        assert(defFound);
      });
    },
  },
  {
    specNumbering: "38423",
    type: "tabular",
    versionFrom: "17.0.0",
    func: (def) => {
      if (!(def instanceof Definitions)) {
        return;
      }
      it("9.1.1.12 RETRIEVE UE CONTEXT CONFIRM should exist", function () {
        const defFound = def.findDefinition("9.1.1.12");
        assert(defFound);
      });
    },
  },
];
