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

    # Sehr ineffizent, aber vermustlich soper aufwändig das besser zu machen
    def GetAllAppointmetsToday(self):
        self.cur.execute(f"select * from appointments;")
        data = self.cur.fetchall()
        Apps = []
        cond = datecondition.datecondition(0)
        for App in data:
            Abstract =  Appointment.Appointment_Abstract(*App)
            Appointments = Abstract.resolveToAppointment_Where(self,cond.Today)
            for ap in Appointments:
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

    
