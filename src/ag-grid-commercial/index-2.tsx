/*
Supplier GLN/ILN	Article Number	Article Name	Article EAN	RRP	Warehouse order currency	Warehouse purchase	Customer individual order currency	Customer individual order purchase price	Dropshipping order currency	Dropshipping purchase price	Self Sender Capable	Self Sender Costs DE	Self Sender Costs FR	Self Sender Costs NL	Self Sender Costs AT	Self Sender Costs CH	Self Sender Costs BE	Self Sender Costs IT	Type Min Order Qty	Value Min Order Qty	Min Order Value Currency	Number of Parts in Set	 Delivery time to H24 (days)	Serial number obligatory	Incoterms	Product Group 1	Product Group 2	Product Group 3	Product Group 4	Brand	Series	Designer	Supplier Warranty (Years) 	Delivery Scope	Delivery Condition	Spare parts deliverable	Care Instructions	Installation	Warnings and Safety Information	Certificates	Testing Institute	Test Number	Quality Attributes	Exclusivity	Content Cluster	USP	Name of Manufacturer	Postal Address of the Manufacturer	Email Address of the Manufacturer	Name of the Person Responsible in EU	Postal Address of the Person Responsible in EU	Email Address of the Person Responsible in EU	Total number of packages	Package Indication	Frequency of this type of package	Package EAN	Length of package (cm)	c	Height of package (cm)	Package gross weight (kg)	Package net weight (kg)	Package form	Type overpack
1	2	29	3	4	5	6	7	8	9	10	11	12	13	14	15	16	17	18	19	20	21	22	32	33	34	23	24	25	30	101	102	103	104	105	106	107	108	112	476	113	380	381	114	706	439	438	470	471	472	473	474	475	601	602	603	604	605	606	607	608	609	610	611
*/

/*

2	29	3	4	5	6	7	8	9	10	11	12	13	14	15	16	17	18	19	20	21	22	32	33	34	23	24	25	30	101	102	103	104	105	106	107	108	112	476	113	380	381	114	706	439	438	470	471	472	473	474	475	601	602	603	604	605	606	607	608	609	610	611																																																																																																																																																																																																																																																																																																																																																																								
Test Massage 1	Massage chair A20	2010003611705	 234.00 	USD	 32.00 	USD	 43.00 	USD	 64.00 	No								Min order qty for items	 10.00 	USD	2 parts	5	Yes	DDP	Beds	Beds	Beds	Beds	Butlers	Custom	Lui	 2.00 	5	Partially assembled	No	Care based on linseed oil or beeswax protects wood and environment	Mounting installation	None	Golden M				exclusive	AAA	None							3	pack1	1	2010003611705	 100.00 	 100.00 	 150.00 	5	3	Cubic	carton																																																																																																																																																																																																																																																																																																																																																																								

*/

function createDataRows() {
  const sampleDataRow = {
    "2": "Test Massage 1",
    "29": "Massage chair A20",
    "3": "2010003611705",
    "4": 234.0,
    "5": "USD",
    "6": 32.0,
    "7": "USD",
    "8": 43.0,
    "9": 64.0,
    "10": "No",
    "11": "Min order qty for items",
    "12": 10.0,
    "13": "USD",
    "14": "2 parts",
    "15": 5,
    "16": "Yes",
    "17": "DDP",
    "18": "Beds",
    "19": "Beds",
    "20": "Beds",
    "21": "Beds",
    "22": "Butlers",
    "23": "Custom",
    "24": "Lui",
    "25": 2.0,
    "30": 5,
    "32": "Partially assembled",
    "33": "No",
    "34": "Care based on linseed oil or beeswax protects wood and environment",
    "101": "Mounting installation",
    "102": "None",
    "103": "Golden M",
    "104": "exclusive",
    "105": "AAA",
    "106": "None",
    "107": "",
    "108": "",
    "112": "",
    "113": "",
    "114": "",
    "439": "",
    "438": "",
    "470": "",
    "471": "",
    "472": "",
    "473": "",
    "474": "",
    "475": "",
    "476": "",
    "601": "",
    "602": "",
    "603": "",
    "604": "",
    "605": "",
    "606": "",
    "607": "",
    "608": "",
  };

  const dataRows = [];
  for (let i = 0; i < 100; i++) {
    const row = { ...sampleDataRow };
    row["2"] = `Test Massage ${i}`;
    dataRows.push(row);
  }
  return dataRows;
}
