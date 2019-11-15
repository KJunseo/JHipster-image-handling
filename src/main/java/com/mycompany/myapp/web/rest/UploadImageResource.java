package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.domain.UploadImage;
import com.mycompany.myapp.service.UploadImageService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.net.URISyntaxException;

import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.UploadImage}.
 */
@RestController
@RequestMapping("/api")
public class UploadImageResource {

    private final Logger log = LoggerFactory.getLogger(UploadImageResource.class);

    private static final String ENTITY_NAME = "uploadImage";

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final UploadImageService uploadImageService;

    public UploadImageResource(UploadImageService uploadImageService) {
        this.uploadImageService = uploadImageService;
    }

    /**
     * {@code POST  /upload-images} : Create a new uploadImage.
     *
     * @param uploadImage the uploadImage to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new uploadImage, or with status {@code 400 (Bad Request)} if the uploadImage has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/upload-images")
    public ResponseEntity<UploadImage> createUploadImage(@RequestBody UploadImage uploadImage) throws URISyntaxException {
        log.debug("REST request to save UploadImage : {}", uploadImage);
        if (uploadImage.getId() != null) {
            throw new BadRequestAlertException("A new uploadImage cannot already have an ID", ENTITY_NAME, "idexists");
        }
        UploadImage result = uploadImageService.save(uploadImage);
        return ResponseEntity.created(new URI("/api/upload-images/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /upload-images} : Updates an existing uploadImage.
     *
     * @param uploadImage the uploadImage to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated uploadImage,
     * or with status {@code 400 (Bad Request)} if the uploadImage is not valid,
     * or with status {@code 500 (Internal Server Error)} if the uploadImage couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/upload-images")
    public ResponseEntity<UploadImage> updateUploadImage(@RequestBody UploadImage uploadImage) throws URISyntaxException {
        log.debug("REST request to update UploadImage : {}", uploadImage);
        if (uploadImage.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        UploadImage result = uploadImageService.save(uploadImage);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, uploadImage.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /upload-images} : get all the uploadImages.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of uploadImages in body.
     */
    @GetMapping("/upload-images")
    public List<UploadImage> getAllUploadImages() {
        log.debug("REST request to get all UploadImages");
        return uploadImageService.findAll();
    }

    /**
     * {@code GET  /upload-images/:id} : get the "id" uploadImage.
     *
     * @param id the id of the uploadImage to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the uploadImage, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/upload-images/{id}")
    public ResponseEntity<UploadImage> getUploadImage(@PathVariable Long id) {
        log.debug("REST request to get UploadImage : {}", id);
        Optional<UploadImage> uploadImage = uploadImageService.findOne(id);
        return ResponseUtil.wrapOrNotFound(uploadImage);
    }

    /**
     * {@code DELETE  /upload-images/:id} : delete the "id" uploadImage.
     *
     * @param id the id of the uploadImage to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/upload-images/{id}")
    public ResponseEntity<Void> deleteUploadImage(@PathVariable Long id) {
        log.debug("REST request to delete UploadImage : {}", id);
        uploadImageService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
