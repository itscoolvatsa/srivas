package com.srivas.controller.image;

import com.srivas.util.JsonResponse;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;

import java.io.IOException;
import java.util.List;

public interface IImageController {
    @GetMapping("/{folderId}/{imageId}")
    public ResponseEntity<ClassPathResource> getImage(@PathVariable String folderId, @PathVariable String imageId) throws IOException;

    @GetMapping("/{folderId}")
    public ResponseEntity<JsonResponse<Object>> getImagesInFolder(@PathVariable String folderId);
}
