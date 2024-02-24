const GeneralResponse = {
    MongoDBIssue: "MongoDBIssue"
}

const GliderResponse = {

    UserDoesNotExist: "UserDoesNotExist",
    UserExists: "UserExists",
    UserCreated: "UserCreated",
    UserUpdated: "UserUpdated",
    UserDeleted: "UserDeleted"
}

const FlightResponse = {

    FlightDoesNotExist: "FlightDoesNotExist",
    FlightExists: "FlightExists",
    FlightCreated: "FlightCreated",
    FlightUpdated: "FlightUpdated",
    FlightDeleted: "FlightDeleted"
}

const ThermalResponse = {

    ThermalDoesNotExist: "ThermalDoesNotExist",
    ThermalExists: "ThermalExists",
    ThermalCreated: "ThermalCreated",
    ThermalUpdated: "ThermalUpdated",
    ThermalDeleted: "ThermalDeleted"
}

module.exports = { GliderResponse, FlightResponse, ThermalResponse }