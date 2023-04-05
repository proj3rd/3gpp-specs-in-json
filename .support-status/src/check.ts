import { existsSync, writeFileSync } from "fs";
import { getSpec } from "get-3gpp-spec/dist/lib";
import { parse, resolve } from "path";

type SupportStatus = {
  date: string;
  specNumber: string;
  version: string;
  asn1?: boolean;
  tabular?: boolean;
};

const WILD_CARD = "*";

const SPEC_NUMBER_LIST = [
  "36.331",
  "36.413",
  "36.423",
  "37.355",
  "37.483",
  "38.331",
  "38.413",
  "38.423",
  "38.455",
  "38.463",
  "38.473",
];

async function main() {
  const supportStatusList: SupportStatus[] = [];
  for (const specNumber of SPEC_NUMBER_LIST) {
    (await getSpec(specNumber, WILD_CARD, WILD_CARD)).forEach(
      ({ name, date }) => {
        const series = `${specNumber.substring(0, 2)}-series`;
        const specNumberNoDot = `${specNumber.substring(
          0,
          2
        )}${specNumber.substring(3)}`;
        const { year, quarter } = getYearQuarter(date);
        const dateString = `${year}.Q${quarter}`;
        const { name: version } = parse(name);
        const supportStatus = supportStatusList.find(
          (supportStatus) =>
            supportStatus.date === dateString &&
            supportStatus.specNumber === specNumber &&
            supportStatus.version === version
        );
        const asn1 = existsSync(
          resolve(
            __dirname,
            `../../${series}/${specNumberNoDot}/${version}.asn1.json`
          )
        );
        const tabular = existsSync(
          resolve(
            __dirname,
            `../../${series}/${specNumberNoDot}/${version}.tabular.json`
          )
        );
        if (supportStatus) {
          supportStatus.asn1 = asn1;
          supportStatus.tabular = tabular;
          return;
        }
        supportStatusList.push({
          date: dateString,
          specNumber,
          version,
          asn1,
          tabular,
        });
      }
    );
  }
  writeFileSync(
    resolve(__dirname, "../support-status.json"),
    JSON.stringify(supportStatusList)
  );
}

main();

function getYearQuarter(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  if (month <= 2) {
    return { year: year - 1, quarter: 4 };
  }
  if (month <= 5) {
    return { year, quarter: 1 };
  }
  if (month <= 8) {
    return { year, quarter: 2 };
  }
  if (month <= 11) {
    return { year, quarter: 3 };
  }
  return { year, quarter: 4 };
}
