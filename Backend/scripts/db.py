import psycopg2
import time
import logging
import Appointment
import datecondition


logger = logging.getLogger('FIS')

class Database:

    def __new__(cls, *args, **kwargs):
        return super().__new__(cls)

    def __init__(self,dbName="postgres",user="postgres",host="postgres",pw="example"):
        self.con = psycopg2.connect(f"dbname='{dbName}' user='{user}' host='{host}' password='{pw}'")
        self.cur = self.con.cursor()
        try:
            logger.info(self.con)
            logger.info(self.con.closed)
        except:
            logger.info("error")

    def DeInit(self):
        self.con.close()
    
    def FetchRepeateInfo(self,dateSpan):
        self.cur.execute(f"select datestart as anfang, dateend as ende, repeat from  datespan where datespan.id = {dateSpan}")
        return self.cur.fetchone()

    def IsAppointmentCanceld(self,date,id):
        self.cur.execute(f"select 1 from datecanceled where date = '{date}' and appointment = {id};")
        return self.cur.fetchone() is not None

    def GetIntrestedGroups(self,app_ID):
        self.cur.execute(f"select targetgroup from targetgroups where appointment = {app_ID};")
        data = self.cur.fetchall()
        res = []
        for group in data:
            res.append(group[0])
        return res

    def GetAllGroups(self):
        self.cur.execute("select name from targetgroup;")
        data = self.cur.fetchall()
        res = []
        for group in data:
            res.append(group[0])
        return res
    
    # Not an Efficiant way to handel this, but the alternitive would take a substantioal ammount of effort
    # With the Time limitation of this project this is not resonable at that point
    # With the small ammount of data at play here his might not be as bad as one might expect
    def GetAllAppointmets(self):
        self.cur.execute(f"select * from appointments;")
        return self.cur.fetchall()

    def GetAllAppointmetsToday(self):
        data = self.GetAllAppointmets()
        Apps = []
        cond = datecondition.datecondition(0)
        for App in data:
            Abstract =  Appointment.Appointment_Abstract(*App)
            Appointments = Abstract.resolveToAppointment_Where(self,cond.Today)
            for ap in Appointments:
                Apps.append(ap)
        return Apps

    def GetAllCanceldAppointmetsForNDays(self,dur):
        data = self.GetAllAppointmets()
        Apps = []
        cond = datecondition.datecondition(dur)
        for App in data:
            Abstract =  Appointment.Appointment_Abstract(*App)
            Appointments = Abstract.resolveToAppointment_Where(self,cond.Future_nDays)
            for ap in Appointments:
                if (ap.canceled):
                    Apps.append(ap)
        return Apps

    def GetAllAppointmetsFor(self,Lectuerer):
        self.cur.execute(f"select * from appointments where appointments.lecturer = {Lectuerer};")
        data = self.cur.fetchall()
        Apps = []
        for App in data:
            logger.debug(App)
            Abstract =  Appointment.Appointment_Abstract(*App)
            Appointments = Abstract.resolveToAppointment(self)
            for ap in Appointments:
                Apps.append(ap)
        return Apps
    
    def UpdateCanceled(self,canceled,id,date):
        if (canceled):
            self.cur.execute(f"insert into datecanceled (date, appointment) VALUES ('{date}',{id});")
        else:
            self.cur.execute(f"delete from datecanceled where date = '{date}' and appointment = {id};")
        self.con.commit()            

    def GetRoomName(self,id):
        self.cur.execute(f"select name from room where id = {id};")
        return self.cur.fetchone()
    
    def GetAllRooms(self):
        self.cur.execute("select name from room;")

        data = self.cur.fetchall()
        res = []
        for group in data:
            res.append(group[0])
        return res
    
    def GetAppointmentByID(self,id):
        self.cur.execute(f"select * from appointments where id = {id};")
        return Appointment.Appointment_Abstract(*self.cur.fetchone())
    
    def GetUserByID(self,id):
        #select vorname,name from users where id =1
        self.cur.execute(f"select vorname,name from users where id = {id};")
        Vname, name = self.cur.fetchone()
        return {"firstName":Vname,"lastName":name} 
    
    def GetAllLecturers(self):
        self.cur.execute("select vorname,name from users where isadmin = false")
        data = self.cur.fetchall()
        res = []
        for group in data:
            res.append({"firstName":group[0],"lastName":group[1]} )
        return res
    
    def GetDateSpanByID(self,id):
        self.cur.execute(f"select datestart,dateend,repeat from datespan where id = {id};")
        datestart,dateend,repeat = self.cur.fetchone()
        return {"startDate":datestart.strftime("%d.%m.%Y"), "endDate":dateend.strftime("%d.%m.%Y"),"repeat":repeat} 
    
    def DeleteDateCanceledByID(self,id):
        self.cur.execute(f"delete from datecanceled where appointment = {id}")
    
    def DeleteTargetGroupsByID(self,id):
        self.cur.execute(f"delete from targetgroups where appointment = {id}")

    def DeleteAppointmentByID(self,id):
        self.cur.execute(f"delete from appointments where id = {id}")

    def GetAppointmentDateSpanByID(self,id):
        self.cur.execute(f"select datespan from appointments where id = {id}")
        return self.cur.fetchone()[0]
    
    def TryDeleteDateSpanByID(self,id):
        self.cur.execute(f"delete from datespan  where id = {id}  and not exists(select datespan from  appointments where appointments.datespan = {id})")

    def DeleateFullAppointment(self,id):
        self.DeleteDateCanceledByID(id)
        self.DeleteTargetGroupsByID(id)
        datespan = self.GetAppointmentDateSpanByID(id)
        self.DeleteAppointmentByID(id)
        self.TryDeleteDateSpanByID(datespan)
        #Commit
        self.con.commit()


