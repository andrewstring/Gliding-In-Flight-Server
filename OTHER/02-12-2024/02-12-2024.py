import json

with open("./02-12-2024.json") as data_read:
    data_contents = data_read.read()

data = json.loads(data_contents)

print("\n\nID: {}".format(data["id"]))

glider = data["glider"]
print("\nGlider Info:")
print("\tID: {}".format(glider["id"]))
print("\tName: {}".format(glider["name"]))
print("\tCurrent Location: {}".format(glider["currentLocation"]))
print("\tCurrentUpdate: {}".format(glider["currentUpdate"]))
print("\tLastLocation: {}".format(glider["lastLocation"]))
print("\tLastUpdate".format(glider["lastUpdate"]))

print("\nDate Of Flight: {}".format(data["dateOfFlight"]))

print("\nGPS Data:")
for index, location in enumerate(data["locations"][:10]):
    print("\t{}:".format(index + 1))
    print("\t\tTime: {}".format(location["date"]))
    print("\t\tLatitude: {}".format(location["latitude"]["$numberDouble"]))
    print("\t\tLongitude: {}".format(location["longitude"]["$numberDouble"]))
    print("\t\tAltitude: {}".format(location["altitude"]["$numberDouble"]))
    print("\t\tSpeed: {}".format(location["speed"]["$numberDouble"]))

print("\nAbsolute Barometric Data")
for index, absBar in enumerate(data["absoluteBarometricAltitudes"][:10]):
    print("\t{}:".format(index + 1))
    print("\t\tTime: {}".format(absBar["date"]))
    print("\t\tAbsolute Altitude: {}".format(absBar["absoluteAltitude"]["$numberDouble"]))
    print("\t\tAbsolute Accuracy: {}".format(absBar["absoluteAccuracy"]["$numberDouble"]))
    print("\t\tAbsolute Precision: {}".format(absBar["absolutePrecision"]["$numberDouble"]))

print("\nRelative Barometric Data")
for index, relBar in enumerate(data["relativeBarometricAltitudes"][:10]):
    print("\t{}".format(index + 1))
    print("\t\tTime: {}".format(relBar["date"]))
    print("\t\tRelative Altitude: {}".format(relBar["relativeAltitude"]["$numberDouble"]))
    print("\t\tRelative Pressure: {}".format(relBar["relativePressure"]["$numberDouble"]))