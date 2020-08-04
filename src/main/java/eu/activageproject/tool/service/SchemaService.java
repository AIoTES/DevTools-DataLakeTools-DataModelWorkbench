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
package eu.activageproject.tool.service;

import eu.activageproject.tool.domain.Schema;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Schema.
 */
public interface SchemaService {

    /**
     * Save a schema.
     *
     * @param schema the entity to save
     * @return the persisted entity
     */
    Schema save(Schema schema);

    /**
     * Get all the schemata.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Schema> findAll(Pageable pageable);

    /**
     * Get the "id" schema.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Schema findOne(String id);

    /**
     * Delete the "id" schema.
     *
     * @param id the id of the entity
     */
    void delete(String id);

    /**
     * Search for the schema corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Schema> search(String query, Pageable pageable);
}
