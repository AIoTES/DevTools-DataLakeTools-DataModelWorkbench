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

package eu.activageproject.tool.config;

import com.github.mongobee.Mongobee;

import io.github.simlife.config.SimlifeConstants;
import io.github.simlife.domain.util.JSR310DateConverters.*;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.Cloud;
import org.springframework.cloud.CloudException;
import org.springframework.cloud.config.java.AbstractCloudConfig;
import org.springframework.cloud.service.ServiceInfo;
import org.springframework.cloud.service.common.MongoServiceInfo;
import org.springframework.context.annotation.*;
import org.springframework.core.convert.converter.Converter;
import org.springframework.data.mongodb.MongoDbFactory;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.convert.CustomConversions;
import org.springframework.data.mongodb.core.mapping.event.ValidatingMongoEventListener;
import org.springframework.data.mongodb.repository.config.EnableMongoRepositories;
import org.springframework.validation.beanvalidation.LocalValidatorFactoryBean;

import java.util.ArrayList;
import java.util.List;

@Configuration
@EnableMongoRepositories("eu.activageproject.tool.repository")
@Profile(SimlifeConstants.SPRING_PROFILE_CLOUD)
public class CloudDatabaseConfiguration extends AbstractCloudConfig {

    private final Logger log = LoggerFactory.getLogger(CloudDatabaseConfiguration.class);

    @Bean
    public MongoDbFactory mongoFactory() {
        return connectionFactory().mongoDbFactory();
    }

    @Bean
    public LocalValidatorFactoryBean validator() {
        return new LocalValidatorFactoryBean();
    }

    @Bean
    public ValidatingMongoEventListener validatingMongoEventListener() {
        return new ValidatingMongoEventListener(validator());
    }

    @Bean
    public CustomConversions customConversions() {
        List<Converter<?, ?>> converterList = new ArrayList<>();
        converterList.add(DateToZonedDateTimeConverter.INSTANCE);
        converterList.add(ZonedDateTimeToDateConverter.INSTANCE);
        return new CustomConversions(converterList);
    }

    @Bean
    public Mongobee mongobee(MongoDbFactory mongoDbFactory, MongoTemplate mongoTemplate, Cloud cloud) {
        log.debug("Configuring Cloud Mongobee");
        List<ServiceInfo> matchingServiceInfos = cloud.getServiceInfos(MongoDbFactory.class);

        if (matchingServiceInfos.size() != 1) {
            throw new CloudException("No unique service matching MongoDbFactory found. Expected 1, found "
                + matchingServiceInfos.size());
        }
        MongoServiceInfo info = (MongoServiceInfo) matchingServiceInfos.get(0);
        Mongobee mongobee = new Mongobee(info.getUri());
        mongobee.setDbName(mongoDbFactory.getDb().getName());
        mongobee.setMongoTemplate(mongoTemplate);
        // package to scan for migrations
        mongobee.setChangeLogsScanPackage("eu.activageproject.tool.config.dbmigrations");
        mongobee.setEnabled(true);
        return mongobee;
    }
}
