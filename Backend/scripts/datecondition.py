from datetime import date, timedelta

class datecondition:
    def __new__(cls, *args, **kwargs):
        return super().__new__(cls)

    def __init__(self,dur):
        self.dur = dur

    def Today(self,event,today):
        return event == today
    
    def Future(self,event,end):
        return event < end
    
    def Future_nDays(self,event,today):
        today += timedelta(days=self.dur)
        return self.Future(event,today)