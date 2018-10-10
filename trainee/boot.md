# Bootstrap forms

**If you don't include a label for every input, screen readers will have trouble with your forms. You can hide the labels for all devices, except screen readers, by using the .sr-only class**

**The .table-responsive class creates a responsive table. The table will then scroll horizontally on small devices**

**Create an empty <tr> element and add it to the 1st position of the table:**
var row = table.insertRow(0);

**Insert new cells (<td> elements) at the 1st position of the "new" <tr> element:**
var cell1 = row.insertCell(0);

**Add some text to the new cells:**
cell1.innerHTML = "NEW CELL1";
