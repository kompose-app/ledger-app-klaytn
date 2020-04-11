# ledger-app-klaytn

Klaytn wallet "Community Edition" app for Ledger Blue, Nano S and Nano X

## Notice

The app is made and provided by community of [Klaytn](https://klaytn.com) and it is not affiliated with GroundX and other Klaytn official partners.

## Contact

For any feedback and communication about this app — "Klaytn CE" for Ledger, please join Telegram group [@kompose](https://t.me/kompose)

## Building and Installing

To build and install the app on your Ledger Nano S you must set up the Ledger Nano S build environments. Please follow the Getting Started instructions at [here](https://ledger.readthedocs.io/en/latest/userspace/getting_started.html).

If you don't want to setup a global environnment, you can also setup one just for this app by sourcing `prepare-devenv.sh` with the right target (`s` or `x`).

install prerequisite and switch to a Nano X dev-env:

```bash
sudo apt install python3-venv python3-dev libudev-dev libusb-1.0-0-dev

# (x or s, depending on your device)
source prepare-devenv.sh x 
```

Compile and load the app onto the device:
```bash
make load
```

Refresh the repo (required after Makefile edits):
```bash
make clean
```

Remove the app from the device:
```bash
make delete
```

## Documentation

This follows the specification available in the [`klaytn.asc`](https://github.com/kompose-app/ledger-app-klaytn/blob/master/doc/klaytn.asc).

## License

Apache License 2.0