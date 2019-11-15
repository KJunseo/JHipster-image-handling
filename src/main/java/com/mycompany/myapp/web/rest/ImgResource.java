package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.service.ImgService;
import com.mycompany.myapp.web.rest.errors.BadRequestAlertException;
import com.mycompany.myapp.service.dto.ImgDTO;

import io.github.jhipster.web.util.HeaderUtil;
import io.github.jhipster.web.util.ResponseUtil;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.swing.text.html.Option;
import java.io.File;
import java.io.IOException;
import java.net.URI;
import java.net.URISyntaxException;

import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

/**
 * REST controller for managing {@link com.mycompany.myapp.domain.Img}.
 */
@RestController
@RequestMapping("/api")
public class ImgResource {

    private final Logger log = LoggerFactory.getLogger(ImgResource.class);

    private static final String ENTITY_NAME = "img";

    //private static String UPLOADED_FOLDER = "/Users/kimjunseo/Desktop/2019-2/JHipster/image_handler/src/main/java/com/mycompany/myapp/image/";

    @Value("${image.path}")
    private String UPLOADED_FOLDER;

    @Value("${jhipster.clientApp.name}")
    private String applicationName;

    private final ImgService imgService;

    public ImgResource(ImgService imgService) {
        this.imgService = imgService;
    }

    /**
     * {@code POST  /imgs} : Create a new img.
     *
     * @param imgDTO the imgDTO to create.
     * @return the {@link ResponseEntity} with status {@code 201 (Created)} and with body the new imgDTO, or with status {@code 400 (Bad Request)} if the img has already an ID.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PostMapping("/imgs")
    public ResponseEntity<ImgDTO> createImg(@RequestBody ImgDTO imgDTO) throws URISyntaxException, IOException {
        log.debug("REST request to save Img : {}", imgDTO);
        log.debug("****Check image content type: {}",imgDTO.getImageContentType());
        if (imgDTO.getId() != null) {
            throw new BadRequestAlertException("A new img cannot already have an ID", ENTITY_NAME, "idexists");
        }
        byte[] bytes = imgDTO.getImage();
        Path path = Paths.get(UPLOADED_FOLDER + imgDTO.getImageName());
        Files.write(path, bytes);

        imgDTO.setImage_path(path.toString());

        ImgDTO result = imgService.save(imgDTO);
        return ResponseEntity.created(new URI("/api/imgs/" + result.getId()))
            .headers(HeaderUtil.createEntityCreationAlert(applicationName, false, ENTITY_NAME, result.getId().toString()))
            .body(result);
    }

    /**
     * {@code PUT  /imgs} : Updates an existing img.
     *
     * @param imgDTO the imgDTO to update.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the updated imgDTO,
     * or with status {@code 400 (Bad Request)} if the imgDTO is not valid,
     * or with status {@code 500 (Internal Server Error)} if the imgDTO couldn't be updated.
     * @throws URISyntaxException if the Location URI syntax is incorrect.
     */
    @PutMapping("/imgs")
    public ResponseEntity<ImgDTO> updateImg(@RequestBody ImgDTO imgDTO) throws URISyntaxException {
        log.debug("REST request to update Img : {}", imgDTO);
        if (imgDTO.getId() == null) {
            throw new BadRequestAlertException("Invalid id", ENTITY_NAME, "idnull");
        }
        ImgDTO result = imgService.save(imgDTO);
        return ResponseEntity.ok()
            .headers(HeaderUtil.createEntityUpdateAlert(applicationName, false, ENTITY_NAME, imgDTO.getId().toString()))
            .body(result);
    }

    /**
     * {@code GET  /imgs} : get all the imgs.
     *

     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and the list of imgs in body.
     */
    @GetMapping("/imgs")
    public List<ImgDTO> getAllImgs() {
        log.debug("REST request to get all Imgs");
        return imgService.findAll();
    }

    /**
     * {@code GET  /imgs/:id} : get the "id" img.
     *
     * @param id the id of the imgDTO to retrieve.
     * @return the {@link ResponseEntity} with status {@code 200 (OK)} and with body the imgDTO, or with status {@code 404 (Not Found)}.
     */
    @GetMapping("/imgs/{id}")
    public ResponseEntity<ImgDTO> getImg(@PathVariable Long id) throws IOException {
        log.debug("REST request to get Img : {}", id);
        Optional<ImgDTO> imgDTO = imgService.findOne(id);

        String localPath = imgDTO.get().getImage_path();

        Path imgPath = Paths.get(localPath);
        byte[] imageBytes = Files.readAllBytes(imgPath);

        imgDTO.get().setImage(imageBytes);
        imgDTO.get().setImageContentType("image/jpeg");

        return ResponseUtil.wrapOrNotFound(imgDTO);
    }

    /**
     * {@code DELETE  /imgs/:id} : delete the "id" img.
     *
     * @param id the id of the imgDTO to delete.
     * @return the {@link ResponseEntity} with status {@code 204 (NO_CONTENT)}.
     */
    @DeleteMapping("/imgs/{id}")
    public ResponseEntity<Void> deleteImg(@PathVariable Long id) {
        log.debug("REST request to delete Img : {}", id);
        imgService.delete(id);
        return ResponseEntity.noContent().headers(HeaderUtil.createEntityDeletionAlert(applicationName, false, ENTITY_NAME, id.toString())).build();
    }
}
