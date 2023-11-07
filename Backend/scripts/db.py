import psycopg2
import time
import logging
import Appointment


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

    
