/** 
* Copyright 2020 National University of Ireland Galway 
* 
* See the NOTICE file distributed with this work for additional information
* regarding copyright ownership.
*
* Licensed under the EUPL, Version 1.2 or – as soon the European Commission 
* approves - subsequent versions of the EUPL (the "Licence"); 
* You may not use this work except in compliance with the Licence. 
* You may obtain a copy of the Licence at: 
*
*     https://joinup.ec.europa.eu/software/page/eupl 
*
* Unless required by applicable law or agreed to in writing, software 
* distributed under the Licence is distributed on an "AS IS" basis, 
* WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied. 
* See the Licence for the specific language governing permissions and 
* limitations under the Licence. 
*/

package eu.activageproject.tool.service.impl;

import eu.activageproject.tool.service.SchemaService;
import eu.activageproject.tool.domain.Schema;
import eu.activageproject.tool.repository.SchemaRepository;
import eu.activageproject.tool.repository.search.SchemaSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Schema.
 */
@Service
public class SchemaServiceImpl implements SchemaService {

    private final Logger log = LoggerFactory.getLogger(SchemaServiceImpl.class);

    private final SchemaRepository schemaRepository;

    private final SchemaSearchRepository schemaSearchRepository;

    public SchemaServiceImpl(SchemaRepository schemaRepository, SchemaSearchRepository schemaSearchRepository) {
        this.schemaRepository = schemaRepository;
        this.schemaSearchRepository = schemaSearchRepository;
    }

    /**
     * Save a schema.
     *
     * @param schema the entity to save
     * @return the persisted entity
     */
    @Override
    public Schema save(Schema schema) {
        log.debug("Request to save Schema : {}", schema);
        Schema result = schemaRepository.save(schema);
        schemaSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the schemata.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<Schema> findAll(Pageable pageable) {
        log.debug("Request to get all Schemata");
        return schemaRepository.findAll(pageable);
    }

    /**
     * Get one schema by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Schema findOne(String id) {
        log.debug("Request to get Schema : {}", id);
        return schemaRepository.findOne(id);
    }

    /**
     * Delete the schema by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Schema : {}", id);
        schemaRepository.delete(id);
        schemaSearchRepository.delete(id);
    }

    /**
     * Search for the schema corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<Schema> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Schemata for query {}", query);
        Page<Schema> result = schemaSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
