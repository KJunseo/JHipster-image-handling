package com.mycompany.myapp.service.mapper;

import com.mycompany.myapp.domain.*;
import com.mycompany.myapp.service.dto.ImgDTO;

import org.mapstruct.*;

/**
 * Mapper for the entity {@link Img} and its DTO {@link ImgDTO}.
 */
@Mapper(componentModel = "spring", uses = {})
public interface ImgMapper extends EntityMapper<ImgDTO, Img> {



    default Img fromId(Long id) {
        if (id == null) {
            return null;
        }
        Img img = new Img();
        img.setId(id);
        return img;
    }
}
