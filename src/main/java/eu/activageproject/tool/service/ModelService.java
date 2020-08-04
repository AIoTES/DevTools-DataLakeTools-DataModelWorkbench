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

import eu.activageproject.tool.domain.Model;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

/**
 * Service Interface for managing Model.
 */
public interface ModelService {

    /**
     * Save a model.
     *
     * @param model the entity to save
     * @return the persisted entity
     */
    Model save(Model model);

    /**
     * Get all the models.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Model> findAll(Pageable pageable);

    /**
     * Get the "id" model.
     *
     * @param id the id of the entity
     * @return the entity
     */
    Model findOne(String id);

    /**
     * Delete the "id" model.
     *
     * @param id the id of the entity
     */
    void delete(String id);

    /**
     * Search for the model corresponding to the query.
     *
     * @param query the query of the search
     * 
     * @param pageable the pagination information
     * @return the list of entities
     */
    Page<Model> search(String query, Pageable pageable);
}
