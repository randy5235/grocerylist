## Synopsis

This repository provides a REST API service for building a grocery list like application that allows you to share lists between users. Targeted for node 7.10.0 or higher. Using a postgres cloud based backend. Currently hosted on elephantsql.com. Place url in config/db.json as follows:
```
{
  "URL":"postgres://USERNAME:password@HOST:port/databaseName",
  "sessionSecret":"placeyoursessionsecrether"
}
```
<!--- ## Code Example

Show what the library does as concisely as possible, developers should be able to figure out **how** your project solves their problem by looking at the code example. Make sure the API you are showing off is obvious, and that your code is short and concise.

## Motivation

A short description of the motivation behind the creation and maintenance of the project. This should explain **why** the project exists.

## Installation

Provide code examples and explanations of how to get the project.

## API Reference

Depending on the size of the project, if it is small and simple enough the reference docs can be added to the README. For medium size to larger projects it is important to at least provide a link to where the API reference docs live.
--->

## Tests

Describe and show how to run the tests with code examples.

To test the basic API against the API documentation:

```npm run dredd```

This will start the project and run API blueprint tests against it.
<!---

## Contributors

Let people know how they can dive into the project, include important links to things like issue trackers, irc, twitter accounts if applicable. --->

## License
Licensed GPLv3 2017