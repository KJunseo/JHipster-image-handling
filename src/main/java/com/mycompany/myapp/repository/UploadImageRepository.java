package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.UploadImage;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the UploadImage entity.
 */
@SuppressWarnings("unused")
@Repository
public interface UploadImageRepository extends JpaRepository<UploadImage, Long> {

}
