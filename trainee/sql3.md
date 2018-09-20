# postgresql #

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
