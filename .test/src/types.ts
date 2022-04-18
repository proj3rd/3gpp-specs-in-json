import { Modules } from "lib3rd/dist/asn1/classes/modules";
import { Definitions } from "lib3rd/dist/ran3/classes/definitions";

export type TC = {
  specNumbering: string;
  type: string;
  versionFrom?: string;
  versionTo?: string;
  func: (def: Modules | Definitions | undefined) => void;
};
