SET @uuid1 = '83eb65a0-37a6-423e-94ec-1fe14fde01b8';
SET @uuid2 = 'fd8fcede-4c72-4b20-a5c8-df341f1a3557';
SET @uuid3 = 'b3ccab37-fa36-44b0-8c53-06593cec9a7f';
SET @uuid4 = 'ed6c3614-fc51-4fb1-910d-5decc06be26c';

INSERT INTO Picture (uuid, elo, data) VALUES (@uuid1, 1400, LOAD_FILE(CONCAT('/var/lib/mysql-files/', @uuid1, '.jpg')));
INSERT INTO Picture (uuid, elo, data) VALUES (@uuid2, 1400, LOAD_FILE(CONCAT('/var/lib/mysql-files/', @uuid2, '.jpg')));
INSERT INTO Picture (uuid, elo, data) VALUES (@uuid3, 1400, LOAD_FILE(CONCAT('/var/lib/mysql-files/', @uuid3, '.jpg')));
INSERT INTO Picture (uuid, elo, data) VALUES (@uuid4, 1400, LOAD_FILE(CONCAT('/var/lib/mysql-files/', @uuid4, '.jpg')));
