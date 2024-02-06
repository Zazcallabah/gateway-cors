# AWS API gateway origin header missing over http1.1

Making webrequests to a lambda through an aws api gateway includes the origin header among the event headers, but only over http2.

## steps to reproduce

i tested this with a global version of serverless

	> serverless --version
	Framework Core: 3.22.0
	Plugin: 6.2.2
	SDK: 4.3.2

in repo root:

	serverless deploy

then

	 invoke-webrequest -HttpVersion 2.0 -Uri "https://<id>.execute-api.eu-west-1.amazonaws.com/test/health/test" -Headers @{"Origin"="https://test.com"}

gives

	StatusCode        : 200
	StatusDescription : OK
	Content           : ok! origin: 'https://test.com'
	RawContent        : HTTP/2.0 200 OK

while

	 invoke-webrequest -HttpVersion 1.1 -Uri "https://<id>.execute-api.eu-west-1.amazonaws.com/test/health/test" -Headers @{"Origin"="https://test.com"}

gives

	StatusCode        : 200
	StatusDescription : OK
	Content           : ok! origin: 'undefined'
	RawContent        : HTTP/1.1 200 OK

similar for curl

	curl https://<id>.execute-api.eu-west-1.amazonaws.com/test/health/test -H "Origin: https://test.com" --http2
	ok! origin: 'https://test.com'
	curl https://<id>.execute-api.eu-west-1.amazonaws.com/test/health/test -H "Origin: https://test.com" --http1.1
	ok! origin: 'undefined'
