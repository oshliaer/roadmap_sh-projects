/**
 * @typedef {{
 *   id: number,
 *   login: string,
 *   display_login: string,
 *   gravatar_id: string,
 *   url: string,
 *   avatar_url: string
 * }} Actor
 */

/**
 * @typedef {{
 *   id: number,
 *   name: string,
 *   url: string
 * }} Repo
 */

/**
 * @typedef {{
 *   id: number,
 *   login: string,
 *   gravatar_id: string,
 *   url: string,
 *   avatar_url: string
 * }} Org
 */

/**
 * @typedef {{
 *   id: number,
 *   type: string,
 *   actor: Actor,
 *   repo: Repo,
 *   payload: object,
 *   public: boolean,
 *   created_at: string,
 *   org?: Org
 * }} Event
 */

/**
 * @typedef {{
 *   username: string,
 *   params: string[]
 * }} Parameters
 */