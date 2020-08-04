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

import eu.activageproject.tool.domain.Table;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Table.
 */
public interface TableService {

    /**
     * Save a table.
     *
     * @param table the entity to save
     * @return the persisted entity
     */
    Table save(Table table);

    /**
     * Get all the tables.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Table> findAll(Pageable pageable);

    /**
     * Get the "id" table.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Table findOne(String id);

    /**
     * Delete the "id" table.
     *
     * @param id the id of the entity
     */
    void delete(String id);

    /**
     * Search for the table corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Table> search(String query, Pageable pageable);
}
