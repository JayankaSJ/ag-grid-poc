import { useMemo, useState } from "react";
import { ColDef, ColGroupDef } from "ag-grid-community";

function columnDataTranslation(
  column: ColDef | ColGroupDef | any
): ColDef | ColGroupDef {
  if (
    column.mainMenuItems &&
    Array.isArray(column.mainMenuItems) &&
    column.mainMenuItems.length > 0
  ) {
    // empty
  } else {
    column.suppressHeaderMenuButton = true;
    column.suppressHeaderFilterButton = true;
    column.suppressHeaderContextMenu = true;
  }
  if ((column as ColGroupDef).children) {
    (column as ColGroupDef).children.forEach((child) => {
      columnDataTranslation(child);
    });
  }
  return column;
}

const mainImages = [
  "https://cdn1.home24.net/images/media/catalog/product/1150x1150/png/-/1/-1000009867-180704-11253801-IMAGE-P000000001000009867.avif",
  "https://cdn1.home24.net/images/media/catalog/product/original/jpg/2/0/209745b3a35842f2bde66b7f3fb269f2.webp",
  "https://cdn1.home24.net/images/media/catalog/product/1150x1150/png/-/1/-1000449555-241009-010-IMAGE-P000000001000449555.avif",
];

const assets = [
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/png/-/1/-1000337296-220304-031-DETAILS-P000000001000337296.avif",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/png/-/1/-1000337296-220304-020-MOOD-DETAILS-P000000001000337296-mood.avif",
  "https://cdn1.home24.net/images/media/catalog/product/original/png/-/1/-1000383263-230418-011-MOOD-IMAGE-P000000001000383263-mood.webp",
  "https://cdn1.home24.net/images/media/catalog/product/original/png/-/1/-1000383263-230418-020-MOOD-DETAILS-P000000001000383263-mood.webp",
  "https://cdn1.home24.net/images/media/catalog/product/original/png/-/1/-1000368996-221108-010-IMAGE-P000000001000368996.webp",
  "https://cdn1.home24.net/images/media/catalog/product/original/png/-/1/-1000368996-240408-020-MOOD-DETAILS-P000000001000368996-mood.webp",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/png/d/r/drehtuerenschrank-hildesheim-alpinweiss-ohne-spiegeltuer-en-4842908.avif",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/png/-/1/-1000121611-220909-600-ICON-DETAILS-P000000001000121611-icon-seal.avif",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/jpg/a/5/a5ce4669c0c841da8a1d81824398d3e7.avif",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/jpg/a/4/a492b6c0edb849b6bdffd8b4892018cc.avif",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/png/-/1/-1000123836-190916-13150900017-DETAILS-P000000001000123836.avif",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/png/-/1/-1000123836-190916-13150900021-DETAILS-P000000001000123836.avif",
  ...mainImages,
];

function getRandomizedAssets(): string[] {
  const randomAssets: string[] = [];
  const randomCount = Math.floor(Math.random() * assets.length) + 1;
  const randomIndices = new Set<number>();
  while (randomIndices.size < randomCount) {
    const randomIndex = Math.floor(Math.random() * assets.length);
    randomIndices.add(randomIndex);
  }
  randomIndices.forEach((index) => {
    randomAssets.push(assets[index]);
  });

  // add some duplicated between 10 -20
  const duplicatesCount = Math.floor(Math.random() * 10) + 10;
  for (let i = 0; i < duplicatesCount; i++) {
    const randomIndex = Math.floor(Math.random() * randomAssets.length);
    randomAssets.push(randomAssets[randomIndex]);
  }

  return randomAssets as string[];
}

export const rows = [
  {
    lieferantenGlnIl: "1234567890123",
    artikelnummer: "1234567890",
    artikelname: "Test Artikel",
    artikelEan: "1234567890123",
    uvp: "100.00",
    bestellwahrungLager: "EUR",
    einkaufspreisLager: "90.00",
    bestellwahrungKundeneinzelbestellung: "EUR",
    einkaufspreisKundeneinzelbestellung: "90.00",
    bestellwahrungStrecke: "EUR",
    einkaufspreisStrecke: "90.00",
    eigenversandfahig: "Ja",
    selfsenderkostenDe: "10.00",

    selfsenderkostenFr: "10.00",
    selfsenderkostenNl: "10.00",
    selfsenderkostenAt: "10.00",
    selfsenderkostenCh: "10.00",
    selfsenderkostenBe: "10.00",
    selfsenderkostenIt: "10.00",
    artMindesbestellmenge: "1",
    wertMindestbestellmengeWert: "100.00",
    warungMindestbestellwert: "EUR",
    anzahlTeileImSet: "1",
    bereitstellungszeitTage: "1",
    serialnummernpflichtig: "Ja",
    warengruppe1: "Warengruppe 1",
    warengruppe2: "Warengruppe 2",
    warengruppe3: "Warengruppe 3",
    warengruppe4: "Warengruppe 4",
    zimmertyp: "Zimmertyp",
    typTextil: "Typ Textil",
    typMöbelzubehör: "Typ Möbelzubehör",
    Marke: "Marke",
    Serie: "Serie",
    Designer: "Designer",
    herstellergarantieJahre: "2",
    lieferumfang: "Lieferumfang",
    lieferzustand: "Lieferzustand",
    ersatzteileLieferbar: "Ja",
    pflegehinweis: "Pflegehinweis",
    montage: "Montage",
    warnhinweiseSicherheitsinformationenZBFürKinder:
      "Warnhinweise & Sicherheitsinformationen (z.B. für Kinder)",
    "zertifikateZBGSCE TÜV": "Zertifikate (z.B. GS, CE, TÜV)",
    "prüfinstitutZBTÜV RheinlandSGS Intertek":
      "Prüfinstitut (z.B. TÜV Rheinland, SGS, Intertek)",

    assets,
  },
];

for (let i = 0; i < 100; i++) {
  let lieferantenGlnIl = `1234567890123${i}`;
  let artikelEan = `1234567890123${i}`;

  if (Math.random() > 0.5) {
    lieferantenGlnIl = "";
  }
  if (Math.random() > 0.5) {
    artikelEan = "";
  }

  rows.push({
    lieferantenGlnIl,
    artikelnummer: `1234567890${i}`,
    artikelname: `Test Artikel ${i}`,
    artikelEan,
    uvp: `10${i}.00`,
    bestellwahrungLager: "EUR",
    einkaufspreisLager: "90.00",
    bestellwahrungKundeneinzelbestellung: "EUR",
    einkaufspreisKundeneinzelbestellung: "90.00",
    bestellwahrungStrecke: "EUR",
    einkaufspreisStrecke: "90.00",
    eigenversandfahig: "Ja",
    selfsenderkostenDe: "10.00",

    selfsenderkostenFr: "10.00",
    selfsenderkostenNl: "10.00",
    selfsenderkostenAt: "10.00",
    selfsenderkostenCh: "10.00",
    selfsenderkostenBe: "10.00",
    selfsenderkostenIt: "10.00",
    artMindesbestellmenge: "1",
    wertMindestbestellmengeWert: "100.00",
    warungMindestbestellwert: "EUR",
    anzahlTeileImSet: "1",
    bereitstellungszeitTage: "1",
    serialnummernpflichtig: "Ja",
    warengruppe1: `Warengruppe 1 ${i}`,
    warengruppe2: `Warengruppe 2 ${i}`,
    warengruppe3: `Warengruppe 3 ${i}`,
    warengruppe4: `Warengruppe 4 ${i}`,
    zimmertyp: `Zimmertyp ${i}`,
    typTextil: `Typ Textil ${i}`,
    typMöbelzubehör: `Typ Möbelzubehör ${i}`,
    Marke: `Marke ${i}`,
    Serie: `Serie ${i}`,
    Designer: `Designer ${i}`,
    herstellergarantieJahre: `${i}`,
    lieferumfang: `Lieferumfang ${i}`,
    lieferzustand: `Lieferzustand ${i}`,
    ersatzteileLieferbar: "Ja",
    pflegehinweis: `Pflegehinweis ${i}`,
    montage: `Montage ${i}`,
    warnhinweiseSicherheitsinformationenZBFürKinder: `Warnhinweise & Sicherheitsinformationen (z.B. für Kinder) ${i}`,
    "zertifikateZBGSCE TÜV": `Zertifikate (z.B. GS, CE, TÜV) ${i}`,
    "prüfinstitutZBTÜV RheinlandSGS Intertek": `Prüfinstitut (z.B. TÜV Rheinland, SGS, Intertek) ${i}`,

    assets: getRandomizedAssets(),
  });
}

export function useTemplateData(): {
  columnDefs: ColDef[];
  rowData: Record<string, unknown>[];
} {
  const [rowData, setRowData] = useState(rows);

  const columnDefs = useMemo(() => {
    const columns: (ColDef | ColGroupDef)[] = [
      {
        headerName: "Medal Details",
        children: [
          {
            headerName: "Lieferanten GLN/ILN",
            field: "lieferantenGlnIl",
            type: "text",
            editable: true,
            pinned: "left",
            width: 170,
            cellRenderer: "agGroupCellRenderer",
            sortable: true,
            mainMenuItems: [
              {
                name: "Apply 'Keine GLN vorhanden' for empty",
                action: () => {
                  setRowData((prevRowData) => {
                    const newRowData = [...prevRowData];
                    return newRowData.map((row) => {
                      if (row.lieferantenGlnIl === "") {
                        return {
                          ...row,
                          lieferantenGlnIl: "Keine GLN vorhanden",
                        };
                      }
                      return row;
                    });
                  });
                  return true;
                },
              },
              "autoSizeThis",
            ],
          },
          {
            headerName: "Artikelnummer",
            field: "artikelnummer",
            type: "text",
            editable: true,
            pinned: "left",
            width: 140,
          },
          {
            headerName: "Artikelname",
            field: "artikelname",
            type: "text",
            editable: true,
            pinned: "left",
            width: 120,
          },
          {
            headerName: "Artikel EAN",
            field: "artikelEan",
            type: "text",
            editable: true,
            sortable: true,
            filter: "agSetColumnFilter",
            // filterParams: defaultFilterParams,
            mainMenuItems: [
              {
                name: "Apply 'Keine EAN vorhanden' for empty",
                action: () => {
                  setRowData((prevRowData) => {
                    const newRowData = [...prevRowData];
                    return newRowData.map((row) => {
                      if (row.artikelEan === "") {
                        return {
                          ...row,
                          artikelEan: "Keine EAN vorhanden",
                        };
                      }
                      return row;
                    });
                  });
                  return true;
                },
              },
              "autoSizeThis",
            ],
          },
          {
            headerName: "UVP",
            field: "uvp",
            type: "text",
            editable: true,
          },
          {
            headerName: "Bestellwährung Lager",
            field: "bestellwahrungLager",
            type: "text",
            editable: true,
          },
          {
            headerName:
              "Einkaufspreis Lager Immer Fakturapreise; auszufüllen, wenn Lagerware",
            field: "einkaufspreisLager",
            type: "text",
            editable: true,
          },
          {
            headerName: "Bestellwährung Kundeneinzelbestellung",
            field: "bestellwahrungKundeneinzelbestellung",
            type: "text",
            editable: true,
          },
          {
            headerName:
              "Einkaufspreis Kundeneinzelbestellung Immer Fakturapreise; auszufüllen, wenn Hersteller die Lieferung über das home24 Lager abwickelt",
            field:
              "Einkaufspreis Kundeneinzelbestellung Immer Fakturapreise; auszufüllen, wenn Hersteller die Lieferung über das home24 Lager abwickelt",
            type: "text",
            editable: true,
          },
          {
            headerName: "Bestellwährung Strecke",
            field: "bestellwahrungStrecke",
            type: "text",
            editable: true,
          },
          {
            headerName:
              "Einkaufspreis Strecke Immer Fakturapreise; auszufüllen, wenn Hersteller Ware selber versendet",
            field:
              "Einkaufspreis Strecke Immer Fakturapreise; auszufüllen, wenn Hersteller Ware selber versendet",
            type: "text",
            editable: true,
          },
          {
            headerName: "Eigenversandfähig",
            field: "eigenversandfahig",
            type: "text",
            editable: true,
          },
          {
            headerName: "Selfsenderkosten DE",
            field: "selfsenderkostenDe",
            type: "text",
            editable: true,
          },
          {
            headerName: "Selfsenderkosten FR",
            field: "selfsenderkostenFr",
            type: "text",
            editable: true,
          },
          {
            headerName: "Selfsenderkosten NL",
            field: "selfsenderkostenNl",
            type: "text",
            editable: true,
          },
          {
            headerName: "Selfsenderkosten AT",
            field: "selfsenderkostenAt",
            type: "text",
            editable: true,
          },
          {
            headerName: "Selfsenderkosten CH",
            field: "selfsenderkostenCh",
            type: "text",
            editable: true,
          },
          {
            headerName: "Selfsenderkosten BE",
            field: "selfsenderkostenBe",
            type: "text",
            editable: true,
          },
          {
            headerName: "Selfsenderkosten IT",
            field: "selfsenderkostenIt",
            type: "text",
            editable: true,
          },
          {
            headerName: "Art Mindesbestellmenge",
            field: "artMindesbestellmenge",
            type: "text",
            editable: true,
          },
          {
            headerName: "Wert Mindestbestellmenge/-wert",
            field: "wertMindestbestellmengeWert",
            type: "text",
            editable: true,
          },
          {
            headerName: "Währung Mindestbestellwert",
            field: "wahrungMindestbestellwert",
            type: "text",
            editable: true,
          },
          {
            headerName: "Anzahl Teile im Set",
            field: "anzahlTeileImSet",
            type: "text",
            editable: true,
          },
          {
            headerName: "Bereitstellungszeit (Tage)",
            field: "bereitstellungszeitTage",
            type: "text",
            editable: true,
          },
          {
            headerName: "Serialnummernpflichtig",
            field: "serialnummernpflichtig",
            type: "text",
            editable: true,
          },
          {
            headerName: "Warengruppe 1",
            field: "warengruppe1",
            type: "text",
            editable: true,
          },
          {
            headerName: "Warengruppe 2",
            field: "warengruppe2",
            type: "text",
            editable: true,
          },
          {
            headerName: "Warengruppe 3",
            field: "warengruppe3",
            type: "text",
            editable: true,
          },
          {
            headerName: "Warengruppe 4",
            field: "warengruppe4",
            type: "text",
            editable: true,
          },
        ],
      },
      {
        headerName: "Zimmertyp",
        field: "zimmertyp",
        type: "text",
        editable: true,
      },
      {
        headerName: "Typ Textil",
        field: "Typ Textil",
        type: "text",
        editable: true,
      },
      {
        headerName: "Typ Möbelzubehör",
        field: "Typ Möbelzubehör",
        type: "text",
        editable: true,
      },
      {
        headerName: "Generelle Produktinfos",
        children: [
          {
            headerName: "Marke",
            field: "Marke",
            type: "text",
            editable: true,
          },
          {
            headerName: "Serie",
            field: "Serie",
            type: "text",
            editable: true,
          },
          {
            headerName: "Designer",
            field: "Designer",
            type: "text",
            editable: true,
          },
          {
            headerName: "Herstellergarantie (Jahre)",
            field: "herstellergarantieJahre",
            type: "text",
            editable: true,
          },
          {
            headerName: "Lieferumfang",
            field: "lieferumfang",
            type: "text",
            editable: true,
          },
          {
            headerName: "Lieferzustand",
            field: "lieferzustand",
            type: "text",
            editable: true,
          },
          {
            headerName: "Ersatzteile lieferbar",
            field: "ersatzteileLieferbar",
            type: "text",
            editable: true,
          },
          {
            headerName: "Pflegehinweis",
            field: "pflegehinweis",
            type: "text",
            editable: true,
          },
          {
            headerName: "Montage",
            field: "montage",
            type: "text",
            editable: true,
          },
          {
            headerName:
              "Warnhinweise & Sicherheitsinformationen (z.B. für Kinder)",
            field: "warnhinweiseSicherheitsinformationenZBFürKinder",
            type: "text",
            editable: true,
          },
          {
            headerName: "Zertifikate (z.B. GS, CE, TÜV)",
            field: "zertifikateZBGSCE TÜV",
            type: "text",
            editable: true,
          },
          {
            headerName: "Prüfinstitut (z.B. TÜV Rheinland, SGS, Intertek)",
            field: "prüfinstitutZBTÜV RheinlandSGS Intertek",
            type: "text",
            editable: true,
          },
          {
            headerName: "Prüfnummer",
            field: "prüfnummer",
            type: "text",
            editable: true,
          },
          {
            headerName: "Qualitätsmerkmale (z.B. Öko-Tex, FSC)",
            field: "qualitatsmerkmaleZBÖkoTexFSC",
            type: "text",
            editable: true,
          },
          {
            headerName: "Exklusivität",
            field: "exklusivitat",
            type: "text",
            editable: true,
          },
          {
            headerName: "Content Cluster",
            field: "contentCluster",
            type: "text",
            editable: true,
          },
          {
            headerName: "USP",
            field: "usp",
            type: "text",
            editable: true,
          },
          {
            headerName: "Name des Hersteller",
            field: "nameDesHersteller",
            type: "text",
            editable: true,
          },
          {
            headerName:
              "Postanschrift des Herstellers (z.B. Musterstraße 1, 12345 Musterstadt)",
            field: "postanschriftDesHerstellerZBMusterstraße1,12345Musterstadt",
            type: "text",
            editable: true,
          },
          {
            headerName:
              "E-Mail-Adresse oder URL des Herstellers (z.B. www.muster.de)",
            field: "emailAdresseOderURLDesHerstellerZBMusterde",
            type: "text",
            editable: true,
          },
          {
            headerName:
              "Name der in der EU verantwortlichen Person (z.B. Max Mustermann)",
            field: "nameDerInDerEUVerantwortlichenPersonZBMaxMustermann",
            type: "text",
            editable: true,
          },
          {
            headerName:
              "Postanschrift der in der EU verantwortlichen Person (z.B. Musterstraße 1, 12345 Musterstadt)",
            field:
              "postanschriftDerInDerEUVerantwortlichenPersonZBMusterstraße1,12345Musterstadt",
            type: "text",
            editable: true,
          },
          {
            headerName:
              "E-Mail-Adresse oder URL der in der EU verantwortlichen Person (z.B. www.muster.de)",
            field:
              "emailAdresseOderURLDerInDerEUVerantwortlichenPersonZBMusterde",
            type: "text",
            editable: true,
          },
        ],
      },
      {
        headerName: "Packstückdaten",
        children: [
          {
            headerName: "Gesamtzahl aller Packstücke",
            field: "gesamtzahlAllerPackstucke",
            type: "text",
            editable: true,
          },
          {
            headerName: "Packstückbezeichnung",
            field: "packstuckbezeichnung",
            type: "text",
            editable: true,
          },
          {
            headerName: "Häufigkeit des Packstücks",
            field: "haufigkeitDesPackstucks",
            type: "text",
            editable: true,
          },
          {
            headerName: "Packstück EAN",
            field: "packstuckEan",
            type: "text",
            editable: true,
          },
          {
            headerName: "Länge des Packstücks (cm)",
            field: "langeDesPackstucksCm",
            type: "text",
            editable: true,
          },
          {
            headerName: "Breite des Packstücks (cm)",
            field: "breiteDesPackstucksCm",
            type: "text",
            editable: true,
          },
          {
            headerName: "Höhe des Packstücks (cm)",
            field: "hoheDesPackstucksCm",
            type: "text",
            editable: true,
          },
          {
            headerName:
              "Bruttogewicht des Packstücks (kg) Immer in kg angeben, auch wenn die Einheit g ist.",
            field:
              "bruttogewichtDesPackstucksKgImmerInKgAngebenAuchWennDieEinheitGIst",
            type: "text",
            editable: true,
          },
          {
            headerName:
              "Nettogewicht des Packstücks (kg) Immer in kg angeben, auch wenn die Einheit g ist.",
            field:
              "nettogewichtDesPackstucksKgImmerInKgAngebenAuchWennDieEinheitGIst",
            type: "text",
            editable: true,
          },
          {
            headerName: "Form des Packstücks",
            field: "formDesPackstucks",
            type: "text",
            editable: true,
          },
          {
            headerName:
              "Art Umverpackung z.B. Karton, Folie, Palette, etc. Bitte keine Verpackungsmaße angeben.",
            field:
              "artUmverpackungZBKartonFoliePaletteEtcBitteKeineVerpackungsmasseAngeben",
            type: "text",
            editable: true,
          },
        ],
      },
    ];

    return columns.map((column) => columnDataTranslation(column));
  }, []);

  return { columnDefs, rowData };
}
