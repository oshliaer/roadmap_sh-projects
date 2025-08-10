#!/usr/bin/env node
/// <reference path="types.js" />

/**
 * @param {string} username
 * @returns {Promise<Event[]>}
 */
const apiGithubUsersUsernameEvents = async (username, params) => {
  // https://api.github.com/users/<username>/events
  // https://docs.github.com/en/rest/using-the-rest-api/github-event-types
  const url = new URL(`https://api.github.com/users/${username}/events`);

  if (params?.page) {
    url.searchParams.set('page', params.page);
  }

  if (params?.['per_page']) {
    url.searchParams.set('per_page', params['per_page']);
  }

  console.log(url.toString());

  const response = await fetch(url);
  const data = await response.json();
  return data;
};

/**
 * @param {string[]} args
 * @returns {Parameters}
 */
const parseArgsToParameters = (args) => {
  const [username, ...rest] = args;
  const _username = username.toLowerCase();
  const _params = (rest || [])
    .reduce((acc, item) => {
      const item_ = item.split('=');
      acc.push(...item_);
      return acc;
    }, [])
    .reduce((acc, item, i, arr) => {
      if (String(item).startsWith('--')) {
        acc[item.slice(2)] = arr[i + 1] ?? '';
      }
      return acc;
    }, {});
  const parameters = {
    username: _username,
    params: _params,
  };
  return parameters;
};

const structOutput = (events) => {
  if (!Array.isArray(events) || events.length === 0) {
    // Это может произойти если пользователь новый или API вернул ошибку, которую мы обработали ранее
    return 'No public activity found for this user.';
  }

  return events
    .map((event) => {
      const repoName = event.repo.name;
      const createdAt = new Date(event.created_at).toLocaleDateString();

      switch (event.type) {
        case 'PushEvent': {
          const commitCount = event.payload.commits.length;
          const commit_s = commitCount > 1 ? 'commits' : 'commit';
          return `[${createdAt}] Pushed ${commitCount} ${commit_s} to ${repoName}`;
        }
        case 'WatchEvent':
          return `[${createdAt}] Starred the repository ${repoName}`;

        case 'CreateEvent':
          if (event.payload.ref_type === 'repository') {
            return `[${createdAt}] Created a new repository ${repoName}`;
          }
          if (event.payload.ref_type === 'branch') {
            return `[${createdAt}] Created a new branch "${event.payload.ref}" in ${repoName}`;
          }
          return `[${createdAt}] Performed a CreateEvent on ${repoName}`;

        case 'IssuesEvent':
          return `[${createdAt}] ${
            event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)
          } an issue in ${repoName}: "${event.payload.issue.title}"`;

        case 'PullRequestEvent':
          return `[${createdAt}] ${
            event.payload.action.charAt(0).toUpperCase() + event.payload.action.slice(1)
          } a pull request in ${repoName}`;

        default:
          // Для неразобранных событий можно выводить их тип
          return `[${createdAt}] Performed an event of type ${event.type} on ${repoName}`;
      }
    })
    .join('\n');
};

const help = () => {
  console.log('Usage: github-activity <user> [parameters]');
  console.log('Parameters:');
  console.log('  per_page <number> - Set the number of results per page');
  console.log('  page <number> - Set the page number to fetch');
  console.log('Help: github-activity --help - Returns this help message');
};

const main = async () => {
  try {
    const [_, __, ...args] = process.argv;
    const parameters = parseArgsToParameters(args);
    console.log(parameters);
    if (!parameters.username || parameters.username === '--help') {
      help();
      return;
    }
    console.log(`Fetching events for user: ${parameters.username}`);
    const events = await apiGithubUsersUsernameEvents(parameters.username, parameters.params);
    const structuredOutput = structOutput(events);
    console.log(structuredOutput);
  } catch (error) {
    console.error('Error:', error);
    console.error('');
    console.error(error.message);
    console.error('');
    help();
  }
};

main();
