drop table if exists TargetGroup;
drop table if exists Users;
drop table if exists DateSpan;
drop table if exists Floor;
drop table if exists Room;
drop table if exists Appointments;
drop table if exists TargetGroups;
drop table if exists ClosedDays;
drop table if exists DateCanceled;


create TABLE TargetGroup(
    id  serial PRIMARY KEY ,
    name text
);

create TABLE Users(
    id serial primary key,
    vorName text NULL ,
    name text NULL ,
    username text not null,
    isAdmin boolean not null,
    pwHash text not null
);

create TABLE DateSpan(
  id serial primary key ,
  dateStart date not null,
  dateEnd date null,
  repeat integer not null
);

create table Floor
(
    id          serial primary key,
    floorName   text not null,
    floorPlan   text not null, /*Save the Path to the file*/
    floorPrefix text not null
);

create table Room(
    id serial primary key ,
    number integer not null,
    name text null,
    path text not null, /*Save path to file or vector instructions ?!*/
    pathAccess text null,
    floor integer references Floor(id) not null
);
create table Appointments(
    id serial   primary key ,
    name text not null ,
    description text not null ,
    startTime time with time zone not null ,
    endTime time with time zone not null,
    lecturer integer references Users(id) not null ,
    room integer references Room(id) not null ,
    dateSpan integer references DateSpan not null
);

create table DateCanceled(
    id serial primary key,
    date date not null,
    appointment integer references  Appointments(id)
);

create table TargetGroups(
  id serial primary key ,
  targetGroup integer references TargetGroup(id),
  appointment integer references Appointments(id)
);

/*Optionals*/
create TABLE ClosedDays(
id serial primary key ,
    day date not null,
    name text not null
);