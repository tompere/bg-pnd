# demo project

### Notes

* Project was scaffolded and bootstrapped using yeoman [angular-fullstack](https://github.com/DaftMonk/generator-angular-fullstack) generator.

### Prerequisites

* npm
* grunt
* [ruby-compass](http://compass-style.org/install/) and saas (`gem install sass`)

### Run

* `grunt build` for building production code
* `grunt serve` for locally running code (`http://localhost:9000`)
* `grunt serve:dist` for locally running production code

### github API

used the following API resources

`GET /api/status.json`
for systen status

`GET /api/messages.json`
for seeing all recent messages

### REST API

#### base url : `/api/v1/`

#### github resource
##### GET `/api/v1/github/`
general request, will result in fixed status:

`HTTP 200 OK`
<pre>
  {
    message: 'active',
    statusCode: 1
  }
</pre>

##### POST `/api/v1/github/current`
create a new request for github status; response is:

`HTTP 202 CREATED`

`Location: /current/1445092065925`

where location header has unix epoch milliseconds timestamp, as id for querying created resource response.

##### GET `/api/v1/github/current/{id}`
query github current status request, where `{id}` is the epoch milliseconds timestamp, returned in location header.

possible responses are:

###### `HTTP 200 OK`

if status request is done (based on its id) **or** a newer status request is done.
a body example:
<pre>
{
  "content": {
    "status": {
      "display": "Current status",
      "values": [
        "good"
      ]
    },
    "availability": {
      "display": "Availability",
      "values": []
    }
  }
}
</pre>

###### `HTTP 204 NOT CONTENT`

if status request is not done yet **or** no newer status request is done.

###### `HTTP 410 GONE`

if status request was made over 1 minute ago. User must create a new request.
<pre>
{
  "content": {
    "request is out-of-date and permanently unavailable, please re-issue an new status request"
  }
}
</pre>