def getDate(dateTime):
    return "{}/{}/{}".format(dateTime[2:3],dateTime[3:5],dateTime[5:9])

def getTime(dateTime):
    amPM = "AM"
    hour = int(dateTime[9:11])
    if int(dateTime[9:11]) > 12:
        hour -= 12
        amPM = "PM"
    return "{}:{}:{} {}".format(hour, int(dateTime[11:13]), int(dateTime[13:15]), amPM)
