package com.kindsonthegenius.epm2.appointments;

import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

//@Profile("appointments")
@Repository
public interface AppointmentRepository extends JpaRepository<Appointment, Integer> {
}
