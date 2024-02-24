const GeneralResponse = {
    MongoDBIssue: "MongoDBIssue"
}

const GliderResponse = {

    ErrorGettingUser: "ErrorGettingUser",
    ErrorAddingUser: "ErrorAddingUser",
    ErrorUpdatingUser: "ErrorUpdatingUser",
    ErrorDeletingUser: "ErrorDeletingUser",
    UserDoesNotExist: "UserDoesNotExist",
    UserExists: "UserExists",
    UserCreated: "UserCreated",
    UserUpdated: "UserUpdated",
    UserDeleted: "UserDeleted"
}

const FlightResponse = {

    ErrorGettingFlight: "ErrorGettingFlight",
    ErrorAddingFlight: "ErrorAddingFlight",
    ErrorUpdatingFlight: "ErrorUpdatingFlight",
    ErrorDeletingFlight: "ErrorDeletingFlight",
    FlightDoesNotExist: "FlightDoesNotExist",
    FlightExists: "FlightExists",
    FlightCreated: "FlightCreated",
    FlightUpdated: "FlightUpdated",
    FlightDeleted: "FlightDeleted"
}

const ThermalResponse = {

    ErrorGettingThermal: "ErrorGettingThermal",
    ErrorAddingThermal: "ErrorAddingThermal",
    ErrorUpdatingThermal: "ErrorUpdatingThermal",
    ErrorDeletingThermal: "ErrorDeletingThermal",
    ThermalDoesNotExist: "ThermalDoesNotExist",
    ThermalExists: "ThermalExists",
    ThermalCreated: "ThermalCreated",
    ThermalUpdated: "ThermalUpdated",
    ThermalDeleted: "ThermalDeleted"
}

module.exports = { GliderResponse, FlightResponse, ThermalResponse }