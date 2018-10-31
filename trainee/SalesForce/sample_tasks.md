**Create a lookup to user in account and filter it to only active users**



**Create a validation rule to require sla serial number if sla is gold or platinum**

AND(OR(ISPICKVAL( SLA__c , "Gold") ,ISPICKVAL( SLA__c , "platinum") ), ISBLANK( SLASerialNumber__c ) )


**Remove all the fields from page layout and keep account name, account number, sla, sla serial number, owner, type**


page layout

**Have only Account Name and owner in the search layout**


search layout-search results


**Have only Account Name and Sla in lookup**

search layout-lookup dialogs



**Have only Account Name and Type in account tab**

search layout-account tabs




**When creating lead, assign owner as Durai saravanan if rating is hot and assign owner as Sindhura if rating is cold**

Lead Assignment rules
- only one rule can be active at a time.
- Inside the rule we can mention all conditions in a sorting order.

**Give vf page on clicking edit button**


**Give vf page on clicking new button in accounts tab**

Accounts-buttons,links...-edit required things

**Create Workflow**



**process builder**

**trigger to add today date to account name whenever new account is created**
