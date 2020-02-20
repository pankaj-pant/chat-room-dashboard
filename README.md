# Dashboard Application

A simple dashboard application built using React, for monitoring online chat room data. Fetches and displays data about visitor and chatroom statistics from an API.

User has to provide a date range (between 01.05.2017 - 15.06.2017), and the access token for the query to run successfully.

After receiving response from the API, the app renders two major data display components.
1) On the top is a "Speedometer" display with three dials each representing data from the following fields: total_conversation_count, total_user_message_count and total_visitor_message_count. **Note:** When the screen width is smaller than 960px the dials are replaced with plain text panels instead for better readability.

2. **a)** On the bottom is a table component which displays daily numbers for the following fields: conversation_count, missed_chat_count and visitors_with_conversation_count. The table allows for sorting of the fields, and the results are paginated if the table has more than 5 rows. 
**b)** Alternatively, the daily numbers can also be viewed in a graphical format. For best readability in graphical format, consider selecting a shorter date range (< 16 days).

## Quick start

1. [Clone the repo](#1-clone-the-repo).
1. [Install the dependencies](#2-install-the-dependencies).
1. [Run the app](#3-run-the-app).

### 1. Clone the repo

Clone the `chat-room-dashboard` repository locally. In a terminal, run:

```
$ git clone https://github.com/pankaj-pant/chat-room-dashboard
$ cd chat-room-dashboard
```

### 2. Install the dependencies

To install the dependencies, run the command:

    $ yarn install

### 3. Run the app

This command serves the app at `http://localhost:3000/`

    $ yarn start



# Links
* [Live Demo](https://chat-room-dashboard.herokuapp.com/)

## License
[MIT](https://choosealicense.com/licenses/mit/)