import { useMemo } from "react";
import { ColDef, ColGroupDef } from "ag-grid-community";

export const columns: (ColDef | ColGroupDef)[] = [
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
        headerName: "Warnhinweise & Sicherheitsinformationen (z.B. für Kinder)",
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
        field: "emailAdresseOderURLDerInDerEUVerantwortlichenPersonZBMusterde",
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

const assets = [
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/png/-/1/-1000337296-220304-031-DETAILS-P000000001000337296.avif",
  "https://cdn1.home24.net/images/media/catalog/product/1700x1700/png/-/1/-1000337296-220304-020-MOOD-DETAILS-P000000001000337296-mood.avif",
];

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
    assets,
  },
];

for (let i = 0; i < 100; i++) {
  rows.push({
    lieferantenGlnIl: `1234567890123${i}`,
    artikelnummer: `1234567890${i}`,
    artikelname: `Test Artikel ${i}`,
    artikelEan: `1234567890123${i}`,
    uvp: `10${i}.00`,
    bestellwahrungLager: "EUR",
    einkaufspreisLager: "90.00",
    bestellwahrungKundeneinzelbestellung: "EUR",
    einkaufspreisKundeneinzelbestellung: "90.00",
    bestellwahrungStrecke: "EUR",
    einkaufspreisStrecke: "90.00",
    eigenversandfahig: "Ja",
    selfsenderkostenDe: "10.00",
    assets,
  });
}

export function useTemplateData(): {
  columnDefs: ColDef[];
  rowData: Record<string, unknown>[];
} {
  return { columnDefs: columns, rowData: rows };
}
