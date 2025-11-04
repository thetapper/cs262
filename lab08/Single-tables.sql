-- Micah Wakefield
-- November 3, 2025

--a
SELECT * FROM Game
ORDER BY time DESC;


--b
SELECT * FROM Game
WHERE time >= CURRENT_DATE - INTERVAL '7 days';

--c
SELECT * FROM Player
WHERE name IS NOT NULL;

--d
SELECT ID FROM Player
WHERE score > 2000;

--e
SELECT * FROM Player
WHERE emailAddress LIKE '%@example.com';
