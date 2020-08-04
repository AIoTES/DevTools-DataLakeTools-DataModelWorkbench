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

import eu.activageproject.tool.service.ModelService;
import eu.activageproject.tool.domain.Model;
import eu.activageproject.tool.repository.ModelRepository;
import eu.activageproject.tool.repository.search.ModelSearchRepository;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;


import static org.elasticsearch.index.query.QueryBuilders.*;

/**
 * Service Implementation for managing Model.
 */
@Service
public class ModelServiceImpl implements ModelService {

    private final Logger log = LoggerFactory.getLogger(ModelServiceImpl.class);

    private final ModelRepository modelRepository;

    private final ModelSearchRepository modelSearchRepository;

    public ModelServiceImpl(ModelRepository modelRepository, ModelSearchRepository modelSearchRepository) {
        this.modelRepository = modelRepository;
        this.modelSearchRepository = modelSearchRepository;
    }

    /**
     * Save a model.
     *
     * @param model the entity to save
     * @return the persisted entity
     */
    @Override
    public Model save(Model model) {
        log.debug("Request to save Model : {}", model);
        Model result = modelRepository.save(model);
        modelSearchRepository.save(result);
        return result;
    }

    /**
     * Get all the models.
     *
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<Model> findAll(Pageable pageable) {
        log.debug("Request to get all Models");
        return modelRepository.findAll(pageable);
    }

    /**
     * Get one model by id.
     *
     * @param id the id of the entity
     * @return the entity
     */
    @Override
    public Model findOne(String id) {
        log.debug("Request to get Model : {}", id);
        return modelRepository.findOne(id);
    }

    /**
     * Delete the model by id.
     *
     * @param id the id of the entity
     */
    @Override
    public void delete(String id) {
        log.debug("Request to delete Model : {}", id);
        modelRepository.delete(id);
        modelSearchRepository.delete(id);
    }

    /**
     * Search for the model corresponding to the query.
     *
     * @param query the query of the search
     * @param pageable the pagination information
     * @return the list of entities
     */
    @Override
    public Page<Model> search(String query, Pageable pageable) {
        log.debug("Request to search for a page of Models for query {}", query);
        Page<Model> result = modelSearchRepository.search(queryStringQuery(query), pageable);
        return result;
    }
}
