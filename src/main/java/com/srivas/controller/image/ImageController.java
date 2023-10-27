package com.srivas.controller.image;

import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/images")
public class ImageController implements IImageController {

    @GetMapping("/{folderId}/{imageId}")
    public ResponseEntity<ClassPathResource> getImage(@PathVariable String folderId, @PathVariable String imageId) throws IOException {
        ClassPathResource classPathResource = new ClassPathResource("static/images/" + folderId + "/" + imageId);
        System.out.println(classPathResource.getPath());
        // Check if the image exists and is readable

        if (classPathResource.exists() && classPathResource.isReadable()) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(getContentType(".jpg"));
            return ResponseEntity
                    .ok()
                    .headers(headers)
                    .body(classPathResource);
        } else {
            return ResponseEntity
                    .notFound()
                    .build();
        }
    }

    @GetMapping("/{folderId}")
    public ResponseEntity<List<String>> getImagesInFolder(@PathVariable String folderId) {
        String folderPath = "src/main/resources/static/images/" + folderId;
        File directory = new File(folderPath);
        File[] files = directory.listFiles();

        if (files == null || files.length == 0) {
            return ResponseEntity.notFound().build();
        }

        List<String> fileNames = new ArrayList<>();
        for (File file : files) {
            if (file.isFile()) {
                fileNames.add(file.getName());
            }
        }

        if (fileNames.isEmpty()) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(fileNames);
    }


    private MediaType getContentType(String imageId) {
        if (imageId.endsWith(".png")) {
            return MediaType.IMAGE_PNG;
        } else if (imageId.endsWith(".jpg") || imageId.endsWith(".jpeg")) {
            return MediaType.IMAGE_JPEG;
        } else if (imageId.endsWith(".gif")) {
            return MediaType.IMAGE_GIF;
        } else {
            return MediaType.APPLICATION_OCTET_STREAM;
        }
    }
}
