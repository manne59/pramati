1.**Employee_Name and Manager_Name**
```
  SELECT a.name AS "Emp_Name",b.name AS "Mgr_Name" 
  FROM employee a, employee b 
  WHERE a.mgr_id = b.emp_id;
```

2.**Employee name, emp doj, manager name, manger doj**
```
SELECT a.name AS "Emp_Name",
a.joining_date AS "DOJ",b.name AS "Mgr_Name" ,b.joining_date AS "DOJ"
FROM employee a, employee b
WHERE a.mgr_id = b.emp_id;
```

3.**Employee name, Emp Dept, Mgr Dept**
```
SELECT a.name Emp_Name,ad.name Employee_dept ,bd.name Manager_dept 
FROM employee a, employee b ,dept ad,dept bd 
WHERE b.emp_id = a.mgr_id 
AND a.dept_id=ad.dept_id 
AND b.dept_id=bd.dept_id;
```

4.**List of employees without a manager**
```
SELECT name from employee 
WHERE mgr_id IS NULL;
```
5.**List of terminated manager names**
```
SELECT distinct b.name AS manager_names 
FROM employee a,employee b 
WHERE a.mgr_id=b.emp_id 
AND extract(YEAR from b.termination_date)<2019;
```
6.**List of department names where we have a terminated employee**
```
 SELECT distinct ad.name Dept_name 
 FROM employee a,employee b,dept ad,dept bd  where a.mgr_id=b.emp_id 
 AND b.termination_date<now()::date 
 AND ad.dept_id=a.dept_id 
 AND bd.dept_id=b.dept_id;
```
7.**List of department names where we have a terminated Manager**
```
SELECT distinct d.name as "Department name" 
FROM dept d, employee e
WHERE d.dept_id=e.dept_id 
AND e.termination_date is not null;
```
8.**List of employees whose manager's salary is less than employee salary**
```
SELECT a.name AS "Emp_Name" FROM employee a, employee b 
WHERE a.mgr_id = b.emp_id 
AND b.salary < a.salary;
```

9.**List of employees whose doj is earlier than manager**
```
SELECT a.name AS "Emp_Name" 
FROM employee a, employee b 
WHERE a.mgr_id = b.emp_id 
AND b.joining_date>a.joining_date;
```

10.**List of employees whose name has a vowel**
```
SELECT name FROM employee 
WHERE name LIKE '%A%'
OR name LIKE '%E%'
OR name LIKE '%I%'
OR name LIKE '%O%'
OR name LIKE '%U%'
OR name LIKE '%a%'
OR name LIKE '%e%'
OR name LIKE '%i%'
OR name LIKE '%o%'
OR name LIKE '%u%'
```
11.**List of employees whose's manager name has a vowel and employee salary is less than 20000**
```
SELECT a.name AS "Emp_Name" 
FROM employee a, employee b 
WHERE a.mgr_id = b.emp_id 
AND a.salary < 20000 
AND (b.name LIKE '%A%' 
OR b.name LIKE '%E%' 
OR b.name LIKE '%I%' 
OR b.name LIKE '%O%' 
OR b.name LIKE '%U%' 
OR b.name LIKE '%a%' 
OR b.name LIKE '%e%' 
OR b.name LIKE '%i%' 
OR b.name LIKE '%o%' 
OR b.name LIKE '%u%');
```

12.**List of employees who has joined in Jan/Feb and Nov**
```
SELECT name 
FROM employee 
WHERE to_char(joining_date, 'mm') = '02' 
OR to_char(joining_date, 'mm') = '01' 
OR to_char(joining_date, 'mm') = '11';
```
