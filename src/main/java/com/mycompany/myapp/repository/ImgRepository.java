package com.mycompany.myapp.repository;

import com.mycompany.myapp.domain.Img;
import org.springframework.data.jpa.repository.*;
import org.springframework.stereotype.Repository;


/**
 * Spring Data  repository for the Img entity.
 */
@SuppressWarnings("unused")
@Repository
public interface ImgRepository extends JpaRepository<Img, Long> {

}
