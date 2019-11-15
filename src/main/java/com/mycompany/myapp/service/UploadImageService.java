package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.UploadImage;
import com.mycompany.myapp.repository.UploadImageRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

/**
 * Service Implementation for managing {@link UploadImage}.
 */
@Service
@Transactional
public class UploadImageService {

    private final Logger log = LoggerFactory.getLogger(UploadImageService.class);

    private final UploadImageRepository uploadImageRepository;

    public UploadImageService(UploadImageRepository uploadImageRepository) {
        this.uploadImageRepository = uploadImageRepository;
    }

    /**
     * Save a uploadImage.
     *
     * @param uploadImage the entity to save.
     * @return the persisted entity.
     */
    public UploadImage save(UploadImage uploadImage) {
        log.debug("Request to save UploadImage : {}", uploadImage);
        return uploadImageRepository.save(uploadImage);
    }

    /**
     * Get all the uploadImages.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<UploadImage> findAll() {
        log.debug("Request to get all UploadImages");
        return uploadImageRepository.findAll();
    }


    /**
     * Get one uploadImage by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<UploadImage> findOne(Long id) {
        log.debug("Request to get UploadImage : {}", id);
        return uploadImageRepository.findById(id);
    }

    /**
     * Delete the uploadImage by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete UploadImage : {}", id);
        uploadImageRepository.deleteById(id);
    }
}
