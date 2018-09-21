## **Postgres_SET_3:**


**1. SQL to find the missing ids from dep**

**With generate_series function**

```
SELECT generate_series(
                  (SELECT MIN(dept_id) 
                   FROM dept),
                  (SELECT MAX(dept_id) 
                   FROM dept)) 
AS MissingID 
EXCEPT SELECT dept_id 
FROM dept ORDER BY MissingID ;

Select
	*
FROM
	generate_series (
		(SELECT MIN(dept_id) FROM dept),
		(SELECT MAX(dept_id) FROM dept)
	) AS sn
LEFT JOIN dept ON dept.dept_id = sn
where dept_id is null

```

**Without generate series function**

```

WITH RECURSIVE series AS (
	SELECT
		1 AS rn
	UNION ALL
		SELECT
			rn + 1 AS rn
		FROM
			series
		WHERE
			rn < 10
) SELECT
	*
FROM
	series
```
**2. Manager Name, Reportee who joined first (Reportee Name - doj), Reportee who draws less sal (Reportee Name - salary)**

**Without Window Function**
```
SELECT a.name,a.doj AS "Reportee Name - doj",b.sal AS "Reportee Name - salary"
FROM
(SELECT b.name,CONCAT(a.name,'-',a.joining_date) AS doj 
         FROM employee a,employee b
         WHERE b.emp_id=a.mgr_id 
         AND EXISTS(
           SELECT 1
           FROM employee a_inr
           WHERE a_inr.mgr_id=b.emp_id
           HAVING min(a_inr.joining_date)=a.joining_date
          ) 
) a
INNER JOIN (
SELECT b.name,CONCAT(a.name,'-',a.salary) AS sal	
         FROM employee a,employee b
         WHERE b.emp_id=a.mgr_id
         AND EXISTS(
             SELECT 1
             FROM employee a_inr
             WHERE a_inr.mgr_id=b.emp_id
             HAVING min(a_inr.salary)=a.salary
              
           )
)b
ON a.name=b.name;

```
**With Window Fucntion**
1
```
SELECT m1.Manager_name,m1.jd,m2.sd
FROM(
    SELECT DISTINCT m2.name AS Manager_name,FIRST_VALUE(CONCAT(m1.name,'-',m1.joining_date)) OVER(PARTITION BY m1.mgr_id ORDER BY     m1.joining_date) 
   AS jd
   FROM employee m1, employee m2
   WHERE m2.emp_id=m1.mgr_id)m1
   INNER JOIN(
              SELECT DISTINCT m2.name AS Manager_name,FIRST_VALUE(CONCAT(m1.name,'-',m1.salary)) OVER (PARTITION BY m1.mgr_id ORDER BY m1.salary) AS sd 
              FROM employee m1, employee m2
              WHERE m2.emp_id=m1.mgr_id)m2
              ON m1.Manager_name=m2.Manager_name;
```
2
```
SELECT DISTINCT
	M . NAME AS mgr_name,
	FIRST_VALUE (e. NAME) OVER (
		PARTITION BY M .emp_id
		ORDER BY
			e.joining_date
	) AS first_emp_name,
	FIRST_VALUE (e.joining_date) OVER (
		PARTITION BY M .emp_id
		ORDER BY
			e.joining_date
	) AS first_doj,
	FIRST_VALUE (e. NAME) OVER (
		PARTITION BY M .emp_id
		ORDER BY
			e.salary
	) AS least_sal_emp_name,
	FIRST_VALUE (e.salary) OVER (
		PARTITION BY M .emp_id
		ORDER BY
			e.salary
	) AS least_salary
FROM
	employee e
INNER JOIN employee M ON e.mgr_id = M .emp_id

```      


**3. salary_history id,name,start_date,end_date,salary 1,Aneesh,2010,2011,1000
1,Aneesh,2011,2012,1100--1,Aneesh,2011,2014,1100 1,Aneesh,2014,2015,1200 1,Aneesh,2015,null,1200 
Find the list of employee records WHERE salary data is missing
With the above example, we don’t have salary information FROM 2012 to 2014
Assume, if above data is as commented, then there is no missing as there is no gap**


```
select * from (
SELECT
	sh.start_date,
	sh.end_date,
	LEAD (start_date, 1) OVER (ORDER BY start_date) AS next_start_date
FROM
	sh
ORDER BY
	start_date)t where next_start_date-end_date > 0

```

## **Postgres_SET_4:**

**1. create a csv file with sample data like below with 10 to 20 records**
emp_id |     name      | dept_id | mgr_id | salary | joining_date | termination_date | mgr_name
--------+---------------+---------+--------+--------+--------------+------------------+----------
      1 | Harish        |         |        |  90000 | 1990-12-17   | 2015-12-17       |



**2. Load the csv to table using psql command**

```
psql -h 172.17.10.109 -U python_app -d training -c "\copy employee (emp_id,name,dept_id,mgr_id,salary,joining_date,termination_date) FROM 'Downloads/sql4.csv' with (format csv,header true, delimiter ',');"
```


**3. While loading the table, if the given mgr_id is not in emp table, insert/update should fail**

```
ALTER TABLE employee
ADD CONSTRAINT FK_employee_Code FOREIGN KEY (mgr_id)
REFERENCES employee (emp_id) ;

```

**4. While loading the table, if the given dept_id is not in dept table, we should insert a record in dept table first with id and name as dept_id in the csv and then insert the employee table**
```
INSERT
    BEFORE
    AFTER
, UPDATE, DELETE

```
**5. create a new employee table (say employee1) with the same structure and constraints of employee table but not data**

``` 
CREATE TABLE employee1
AS
 SELECT * FROM employee
 WHERE 1=0;

https://www.postgresql.org/docs/9.1/static/sql-createtable.html
```

**6. add a new column peer_emp_ids array**
```
ALTER TABLE employee1 ADD COLUMN peer_emp_ids int[];
```
**7. write an insert statement to populate this table from employee table where peer_emp_ids is the employee ids of its manager excluding the given employee**

```
insert into employee1
SELECT
	*, (
		SELECT
			ARRAY_AGG (emp_id)
		FROM
			employee e_inr
		WHERE
			e_inr.mgr_id = e.mgr_id
	) - ARRAY [ e.emp_id ]
FROM
	employee e
```

**8. Write a SQL to find all the employees for the given employee id where the given employee is part of using peer_emp_ids**
```
SELECT
	*
FROM
	employee e
INNER JOIN employee1 e1 ON e.emp_id = ANY (e1.peer_emp_ids)
WHERE
	e1.emp_id = 3
```
