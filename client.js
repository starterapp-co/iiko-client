const { addMinutes, jsonOrThrowError } = require('./utils');

class IikoClient {
  #apiLogin;
  #authToken;
  #baseUrl;
  #authTokenExpirationTimestamp;

  constructor({ apiLogin, baseUrl = 'https://api-ru.iiko.services/api' }) {
    this.#apiLogin = apiLogin;
    this.#baseUrl = baseUrl;
  }

  get apiToken() {
    return this.#apiLogin;
  };

  async getAuthToken(options = { timeout: 15 }) {
    if (new Date().getTime() < this.#authTokenExpirationTimestamp) return this.#authToken;
    this.#authToken = await this.#fetchAuthToken({ timeout: options.timeout })
      .then((r) => `Bearer ${r.token}`);
    this.#authTokenExpirationTimestamp = addMinutes(new Date(), 59);
    return this.#authToken;
  }

  async getTerminals({
                       timeout = 15, organizationIds,
                       includeDisabled,
                       returnExternalData,
                     }) {
    return this.request({
      path: '/1/terminal_groups',
      timeout,
      body: {
        organizationIds,
        includeDisabled,
        returnExternalData,
      },
    });
  }

  async getOrganizations({
                           organizationIds = null,
                           returnAdditionalInfo,
                           includeDisabled,
                           returnExternalData,
                           timeout = 15,
                         }) {
    return this.request({
      path: '/1/organizations',
      timeout,
      body: {
        organizationIds, returnAdditionalInfo, includeDisabled, returnExternalData,
      },
    });
  }

  async #fetchAuthToken({ timeout = 15 }) {
    return this.request({
      path: '/1/access_token',
      customHeaders: {
        Timeout: timeout.toString(),
        'Content-Type': 'application/json',
      },
      body: { apiLogin: this.#apiLogin },
    });
  }

  async request({
                  path,
                  timeout,
                  body,
                  customHeaders,
                }) {
    const options = {
      headers: customHeaders
        ?? {
          Timeout: timeout.toString(),
          Authorization: await this.getAuthToken({ timeout }),
          'Content-Type': 'application/json',
        },
      method: 'POST',
      body: body ? JSON.stringify(body) : undefined,
    };
    return fetch(
      this.#baseUrl + path,
      options,
    ).then(jsonOrThrowError);
  }
}

module.exports = { IikoClient };