

package com.Brinah.FlightBooking.Exception;

public class ResourceNotFoundException extends RuntimeException {

    public ResourceNotFoundException() {
        super("Resource not found");
    }

    public ResourceNotFoundException(String message) {
        super(message);
    }

    public ResourceNotFoundException(String resourceName, String fieldName, Object fieldValue) {
        super(String.format("%s not found with %s: '%s'", resourceName, fieldName, fieldValue));
    }

    // Custom exception for seat already booked
    public static class SeatAlreadyBookedException extends RuntimeException {
        public SeatAlreadyBookedException(Long seatId) {
            super("Seat with ID " + seatId + " is already booked.");
        }
    }
}
