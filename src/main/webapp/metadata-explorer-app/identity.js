/*
 *  Copyright 2016 Red Hat, Inc. and/or its affiliates
 *  and other contributors as indicated by the @author tags.
 *
 *  Licensed under the Apache License, Version 2.0 (the "License");
 *  you may not use this file except in compliance with the License.
 *  You may obtain a copy of the License at
 *
 *  http://www.apache.org/licenses/LICENSE-2.0
 *
 *  Unless required by applicable law or agreed to in writing, software
 *  distributed under the License is distributed on an "AS IS" BASIS,
 *  WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 *  See the License for the specific language governing permissions and
 *  limitations under the License.
 *
 */

/**
 * Creates an Identity object holding the information obtained from the access token issued by Keycloak, after a successful authentication,
 * and a few utility methods to manage it.
 */
(function (window, undefined) {
  var Identity = function (keycloak, loggedIn) {
    this.loggedIn = loggedIn;

    this.claims = {};
    if (keycloak.idTokenParsed !== undefined && keycloak.idTokenParsed.name !== undefined)
      this.claims.name = keycloak.idTokenParsed.name;

    this.authc = {};

    if (keycloak.token !== undefined) {
      this.authc.token = keycloak.token;
      this.authc.json = jwt_decode(keycloak.token);
      console.log(this.authc.json);
    }

    this.keycloak = keycloak;


    this.logout = function () {
      keycloak.logout();
    };

    this.account = function () {
      keycloak.accountManagement();
    };

    this.hasRole = function (name) {
      if (keycloak && keycloak.hasRealmRole(name)) {
        return true;
      }
      return false;
    };

    this.isAdmin = function () {
      return this.hasRole("admin");
    };
  }

  if (typeof module === "object" && module && typeof module.exports === "object") {
    module.exports = Identity;
  } else {
    window.Identity = Identity;

    if (typeof define === "function" && define.amd) {
      define("identity", [], function () {
        return Identity;
      });
    }
  }
})(window);