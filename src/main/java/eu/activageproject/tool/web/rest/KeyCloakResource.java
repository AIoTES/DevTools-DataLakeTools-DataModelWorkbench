package eu.activageproject.tool.web.rest;

import java.util.HashMap;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import com.codahale.metrics.annotation.Timed;

/**
 * REST controller for getting keycloak configurations.
 */
@CrossOrigin(origins = "*", maxAge = 1800, allowedHeaders = "*", exposedHeaders = "Authorization,Link,X-Total-Count", methods = {RequestMethod.OPTIONS, RequestMethod.GET, RequestMethod.PUT, RequestMethod.POST, RequestMethod.DELETE})
@RestController
@RequestMapping("/api")
public class KeyCloakResource {

    private final Logger log = LoggerFactory.getLogger(KeyCloakResource.class);

    private static final String ENTITY_NAME = "keycloak";
    
    @Autowired
    private Environment env;


    /**
     * GET  /keyCloakConfig : get keycloak configurations.
     *
     * 
     * @return the ResponseEntity with status 200 (OK) and the keycloak configurations.
     */
    @GetMapping("/keyCloakConfig")
    @Timed
    public ResponseEntity<Map<String, String>> getKeyCloakConfig() {
        log.debug("REST request to get keycloak configurations");
        
        Map<String, String> keyCloakConfig = new HashMap<String, String>();
        
        if(env.containsProperty("keycloak.realm")) {
        	keyCloakConfig.put("realm", env.getProperty("keycloak.realm"));
        }
        
        if(env.containsProperty("keycloak.resource")) {
        	keyCloakConfig.put("clientId", env.getProperty("keycloak.resource"));
        }
        
        if(env.containsProperty("keycloak.realm-public-key")) {
        	keyCloakConfig.put("realm_public_key", env.getProperty("keycloak.realm-public-key"));
        }
        
        if(env.containsProperty("keycloak.auth-server-url")) {
        	keyCloakConfig.put("url", env.getProperty("keycloak.auth-server-url"));
        }
        
        if(env.containsProperty("keycloak.ssl-required")) {
        	keyCloakConfig.put("ssl_required", env.getProperty("keycloak.ssl-required"));
        }
        
        if(env.containsProperty("keycloak.use-resource-role-mappings")) {
        	keyCloakConfig.put("use_resource_role_mappings", env.getProperty("keycloak.use-resource-role-mappings"));
        }
        
        if(env.containsProperty("keycloak.enable-cors")) {
        	keyCloakConfig.put("enable_cors", env.getProperty("keycloak.enable-cors"));
        	keyCloakConfig.put("cors_max_age", env.getProperty("keycloak.cors-max-age", "1000"));
        	keyCloakConfig.put("cors_allowed_methods", env.getProperty("keycloak.cors-allowed-methods", "POST, PUT, DELETE, GET"));
        }
        
        if(env.containsProperty("keycloak.bearer-only")) {
        	keyCloakConfig.put("bearer_only", env.getProperty("keycloak.bearer-only"));
        }
        
        if(env.containsProperty("keycloak.enable-basic-auth")) {
        	keyCloakConfig.put("enable_basic_auth", env.getProperty("keycloak.enable-basic-auth"));
        }
        
        if(env.containsProperty("keycloak.expose-token")) {
        	keyCloakConfig.put("expose_token", env.getProperty("keycloak.expose-token"));
        }
        
        if(env.containsProperty("keycloak.secret")) {
        	keyCloakConfig.put("secret", env.getProperty("keycloak.secret"));
        }
        
        if(env.containsProperty("keycloak.allow-any-hostname")) {
        	keyCloakConfig.put("allow_any_hostname", env.getProperty("keycloak.allow-any-hostname"));
        }
        
        if(env.containsProperty("keycloak.public-client")) {
        	keyCloakConfig.put("public_client", env.getProperty("keycloak.public-client"));
        }
        
        if(env.containsProperty("keycloak.confidential-port")) {
        	keyCloakConfig.put("confidential_port", env.getProperty("keycloak.confidential-port"));
        } 
        
        
        return ResponseEntity.ok()
    			.body(keyCloakConfig);
    }

}
