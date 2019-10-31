package eu.activageproject.tool.web.rest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

/**
 * REST controller for getting API base URLs.
 */
@CrossOrigin(origins = "*", maxAge = 1800, allowedHeaders = "*", exposedHeaders = "Authorization,Link,X-Total-Count", methods = {RequestMethod.OPTIONS, RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST, RequestMethod.DELETE})
@RestController
@RequestMapping("/api")
public class ApiUrlResource {

    private final Logger log = LoggerFactory.getLogger(ApiUrlResource.class);

    private static final String ENTITY_NAME = "apiurl";
    
    @Autowired
    private Environment env;

//    private final ModelService modelService;
//
//    public ModelResource(ModelService modelService) {
//        this.modelService = modelService;
//    }


    /**
     * GET  /mds : get metadata storage server api base url.
     *
     * 
     * @return the ResponseEntity with status 200 (OK) and the api base url in body
     */
    @GetMapping("/mds")
    @Timed
    public ResponseEntity<String> getMDSUrl() {
        log.debug("REST request to get metadata storage server api url");
        return ResponseEntity.ok()
    			.body(env.getProperty("api.mds"));
    }
    
    
    /**
     * GET  /ids : get independent data storage api base url.
     *
     * 
     * @return the ResponseEntity with status 200 (OK) and the api base url in body
     */
    @GetMapping("/ids")
    @Timed
    public ResponseEntity<String> getIDSUrl() {
        log.debug("REST request to get independent data storage api url");
        return ResponseEntity.ok()
    			.body(env.getProperty("api.ids"));
    }
    
    
    /**
     * GET  /qe : get query execution api base url.
     *
     * 
     * @return the ResponseEntity with status 200 (OK) and the api base url in body
     */
    @GetMapping("/qe")
    @Timed
    public ResponseEntity<String> getQEUrl() {
        log.debug("REST request to get query execution api url");
        return ResponseEntity.ok()
    			.body(env.getProperty("api.qe"));
    }

}
