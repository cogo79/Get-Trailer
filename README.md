# Get-Trailer

I used Node version 4.4.4 and npm version 2.15.1. So if you run in to any trouble with runing this server you can try to change to does versions.

After you have cloned this repository "cd" in to it in the terminal and run "npm install".

And then to start the server, type "npm start" in the terminal.

To test the server you can run the following command in the terminal:
curl -H Content-Type:application/json -X POST -d '{"trailer":"https://content.viaplay.se/pc-se/film/ted-2-2015"}' http://localhost:3000/trailer

Or if you have Mocha installed you can just run command "mocha" in the terminal to start all of my automated tests.

Have a good one ;D

If you have any questions then drop me a message at migobigo76@gmail.com or give me a call at 0702845973.

Updates:
Regarding the test file cachedTrailers.js, I have been thinking lately. If this server was a real world commercial(so to speak) server project, then I would most certainly add a test that populates the file cachedTrailers.js(in the folder “shared”) with a couple of thousands of random strings as title keys pared with some other string. Then I would have the test check to see if a given movie title(key) retrieves its corresponding trailer-link fast enough. I choose to leave that out in this evaluation assignment. Because It is my judgement that stating that I am aware of this issue is enough.
