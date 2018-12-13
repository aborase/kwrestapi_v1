
class event {
    constructor(eventId, name, description, eventTypeId, venueId, startDate, endDate, active){
        this.eventId = eventId;
        this.name = name;
        this.description = description;
        this.eventTypeId = eventTypeId;
        this.venueId = venueId;
        this.startDate = startDate;
        this.endDate = endDate;
        this.active = active;
    }

}

module.exports = event;