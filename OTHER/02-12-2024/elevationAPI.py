import requests

elevationAPIURL = "https://maps.googleapis.com/maps/api/elevation/json?locations=39.7391536%2C-104.9847034&key=AIzaSyAQLHTtwdSNzm2x0Jgmm0_XUcyaadV1efY"


def getElevation(latitude, longitude):
    url = "https://maps.googleapis.com/maps/api/elevation/json?locations={}%2C{}&key=AIzaSyAQLHTtwdSNzm2x0Jgmm0_XUcyaadV1efY".format(latitude,longitude)
    print(url)
    response = requests.get(url)
    return float(response.json()["results"][0]["elevation"])
