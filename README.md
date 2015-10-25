# rl
Rate-limit output from an UNIX pipe

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
