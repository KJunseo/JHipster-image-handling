package com.mycompany.myapp.service;

import com.mycompany.myapp.domain.Img;
import com.mycompany.myapp.repository.ImgRepository;
import com.mycompany.myapp.service.dto.ImgDTO;
import com.mycompany.myapp.service.mapper.ImgMapper;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.LinkedList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

/**
 * Service Implementation for managing {@link Img}.
 */
@Service
@Transactional
public class ImgService {

    private final Logger log = LoggerFactory.getLogger(ImgService.class);

    private final ImgRepository imgRepository;

    private final ImgMapper imgMapper;

    public ImgService(ImgRepository imgRepository, ImgMapper imgMapper) {
        this.imgRepository = imgRepository;
        this.imgMapper = imgMapper;
    }

    /**
     * Save a img.
     *
     * @param imgDTO the entity to save.
     * @return the persisted entity.
     */
    public ImgDTO save(ImgDTO imgDTO) {
        log.debug("Request to save Img : {}", imgDTO);
        Img img = imgMapper.toEntity(imgDTO);
        img = imgRepository.save(img);
        return imgMapper.toDto(img);
    }

    /**
     * Get all the imgs.
     *
     * @return the list of entities.
     */
    @Transactional(readOnly = true)
    public List<ImgDTO> findAll() {
        log.debug("Request to get all Imgs");
        return imgRepository.findAll().stream()
            .map(imgMapper::toDto)
            .collect(Collectors.toCollection(LinkedList::new));
    }


    /**
     * Get one img by id.
     *
     * @param id the id of the entity.
     * @return the entity.
     */
    @Transactional(readOnly = true)
    public Optional<ImgDTO> findOne(Long id) {
        log.debug("Request to get Img : {}", id);
        return imgRepository.findById(id)
            .map(imgMapper::toDto);
    }

    /**
     * Delete the img by id.
     *
     * @param id the id of the entity.
     */
    public void delete(Long id) {
        log.debug("Request to delete Img : {}", id);
        imgRepository.deleteById(id);
    }

}
