package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.ImageHandlerApp;
import com.mycompany.myapp.domain.UploadImage;
import com.mycompany.myapp.repository.UploadImageRepository;
import com.mycompany.myapp.service.UploadImageService;
import com.mycompany.myapp.web.rest.errors.ExceptionTranslator;

import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.MockitoAnnotations;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.web.PageableHandlerMethodArgumentResolver;
import org.springframework.http.MediaType;
import org.springframework.http.converter.json.MappingJackson2HttpMessageConverter;
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.test.web.servlet.setup.MockMvcBuilders;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.Base64Utils;
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link UploadImageResource} REST controller.
 */
@SpringBootTest(classes = ImageHandlerApp.class)
public class UploadImageResourceIT {

    private static final String DEFAULT_IMAGE_NAME = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_NAME = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_PATH = "BBBBBBBBBB";

    private static final byte[] DEFAULT_IMAGE = TestUtil.createByteArray(1, "0");
    private static final byte[] UPDATED_IMAGE = TestUtil.createByteArray(1, "1");
    private static final String DEFAULT_IMAGE_CONTENT_TYPE = "image/jpg";
    private static final String UPDATED_IMAGE_CONTENT_TYPE = "image/png";

    @Autowired
    private UploadImageRepository uploadImageRepository;

    @Autowired
    private UploadImageService uploadImageService;

    @Autowired
    private MappingJackson2HttpMessageConverter jacksonMessageConverter;

    @Autowired
    private PageableHandlerMethodArgumentResolver pageableArgumentResolver;

    @Autowired
    private ExceptionTranslator exceptionTranslator;

    @Autowired
    private EntityManager em;

    @Autowired
    private Validator validator;

    private MockMvc restUploadImageMockMvc;

    private UploadImage uploadImage;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final UploadImageResource uploadImageResource = new UploadImageResource(uploadImageService);
        this.restUploadImageMockMvc = MockMvcBuilders.standaloneSetup(uploadImageResource)
            .setCustomArgumentResolvers(pageableArgumentResolver)
            .setControllerAdvice(exceptionTranslator)
            .setConversionService(createFormattingConversionService())
            .setMessageConverters(jacksonMessageConverter)
            .setValidator(validator).build();
    }

    /**
     * Create an entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UploadImage createEntity(EntityManager em) {
        UploadImage uploadImage = new UploadImage()
            .imageName(DEFAULT_IMAGE_NAME)
            .imagePath(DEFAULT_IMAGE_PATH)
            .image(DEFAULT_IMAGE)
            .imageContentType(DEFAULT_IMAGE_CONTENT_TYPE);
        return uploadImage;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static UploadImage createUpdatedEntity(EntityManager em) {
        UploadImage uploadImage = new UploadImage()
            .imageName(UPDATED_IMAGE_NAME)
            .imagePath(UPDATED_IMAGE_PATH)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);
        return uploadImage;
    }

    @BeforeEach
    public void initTest() {
        uploadImage = createEntity(em);
    }

    @Test
    @Transactional
    public void createUploadImage() throws Exception {
        int databaseSizeBeforeCreate = uploadImageRepository.findAll().size();

        // Create the UploadImage
        restUploadImageMockMvc.perform(post("/api/upload-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uploadImage)))
            .andExpect(status().isCreated());

        // Validate the UploadImage in the database
        List<UploadImage> uploadImageList = uploadImageRepository.findAll();
        assertThat(uploadImageList).hasSize(databaseSizeBeforeCreate + 1);
        UploadImage testUploadImage = uploadImageList.get(uploadImageList.size() - 1);
        assertThat(testUploadImage.getImageName()).isEqualTo(DEFAULT_IMAGE_NAME);
        assertThat(testUploadImage.getImagePath()).isEqualTo(DEFAULT_IMAGE_PATH);
        assertThat(testUploadImage.getImage()).isEqualTo(DEFAULT_IMAGE);
        assertThat(testUploadImage.getImageContentType()).isEqualTo(DEFAULT_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void createUploadImageWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = uploadImageRepository.findAll().size();

        // Create the UploadImage with an existing ID
        uploadImage.setId(1L);

        // An entity with an existing ID cannot be created, so this API call must fail
        restUploadImageMockMvc.perform(post("/api/upload-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uploadImage)))
            .andExpect(status().isBadRequest());

        // Validate the UploadImage in the database
        List<UploadImage> uploadImageList = uploadImageRepository.findAll();
        assertThat(uploadImageList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllUploadImages() throws Exception {
        // Initialize the database
        uploadImageRepository.saveAndFlush(uploadImage);

        // Get all the uploadImageList
        restUploadImageMockMvc.perform(get("/api/upload-images?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(uploadImage.getId().intValue())))
            .andExpect(jsonPath("$.[*].imageName").value(hasItem(DEFAULT_IMAGE_NAME.toString())))
            .andExpect(jsonPath("$.[*].imagePath").value(hasItem(DEFAULT_IMAGE_PATH.toString())))
            .andExpect(jsonPath("$.[*].imageContentType").value(hasItem(DEFAULT_IMAGE_CONTENT_TYPE)))
            .andExpect(jsonPath("$.[*].image").value(hasItem(Base64Utils.encodeToString(DEFAULT_IMAGE))));
    }
    
    @Test
    @Transactional
    public void getUploadImage() throws Exception {
        // Initialize the database
        uploadImageRepository.saveAndFlush(uploadImage);

        // Get the uploadImage
        restUploadImageMockMvc.perform(get("/api/upload-images/{id}", uploadImage.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(uploadImage.getId().intValue()))
            .andExpect(jsonPath("$.imageName").value(DEFAULT_IMAGE_NAME.toString()))
            .andExpect(jsonPath("$.imagePath").value(DEFAULT_IMAGE_PATH.toString()))
            .andExpect(jsonPath("$.imageContentType").value(DEFAULT_IMAGE_CONTENT_TYPE))
            .andExpect(jsonPath("$.image").value(Base64Utils.encodeToString(DEFAULT_IMAGE)));
    }

    @Test
    @Transactional
    public void getNonExistingUploadImage() throws Exception {
        // Get the uploadImage
        restUploadImageMockMvc.perform(get("/api/upload-images/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateUploadImage() throws Exception {
        // Initialize the database
        uploadImageService.save(uploadImage);

        int databaseSizeBeforeUpdate = uploadImageRepository.findAll().size();

        // Update the uploadImage
        UploadImage updatedUploadImage = uploadImageRepository.findById(uploadImage.getId()).get();
        // Disconnect from session so that the updates on updatedUploadImage are not directly saved in db
        em.detach(updatedUploadImage);
        updatedUploadImage
            .imageName(UPDATED_IMAGE_NAME)
            .imagePath(UPDATED_IMAGE_PATH)
            .image(UPDATED_IMAGE)
            .imageContentType(UPDATED_IMAGE_CONTENT_TYPE);

        restUploadImageMockMvc.perform(put("/api/upload-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(updatedUploadImage)))
            .andExpect(status().isOk());

        // Validate the UploadImage in the database
        List<UploadImage> uploadImageList = uploadImageRepository.findAll();
        assertThat(uploadImageList).hasSize(databaseSizeBeforeUpdate);
        UploadImage testUploadImage = uploadImageList.get(uploadImageList.size() - 1);
        assertThat(testUploadImage.getImageName()).isEqualTo(UPDATED_IMAGE_NAME);
        assertThat(testUploadImage.getImagePath()).isEqualTo(UPDATED_IMAGE_PATH);
        assertThat(testUploadImage.getImage()).isEqualTo(UPDATED_IMAGE);
        assertThat(testUploadImage.getImageContentType()).isEqualTo(UPDATED_IMAGE_CONTENT_TYPE);
    }

    @Test
    @Transactional
    public void updateNonExistingUploadImage() throws Exception {
        int databaseSizeBeforeUpdate = uploadImageRepository.findAll().size();

        // Create the UploadImage

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restUploadImageMockMvc.perform(put("/api/upload-images")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(uploadImage)))
            .andExpect(status().isBadRequest());

        // Validate the UploadImage in the database
        List<UploadImage> uploadImageList = uploadImageRepository.findAll();
        assertThat(uploadImageList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteUploadImage() throws Exception {
        // Initialize the database
        uploadImageService.save(uploadImage);

        int databaseSizeBeforeDelete = uploadImageRepository.findAll().size();

        // Delete the uploadImage
        restUploadImageMockMvc.perform(delete("/api/upload-images/{id}", uploadImage.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<UploadImage> uploadImageList = uploadImageRepository.findAll();
        assertThat(uploadImageList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(UploadImage.class);
        UploadImage uploadImage1 = new UploadImage();
        uploadImage1.setId(1L);
        UploadImage uploadImage2 = new UploadImage();
        uploadImage2.setId(uploadImage1.getId());
        assertThat(uploadImage1).isEqualTo(uploadImage2);
        uploadImage2.setId(2L);
        assertThat(uploadImage1).isNotEqualTo(uploadImage2);
        uploadImage1.setId(null);
        assertThat(uploadImage1).isNotEqualTo(uploadImage2);
    }
}
