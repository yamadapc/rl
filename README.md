# rl
Rate-limit output from an UNIX pipe. This is useful if you're writting scripts
to query an API for example which has a rate limit.

So let's say I want to run something against the GitHub API, but I only want to
do one request every second. I can do it with:
```bash
cat list-of-inputs |
rl "1/1s" |
xargs -I % -L 1 -P32 curl -X GET -v https://api.github.com/some-github-url/% -u token:$GITHUB_API_TOKEN
```

## Installation
```bash
git clone git@github.com:yamadapc/rl
npm i -g rl
rm -rf rl
```

## Usage
To output a random number very 1 second:
```bash
for i in {1..5}; do echo $RANDOM; done | rl "1/1s"
```

To output a random number very 1 minute:
```bash
for i in {1..5}; do echo $RANDOM; done | rl "1/1minute"
```

To output 20 random numbers every hour:
```bash
for i in {1..5}; do echo $RANDOM; done | rl "20/hour"
```

## License
This code is licensed under the MIT license. For more information please refer
to the [LICENSE](/LICENSE) file.
