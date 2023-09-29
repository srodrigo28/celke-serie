SELECT id, name, email FROM users;

SELECT * FROM users ORDER BY name DESC;

SELECT * FROM users ORDER BY name ASC;

SELECT * FROM users LIMIT 3;

SELECT * FROM users LIMIT 2 OFFSET 4;
-- EXEMPO --
-- pg 1 = 1,2
-- pg 2 = 3,4
-- pg 3 = 5,6

SELECT * FROM users WHERE email = '';

SELECT * FROM users WHERE name = 'Alex Silva';

SELECT * FROM users WHERE email LIKE '%a%' AND name = 'alex';

SELECT * FROM users WHERE name LIKE 'a%';

SELECT * FROM users WHERE name LIKE '%a%';


