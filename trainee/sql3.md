# postgresql #
# set-2 #

**1) Manager Name, Count of Employees whose start date is after 2013**

SELECT b.name as  Mgr_Name,count(a.name) as Emp_count 

FROM employee a, employee b 

WHERE b.emp_id = a.mgr_id 

and a.joining_date>'01-01-2013'
 
group by b.name 

order by b.name;

**2) Manager Name, Min(emp salary) where manager start date is after 2013**

 SELECT b.name AS "Mgr_Name",min(a.salary) AS "Emp_salary" 

FROM employee a, employee b 

WHERE b.emp_id = a.mgr_id 

AND b.joining_date>'01-01-2013' 

GROUP BY b.name;

**3) Manager name who atleast has two employees started after 2013**

 SELECT b.name as  Mgr_Name,count(a.name) as Emp_count
 
FROM employee a, employee b 

WHERE b.emp_id = a.mgr_id
 
and a.joining_date>'01-01-2013' 

group by b.name 

 having count(a.name) >=2;

**4) Dept Name, Count of Employees whose start date is after 2013**

 select d.name,count(e.name) 

from employee e,dept d 

where d.dept_id=e.dept_id
 
and e.joining_date>'01-01-2013' 

group by d.name;

**5) Dept Name, Min(emp salary) where manager start date is after 2013**

select d.name,min(a.salary) 

from employee a,employee b,dept d 

where d.dept_id=a.dept_id 

and d.dept_id=b.dept_id 

and b.emp_id=a.mgr_id
 
and  b.joining_date>'01-01-2013'
 
group by d.name;

**6) Dept Name who atleast has two employees started after 2013**

select d.name,count(e.name) 

from employee e,dept d 

where d.dept_id=e.dept_id 

and e.joining_date>'01-01-2013' 

group by d.name 

having count(e.name)>=2;

**7) Number of employees per year**

select extract(year from joining_date) ,count(emp_id) 

from employee 

group by extract(year from joining_date);



**8) Number of employees per year, per department**

 select extract(year from e.joining_date) ,d.name,count(e.emp_id)

 from employee e,dept d

 where e.dept_id=d.dept_id 

group by extract(year from e.joining_date),d.name

 order by d.name;

**9) List of Months (Say, Jan-2018) where number of employees joined is more than 2**
 
select extract(year from joining_date) as YEAR,

extract(month from joining_date) as Month ,

count(emp_id) as Count 

from employee 

group by 1,2 

having count(emp_id)>2;

**10) List of Managers who has employees from more than one department**

select m.name
 
from employee e,employee m,dept d 

where e.mgr_id=m.emp_id 

and e.dept_id=d.dept_id 

group by m.name 

having count(distinct d.name)>1;

**11) List of Departments who has atleast two managers**

select d.name,count(distinct m.name) from employee e,employee m,dept d 

where e.mgr_id=m.emp_id 

and m.dept_id=d.dept_id

group by d.name 

having count(distinct m.name)>=2;


**12) Employee Names who joined after 2013 and his manager has more than two reportees**


select a.* employee 

from employee a,

employee b 

where b.emp_id=a.mgr_id 

and a.joining_date>'01-01-2013'

and exists(

    select 1 

    from employee a_inr

    where a_inr.mgr_id=a.mgr_id

    having count(distinct a_inr.name) > 2);


#set-3

**SQL to find the missing ids from dept**

SELECT generate_series(

(SELECT MIN(dept_id) FROM dept),

(SELECT MAX(dept_id) FROM dept)

) AS MissingID

EXCEPT SELECT dept_id FROM dept;


**Manager Name, Reportee who joined first (Reportee Name - doj), Reportee who draws less sal (Reportee Name - salary)**

SELECT m1.Manager_name,m1.jd,m2.sd

FROM

    (SELECT    DISTINCT m2.name AS Manager_name,

    FIRST_VALUE(CONCAT(m1.name,'-',m1.joining_date)) OVER(

    PARTITION BY m1.mgr_id

    ORDER BY m1.joining_date) AS jd

    FROM employee m1, employee m2

    WHERE m2.emp_id=m1.mgr_id

    )m1 

INNER JOIN

    (SELECT DISTINCT m2.name AS Manager_name,

    FIRST_VALUE(CONCAT(m1.name,'-',m1.salary)) OVER ( 

    PARTITION BY m1.mgr_id 

    ORDER BY m1.salary) AS sd 

    FROM employee m1, employee m2 

    WHERE m2.emp_id=m1.mgr_id

    )m2

ON m1.Manager_name=m2.Manager_name;
