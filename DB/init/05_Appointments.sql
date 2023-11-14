

insert into appointments (name, description, starttime, endtime, lecturer, room, datespan) VALUES
    ('Mathe 2','DGL und andere dinge', '9:45','15:00',1,3,5),
    ('Modellbildung','Simulation', '11:30','13:30',3,3,4),
    ('Softwaretechnik','Waterfall', '08:00','12:30',1,3,4),
    ('Rechnernetze','LAN und anderes Zeug', '09:45','14:00',2,3,4),
    ('Datenbanken','SQL', '08:00','11:30',1,3,2),
    ('Internet Technologien','JavaScript', '08:00','14:00',1,3,4),
    ('IT','LAN', '11:30','13:30',1,3,3),
    ('Softwaretechnik','Waterfall', '14:00','15:00',2,2,2),
    ('Softwaretechnik','scrum', '17:15','19:00',2,2,2);

insert into targetgroups (targetgroup, appointment) VALUES (3,1),
                                                           (4,2),
                                                           (1,3),
                                                           (2,4),
                                                           (5,5),
                                                           (6,6),
                                                           (1,7),
                                                           (3,8),
                                                           (2,9);


insert into DateCanceled (date, appointment)
values ('2023-09-25',1),
 ('2023-09-25',3),
 ('2023-11-14',5);
 ('2023-11-16',6);
 ('2023-11-21',8);