import assert from "assert";
import { Modules } from "lib3rd/dist/asn1/classes/modules";
import { Definitions } from "lib3rd/dist/ran3/classes/definitions";

type TC = {
  specNumbering: string;
  type: string;
  versionFrom?: string;
  versionTo?: string;
  func: (def: Modules | Definitions | undefined) => void;
};

export const tcList: TC[] = [
  {
    specNumbering: '38423', type: 'tabular', versionFrom: '15.2.0',
    func: (def) => {
      if (!(def instanceof Definitions)) { return ; }
      it('SN UL PDCP UP TNL Information of PDU Session Resource Setup Response Info - SN terminated should refer 9.2.3.76', function() {
        const defFound = def.findDefinition('9.2.1.6');
        assert(defFound);
        const elemFound = defFound.elementList.find((elem) => {
          const { name } = elem;
          return name === 'SN UL PDCP UP TNL Information';
        });
        assert(elemFound);
        const tokenList = elemFound.reference.trim().split(' ');
        assert(tokenList.includes('9.2.3.76'));
      });
    },
  },
  {
    specNumbering: '38455', type: 'tabular', versionFrom: '16.1.0',
    func: (def) => {
      if (!(def instanceof Definitions)) { return ; }
      it('9.2.26 should exists', function() {
        const defFound = def.findDefinition('9.2.26');
        assert(defFound);
      });
    },
  },
  {
    specNumbering: '38463', type: 'tabular', versionFrom: '15.2.0',
    func: (def) => {
      if (!(def instanceof Definitions)) { return ; }
      it('9.3.1.57 should exists', function() {
        const defFound = def.findDefinition('9.3.1.57');
        assert(defFound);
      });
    },
  },
  {
    specNumbering: '38463', type: 'tabular', versionFrom: '16.3.0',
    func: (def) => {
      if (!(def instanceof Definitions)) { return ; }
      it('Trace Collection Entity IP Address of CELL TRAFFIC TRACE should refer 9.3.2.4', function() {
        const defFound = def.findDefinition('CELL TRAFFIC TRACE');
        assert(defFound);
        const elemFound = defFound.elementList.find((elem) => {
          const { name } = elem;
          return name === 'Trace Collection Entity IP Address';
        });
        assert(elemFound);
        const tokenList = elemFound.reference.trim().split(' ');
        assert(tokenList.includes('9.3.2.4'));
      });
    },
  },
  {
    specNumbering: '38463', type: 'tabular', versionFrom: '16.2.0',
    func: (def) => {
      if (!(def instanceof Definitions)) { return ; }
      it('9.3.1.74 should exists', function() {
        const defFound = def.findDefinition('9.3.1.74');
        assert(defFound);
      });
    },
  },
];