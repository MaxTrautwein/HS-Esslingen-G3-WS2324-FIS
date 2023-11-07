

insert into appointments (name, description, starttime, endtime, lecturer, room, datespan) VALUES
    ('Mathe 2','DGL und andere dinge', '10:00','13:00',1,3,1),
    ('Mathe 2','DGL und andere dinge', '14:00','15:00',1,3,1),
    ('Mathe 2','DGL und andere dinge', '08:00','9:45',1,3,1),
    ('Softwaretechnik','Waterfall', '14:00','15:00',2,2,2),
    ('Softwaretechnik','scrum', '10:00','13:00',2,2,2);


insert into DateCanceled (date, appointment)
values ('2023-09-25',1),
 ('2023-09-25',3),
 ('2023-09-26',2);