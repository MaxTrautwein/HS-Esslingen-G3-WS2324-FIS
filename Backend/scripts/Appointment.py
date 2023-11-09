from datetime import date, timedelta
import logging
import json

logger = logging.getLogger('FIS')

class Appointment_Abstract:
    def __new__(cls, *args, **kwargs):
        return super().__new__(cls)

    def __init__(self,id,name,description,startTime,endTime,lecturer,room,dateSpan):
            self.id = id
            self.name = name
            self.description = description
            self.startTime = startTime
            self.endTime = endTime
            self.lecturer = lecturer
            self.room = room
            self.dateSpan = dateSpan
    def resolveToAppointment_Where(self,database,DateCondition):
         print("TODO")
         today = date.today()
         database.cur.execute(f"select datestart as anfang, dateend as ende, repeat from  datespan where datespan.id = {self.dateSpan}")
         start, end, repeate = database.cur.fetchone()
         if (repeate == 0 and DateCondition(start,today)):
              return [Appointment(self,start)]
         #In this case We need to get all futer Events
         Appointments = []
         
         event = start
         while (event < end):
              event += timedelta(days=repeate)
              if (DateCondition(event,today)):
                   Appointments.append(Appointment(self,event,database))
         return Appointments
    def resolveToAppointment(self,database):
         print("TODO")
         database.cur.execute(f"select datestart as anfang, dateend as ende, repeat from  datespan where datespan.id = {self.dateSpan}")
         start, end, repeate = database.cur.fetchone()
         if (repeate == 0):
              return [Appointment(self,start)]
         #In this case We need to get all futer Events
         Appointments = []
         today = date.today()
         event = start
         while (event < end):
              event += timedelta(days=repeate)
              if (event >= today):
                   Appointments.append(Appointment(self,event,database))
         return Appointments
         


class Appointment:
    def __new__(cls, *args, **kwargs):
        return super().__new__(cls)

    def __init__(self,abstractApp : Appointment_Abstract, date : date,Database):
            self.id = abstractApp.id
            self.name = abstractApp.name
            self.description = abstractApp.description
            self.startTime = abstractApp.startTime
            self.endTime = abstractApp.endTime
            #TODO Use DateCancled
            logger.info(f"select 1 from datecanceled where date = '{date}' and appointment = {self.id};")
            Database.cur.execute(f"select 1 from datecanceled where date = '{date}' and appointment = {self.id};")
            self.canceled = Database.cur.fetchone() is not None
            self.lecturer = abstractApp.lecturer
            self.room = abstractApp.room
            self.date = date
    
    def toJson(self):
        return {"id":self.id,"name":self.name,"description":self.description,"start":self.startTime.strftime("%H:%M"),
                "end":self.endTime.strftime("%H:%M"),"lecturer":self.lecturer,"date":self.date.strftime("%d.%m.%Y"),"canceld":self.canceled}