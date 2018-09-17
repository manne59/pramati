import re
import os
import ntpath
import psycopg2
path=input("Enter path\n")

filename=ntpath.basename(path)
pos=filename.find('.')
name=filename[:pos]
#print (name)
f1=open(filename,"r")
s=f1.read()

email = r"\"?([-a-zA-Z0-9.`?{}]+@\w+\.\w+)\"?" 

mail = re.findall(email, s)
#phone=re.findall('[0-9]+',s)
phone= re.findall('[+91]?[6-9][0-9]{9}',s)
data=name,mail[0],phone[0]
print "Name ",name
print"Email ",mail[0]
print "Phone ",phone[0]

conn = psycopg2.connect(host="localhost",database="resume",user="keer786",password="Manoharan786")
cur = conn.cursor()
insert="INSERT INTO resume_collect(filename,email,phone) VALUES (%s,%s,%s);"
cur.execute(insert,data);

conn.commit()
conn.close()
cur.close()
