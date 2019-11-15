package com.mycompany.myapp.web.rest;

import com.mycompany.myapp.ImageHandlerApp;
import com.mycompany.myapp.domain.Img;
import com.mycompany.myapp.repository.ImgRepository;
import com.mycompany.myapp.service.ImgService;
import com.mycompany.myapp.service.dto.ImgDTO;
import com.mycompany.myapp.service.mapper.ImgMapper;
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
import org.springframework.validation.Validator;

import javax.persistence.EntityManager;
import java.util.List;

import static com.mycompany.myapp.web.rest.TestUtil.createFormattingConversionService;
import static org.assertj.core.api.Assertions.assertThat;
import static org.hamcrest.Matchers.hasItem;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

/**
 * Integration tests for the {@link ImgResource} REST controller.
 */
@SpringBootTest(classes = ImageHandlerApp.class)
public class ImgResourceIT {

    private static final String DEFAULT_TITLE = "AAAAAAAAAA";
    private static final String UPDATED_TITLE = "BBBBBBBBBB";

    private static final String DEFAULT_CONTENT = "AAAAAAAAAA";
    private static final String UPDATED_CONTENT = "BBBBBBBBBB";

    private static final String DEFAULT_WRITER = "AAAAAAAAAA";
    private static final String UPDATED_WRITER = "BBBBBBBBBB";

    private static final String DEFAULT_DATE = "AAAAAAAAAA";
    private static final String UPDATED_DATE = "BBBBBBBBBB";

    private static final String DEFAULT_IMAGE_PATH = "AAAAAAAAAA";
    private static final String UPDATED_IMAGE_PATH = "BBBBBBBBBB";

    @Autowired
    private ImgRepository imgRepository;

    @Autowired
    private ImgMapper imgMapper;

    @Autowired
    private ImgService imgService;

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

    private MockMvc restImgMockMvc;

    private Img img;

    @BeforeEach
    public void setup() {
        MockitoAnnotations.initMocks(this);
        final ImgResource imgResource = new ImgResource(imgService);
        this.restImgMockMvc = MockMvcBuilders.standaloneSetup(imgResource)
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
    public static Img createEntity(EntityManager em) {
        Img img = new Img()
            .title(DEFAULT_TITLE)
            .content(DEFAULT_CONTENT)
            .writer(DEFAULT_WRITER)
            .date(DEFAULT_DATE)
            .image_path(DEFAULT_IMAGE_PATH);
        return img;
    }
    /**
     * Create an updated entity for this test.
     *
     * This is a static method, as tests for other entities might also need it,
     * if they test an entity which requires the current entity.
     */
    public static Img createUpdatedEntity(EntityManager em) {
        Img img = new Img()
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .writer(UPDATED_WRITER)
            .date(UPDATED_DATE)
            .image_path(UPDATED_IMAGE_PATH);
        return img;
    }

    @BeforeEach
    public void initTest() {
        img = createEntity(em);
    }

    @Test
    @Transactional
    public void createImg() throws Exception {
        int databaseSizeBeforeCreate = imgRepository.findAll().size();

        // Create the Img
        ImgDTO imgDTO = imgMapper.toDto(img);
        restImgMockMvc.perform(post("/api/imgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imgDTO)))
            .andExpect(status().isCreated());

        // Validate the Img in the database
        List<Img> imgList = imgRepository.findAll();
        assertThat(imgList).hasSize(databaseSizeBeforeCreate + 1);
        Img testImg = imgList.get(imgList.size() - 1);
        assertThat(testImg.getTitle()).isEqualTo(DEFAULT_TITLE);
        assertThat(testImg.getContent()).isEqualTo(DEFAULT_CONTENT);
        assertThat(testImg.getWriter()).isEqualTo(DEFAULT_WRITER);
        assertThat(testImg.getDate()).isEqualTo(DEFAULT_DATE);
        assertThat(testImg.getImage_path()).isEqualTo(DEFAULT_IMAGE_PATH);
    }

    @Test
    @Transactional
    public void createImgWithExistingId() throws Exception {
        int databaseSizeBeforeCreate = imgRepository.findAll().size();

        // Create the Img with an existing ID
        img.setId(1L);
        ImgDTO imgDTO = imgMapper.toDto(img);

        // An entity with an existing ID cannot be created, so this API call must fail
        restImgMockMvc.perform(post("/api/imgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imgDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Img in the database
        List<Img> imgList = imgRepository.findAll();
        assertThat(imgList).hasSize(databaseSizeBeforeCreate);
    }


    @Test
    @Transactional
    public void getAllImgs() throws Exception {
        // Initialize the database
        imgRepository.saveAndFlush(img);

        // Get all the imgList
        restImgMockMvc.perform(get("/api/imgs?sort=id,desc"))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.[*].id").value(hasItem(img.getId().intValue())))
            .andExpect(jsonPath("$.[*].title").value(hasItem(DEFAULT_TITLE.toString())))
            .andExpect(jsonPath("$.[*].content").value(hasItem(DEFAULT_CONTENT.toString())))
            .andExpect(jsonPath("$.[*].writer").value(hasItem(DEFAULT_WRITER.toString())))
            .andExpect(jsonPath("$.[*].date").value(hasItem(DEFAULT_DATE.toString())))
            .andExpect(jsonPath("$.[*].image_path").value(hasItem(DEFAULT_IMAGE_PATH.toString())));
    }
    
    @Test
    @Transactional
    public void getImg() throws Exception {
        // Initialize the database
        imgRepository.saveAndFlush(img);

        // Get the img
        restImgMockMvc.perform(get("/api/imgs/{id}", img.getId()))
            .andExpect(status().isOk())
            .andExpect(content().contentType(MediaType.APPLICATION_JSON_UTF8_VALUE))
            .andExpect(jsonPath("$.id").value(img.getId().intValue()))
            .andExpect(jsonPath("$.title").value(DEFAULT_TITLE.toString()))
            .andExpect(jsonPath("$.content").value(DEFAULT_CONTENT.toString()))
            .andExpect(jsonPath("$.writer").value(DEFAULT_WRITER.toString()))
            .andExpect(jsonPath("$.date").value(DEFAULT_DATE.toString()))
            .andExpect(jsonPath("$.image_path").value(DEFAULT_IMAGE_PATH.toString()));
    }

    @Test
    @Transactional
    public void getNonExistingImg() throws Exception {
        // Get the img
        restImgMockMvc.perform(get("/api/imgs/{id}", Long.MAX_VALUE))
            .andExpect(status().isNotFound());
    }

    @Test
    @Transactional
    public void updateImg() throws Exception {
        // Initialize the database
        imgRepository.saveAndFlush(img);

        int databaseSizeBeforeUpdate = imgRepository.findAll().size();

        // Update the img
        Img updatedImg = imgRepository.findById(img.getId()).get();
        // Disconnect from session so that the updates on updatedImg are not directly saved in db
        em.detach(updatedImg);
        updatedImg
            .title(UPDATED_TITLE)
            .content(UPDATED_CONTENT)
            .writer(UPDATED_WRITER)
            .date(UPDATED_DATE)
            .image_path(UPDATED_IMAGE_PATH);
        ImgDTO imgDTO = imgMapper.toDto(updatedImg);

        restImgMockMvc.perform(put("/api/imgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imgDTO)))
            .andExpect(status().isOk());

        // Validate the Img in the database
        List<Img> imgList = imgRepository.findAll();
        assertThat(imgList).hasSize(databaseSizeBeforeUpdate);
        Img testImg = imgList.get(imgList.size() - 1);
        assertThat(testImg.getTitle()).isEqualTo(UPDATED_TITLE);
        assertThat(testImg.getContent()).isEqualTo(UPDATED_CONTENT);
        assertThat(testImg.getWriter()).isEqualTo(UPDATED_WRITER);
        assertThat(testImg.getDate()).isEqualTo(UPDATED_DATE);
        assertThat(testImg.getImage_path()).isEqualTo(UPDATED_IMAGE_PATH);
    }

    @Test
    @Transactional
    public void updateNonExistingImg() throws Exception {
        int databaseSizeBeforeUpdate = imgRepository.findAll().size();

        // Create the Img
        ImgDTO imgDTO = imgMapper.toDto(img);

        // If the entity doesn't have an ID, it will throw BadRequestAlertException
        restImgMockMvc.perform(put("/api/imgs")
            .contentType(TestUtil.APPLICATION_JSON_UTF8)
            .content(TestUtil.convertObjectToJsonBytes(imgDTO)))
            .andExpect(status().isBadRequest());

        // Validate the Img in the database
        List<Img> imgList = imgRepository.findAll();
        assertThat(imgList).hasSize(databaseSizeBeforeUpdate);
    }

    @Test
    @Transactional
    public void deleteImg() throws Exception {
        // Initialize the database
        imgRepository.saveAndFlush(img);

        int databaseSizeBeforeDelete = imgRepository.findAll().size();

        // Delete the img
        restImgMockMvc.perform(delete("/api/imgs/{id}", img.getId())
            .accept(TestUtil.APPLICATION_JSON_UTF8))
            .andExpect(status().isNoContent());

        // Validate the database contains one less item
        List<Img> imgList = imgRepository.findAll();
        assertThat(imgList).hasSize(databaseSizeBeforeDelete - 1);
    }

    @Test
    @Transactional
    public void equalsVerifier() throws Exception {
        TestUtil.equalsVerifier(Img.class);
        Img img1 = new Img();
        img1.setId(1L);
        Img img2 = new Img();
        img2.setId(img1.getId());
        assertThat(img1).isEqualTo(img2);
        img2.setId(2L);
        assertThat(img1).isNotEqualTo(img2);
        img1.setId(null);
        assertThat(img1).isNotEqualTo(img2);
    }

    @Test
    @Transactional
    public void dtoEqualsVerifier() throws Exception {
        TestUtil.equalsVerifier(ImgDTO.class);
        ImgDTO imgDTO1 = new ImgDTO();
        imgDTO1.setId(1L);
        ImgDTO imgDTO2 = new ImgDTO();
        assertThat(imgDTO1).isNotEqualTo(imgDTO2);
        imgDTO2.setId(imgDTO1.getId());
        assertThat(imgDTO1).isEqualTo(imgDTO2);
        imgDTO2.setId(2L);
        assertThat(imgDTO1).isNotEqualTo(imgDTO2);
        imgDTO1.setId(null);
        assertThat(imgDTO1).isNotEqualTo(imgDTO2);
    }

    @Test
    @Transactional
    public void testEntityFromId() {
        assertThat(imgMapper.fromId(42L).getId()).isEqualTo(42);
        assertThat(imgMapper.fromId(null)).isNull();
    }
}
