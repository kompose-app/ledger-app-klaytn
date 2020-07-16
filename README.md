# ledger-app-klaytn

Klaytn wallet app for Ledger Blue, Nano S and (possibly) Nano X.

App was prepared by Kompose company, please join our Telegram channel to get news and resolve issues - [@kompose](https://t.me/kompose).

## Building and Installing

To build and install the app on your Ledger Nano S you must set up the Ledger Nano S and Blue build environments. Please follow the Getting Started instructions at [here](https://ledger.readthedocs.io/en/latest/userspace/getting_started.html). For Ledger Nano X, you'd need to obtain a private SDK from [Ledger Devs Slack](https://trello.com/c/vodBUVai/38-join-our-developer-slack).

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

See `Makefile` for the full info on building the app.

## Documentation

This follows the specification available in the [`app-klaytn.md`](https://github.com/kompose-app/ledger-app-klaytn/blob/master/doc/app-klaytn.md).

## License

Apache License 2.0
