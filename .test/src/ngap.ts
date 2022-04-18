import { assert } from "console";
import { Definitions } from "lib3rd/dist/ran3/classes/definitions";
import { TC } from "./types";

export const tcListNgap: TC[] = [
  {
    specNumbering: "38413",
    type: "tabular",
    versionFrom: "16.2.0",
    func: (def) => {
      if (!(def instanceof Definitions)) {
        return;
      }
      it("Handover Cause in HO Report (9.3.3.39) should point Cause (9.3.1.2)", function () {
        const defFound = def.findDefinition("9.3.3.39");
        assert(defFound);
        const elemFound = defFound?.elementList.find((elem) => {
          const { name } = elem;
          return name === "Handover Cause";
        });
        assert(elemFound);
        const tokenList = elemFound?.reference.trim().split(" ");
        assert(tokenList?.includes("9.3.1.2"));
      });
    },
  },
];
