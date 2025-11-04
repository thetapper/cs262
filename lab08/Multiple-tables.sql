--Micah Wakefield
--November 3, 2025

--a
SELECT p.name
FROM Player p
JOIN PlayerGame pg ON p.ID = pg.playerID
WHERE p.name = 'The King'
ORDER BY pg.time DESC;

--b
SELECT p.name 
FROM Player p
JOIN PlayerGame pg ON p.ID = pg.playerID
JOIN Game g ON pg.gameID = g.ID
WHERE g.time = '2006-06-28 13:20:00';

--c
-- P1.ID < P2.ID ensures each pair is only listed once


--d
-- To compare the list with itself, enabeling us to connect people through data stored in different rows

