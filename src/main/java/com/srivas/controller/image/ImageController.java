package com.srivas.controller.image;

import com.srivas.exception.ErrorsEnum;
import com.srivas.util.JsonResponse;
import org.springframework.core.io.ClassPathResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

@RestController
@RequestMapping("/images")
@CrossOrigin(origins = "http://localhost:3000")
public class ImageController implements IImageController {

    @GetMapping("/{folderId}/{imageId}")
    public ResponseEntity<ClassPathResource> getImage(@PathVariable String folderId, @PathVariable String imageId) throws IOException {
        ClassPathResource classPathResource = new ClassPathResource("static/images/" + folderId + "/" + imageId);

        if (classPathResource.exists() && classPathResource.isReadable()) {
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(getContentType(".jpg"));
            headers.setContentType(getContentType(".png"));
            headers.setContentType(getContentType(".gif"));
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
    public ResponseEntity<JsonResponse<Object>> getImagesInFolder(@PathVariable String folderId) {
        HashMap<String, Object> hashMap = new HashMap<>();

        String folderPath = "src/main/resources/static/images/" + folderId;
        File directory = new File(folderPath);
        File[] files = directory.listFiles();

        if (files == null || files.length == 0) {
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.NO_IMAGE_FOUND, hashMap, false),
                    HttpStatus.NOT_FOUND);
        }

        List<String> fileNames = new ArrayList<>();
        for (File file : files) {
            if (file.isFile()) {
                fileNames.add(file.getName());
            }
        }

        if (fileNames.isEmpty()) {
            return new ResponseEntity<>(new JsonResponse<>(ErrorsEnum.NO_IMAGE_FOUND, hashMap, false),
                    HttpStatus.NOT_FOUND);

        }
        hashMap.put("images", fileNames);
        return new ResponseEntity<>(new JsonResponse<>("Images Available", hashMap, true), HttpStatus.OK);
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
