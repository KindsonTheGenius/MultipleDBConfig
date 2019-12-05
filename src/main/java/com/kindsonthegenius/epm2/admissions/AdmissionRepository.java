package com.kindsonthegenius.epm2.admissions;

import org.springframework.context.annotation.Profile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
//@Profile("admissions")
public interface AdmissionRepository extends JpaRepository<Admission, Integer> {


}
