

insert into appointments (name, description, starttime, endtime, lecturer, room, datespan) VALUES
    ('Mathe 2','DGL und andere dinge', '8:00','13:00',1,3,1),
    ('Mathe 2','DGL und andere dinge', '9:45','15:00',1,3,1),
    ('Mathe 2','DGL und andere dinge', '11:30','13:30',1,3,1),
    ('IT','LAN', '11:30','13:30',1,3,1),
    ('Softwaretechnik','Waterfall', '14:00','15:00',2,2,2),
    ('Softwaretechnik','scrum', '17:15','19:00',2,2,2);

insert into targetgroups (targetgroup, appointment) VALUES (3,1),
                                                           (4,1),
                                                           (1,2),
                                                           (1,3),
                                                           (1,4),
                                                           (1,5);


insert into DateCanceled (date, appointment)
values ('2023-09-25',1),
 ('2023-09-25',3),
 ('2023-09-26',2);