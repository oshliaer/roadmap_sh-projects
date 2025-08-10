# GitHub User Activity

A command-line tool to fetch and display a user's public activity on GitHub.

## Usage

```sh
npx github-user-activity <user> [parameters]
```

Or after global installation:

```sh
npm install -g .
github-user-activity <user> [parameters]
```

## Parameters

- `<user>`: (Required) The GitHub username to fetch activity for.
- `--per_page <number>`: (Optional) Set the number of results per page.
- `--page <number>`: (Optional) Set the page number to fetch.
- `--help`: (Optional) Show the help message.

## Examples

- Fetch the latest activity for the user `oshliaer`:

    ```sh
    github-user-activity oshliaer
    ```

- Fetch the second page of activity for the user `oshliaer` with 10 results per page:

    ```sh
    github-user-activity oshliaer --per_page 10 --page 2
    ```
