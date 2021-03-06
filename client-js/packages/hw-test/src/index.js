import "./sscaffold.css";
import "./index.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import TransportWebUSB from "@ledgerhq/hw-transport-webusb";
import { listen } from "@ledgerhq/logs";
import Klaytn from "@kompose-app/hw-app-klaytn";

//@flow

class App extends Component {
  state = {
    result: null,
    error: null,
    message: "",
    txData: "",
  };

  clear = () => {
    this.setState({ result: null });
    this.setState({ error: null });
  };

  showProcessing = () => {
    this.setState({ error: null });
    this.setState({ result: "processing..." });
  };

  hexToBase64 = (hexString: string) => {
    return btoa(
      hexString
        .match(/\w{2}/g)
        .map(function (a) {
          return String.fromCharCode(parseInt(a, 16));
        })
        .join("")
    );
  };

  createKlaytn = async (timeout?: number = 30000): Klaytn => {
    const transport = await TransportU2F.create();
    transport.setExchangeTimeout(timeout);
    return new Klaytn(transport);
  };

  onGetAddress = async () => {
    try {
      this.showProcessing();

      const klay = await this.createKlaytn();
      const path = "44'/8217'/0'/0/0";
      const { publicKey, address, chainCode } = await klay.getAddress(
        path,
        true,
        true
      );
      const resultText =
        "[publicKey=" +
        publicKey +
        "],[address=" +
        address +
        "],[chainCode=" +
        chainCode +
        "]";
      this.setState({ result: resultText });
    } catch (error) {
      this.setState({ error });
    }
  };

  onSignPersonalMessage = async () => {
    try {
      this.showProcessing();
      const klay = await this.createKlaytn(90000);
      const path = "44'/8217'/0'/0/0";
      const msgHex = Buffer.from(this.state.message).toString("hex");
      const { v, r, s } = await klay.signPersonalMessage(path, msgHex);
      const resultText = "[V=" + v + "],[R=" + r + "],[S=" + s + "]";
      this.setState({ result: resultText });
    } catch (error) {
      this.setState({ error });
    }
  };

  onSignTransaction = async () => {
    try {
      this.showProcessing();
      const klay = await this.createKlaytn(90000);
      const path = "44'/8217'/0'/0/0";
      const rawTxHex = this.state.txData;
      let { v, r, s } = await klay.signTransaction(path, rawTxHex);

      const eip55Constant = 35;
      const eccParity = v - ((8217 * 2 + eip55Constant) % 256)
      v = (8217 * 2 + eip55Constant) + eccParity;

      let vHex = v.toString(16);
      if (vHex.length < 2) {
          vHex = `0${v}`;
      }

      const resultText = "[V=" + vHex + "],[R=" + r + "],[S=" + s + "]";
      this.setState({ result: resultText });
    } catch (error) {
      this.setState({ error });
    }
  };

  onGetAppConfiguration = async () => {
    try {
      this.showProcessing();
      const klay = await this.createKlaytn();
      const {
        arbitraryDataEnabled,
        tokenProvisioningNecessary,
        version,
      } = await klay.getAppConfiguration();
      this.setState({
        result:
          `[arbitraryDataEnabled=${arbitraryDataEnabled}]` +
          `[tokenProvisioningNecessary=${tokenProvisioningNecessary}]` +
          `[version=${version}]`,
      });
    } catch (error) {
      this.setState({ error });
    }
  };

  onAppInstallNanoS = async () => {
    try {
      this.showProcessing();

      if (!window["WebSocket"]) {
        throw "Your browser doesn't support WebSockets. Please use latest versions of Chrome.";
      }

      if (!TransportWebUSB.isSupported()) {
        throw "Your browser doesn't support WebUSB. Please use latest versions of Chrome.";
      }

      const transport = await TransportWebUSB.create();
      transport.setExchangeTimeout(30000);

      var socket = new WebSocket(
        // "ws://localhost:8080/apiws/v1/appInstall/klaytn/nanos_v1.1.0"
        "wss://ledger-installer.kompose.app/apiws/v1/appInstall/klaytn/nanos_v1.1.0"
      );

      socket.onclose = (_event) => {
        this.setState({ result: "Connection closed." });
      };

      socket.onerror = (e) => {
        throw e;
      };

      socket.onmessage = function (evt) {
        if (!evt.isTrusted) {
          throw "messages from websocket cannot be trusted";
        }

        let adpuIn = Buffer.from(evt.data, "hex");
        transport.exchange(adpuIn).then(
          (adpuOut) => {
            const adpuOutHex = adpuOut.toString("hex");
            socket.send(adpuOutHex);
          },
          (e) => {
            throw e;
          }
        );
      };
    } catch (error) {
      this.setState({ error });
    }
  };

  onAppInstallBlue = async () => {
    try {
      this.showProcessing();

      if (!window["WebSocket"]) {
        throw "Your browser doesn't support WebSockets. Please use latest versions of Chrome.";
      }

      if (!TransportWebUSB.isSupported()) {
        throw "Your browser doesn't support WebUSB. Please use latest versions of Chrome.";
      }

      const transport = await TransportWebUSB.create();
      transport.setExchangeTimeout(30000);

      var socket = new WebSocket(
        // "ws://localhost:8080/apiws/v1/appInstall/klaytn/blue_v1.1.0"
        "wss://ledger-installer.kompose.app/apiws/v1/appInstall/klaytn/blue_v1.1.0"
      );

      socket.onclose = (_event) => {
        this.setState({ result: "Connection closed." });
      };

      socket.onerror = (e) => {
        throw e;
      };

      socket.onmessage = function (evt) {
        if (!evt.isTrusted) {
          throw "messages from websocket cannot be trusted";
        }

        let adpuIn = Buffer.from(evt.data, "hex");
        transport.exchange(adpuIn).then(
          (adpuOut) => {
            const adpuOutHex = adpuOut.toString("hex");
            socket.send(adpuOutHex);
          },
          (e) => {
            throw e;
          }
        );
      };
    } catch (error) {
      this.setState({ error });
    }
  };

  onMessageChanged = async (event) => {
    this.setState({ message: event.target.value });
  };

  onTxDataChanged = async (event) => {
    this.setState({ txData: event.target.value });
  };

  onClear = async () => {
    this.clear();
  };

  render() {
    const { txData, message, result, error } = this.state;
    return (
      <section>
        <h1>Ledger Klaytn App Functional Test</h1>

        <pre>
          <code>
            import TransportU2F from &quot;@ledgerhq/hw-transport-u2f&quot;;
            <br />
            import Klaytn from &quot;@kompose-app/hw-app-klaytn&quot;;
            <br />
            const transport = await TransportU2F.create();
            <br />
            const klay = Klaytn(transport);
            <br />
          </code>
        </pre>

        <div>
          <h2>Install App on Ledger</h2>
          <p>
            Before continuing you must install Klaytn application on the
            ledger device (pick one). The installation will be done via WebUSB. It takes
            about 2 minutes, please do not disconect device in process.
          </p>
          <table>
          <tr>
          <td>
          <a href="#output" className="button" onClick={this.onAppInstallNanoS}>
            Ledger Nano S
          </a>
          </td><td>
          <a href="#output" className="button" onClick={this.onAppInstallBlue}>
            Ledger Blue
          </a>
          </td>
           </tr>
          </table>
        </div>

        <div>
          <h2>Simple functions</h2>

          <h3>klay.getAddress()</h3>
          <p>Returns public key and Klaytn legacy account address.</p>
          <a href="#output" className="button" onClick={this.onGetAddress}>
            Call
          </a>

          <h3>klay.getAppConfiguration()</h3>
          <p>Returns current app settings and version.</p>
          <a
            href="#output"
            className="button"
            onClick={this.onGetAppConfiguration}
          >
            Call
          </a>

          <h3>klay.signPersonalMessage()</h3>
          <p>
            Signs a personal message according to <code>klay_sign</code> and
            returns V, R, S.
          </p>

          <form action="#">
            <fieldset>
              <label>Message</label>
              <textarea
                id="msgField"
                placeholder="I am potato"
                value={message}
                onChange={this.onMessageChanged}
              ></textarea>
              <a
                href="#output"
                className="button"
                onClick={this.onSignPersonalMessage}
              >
                Sign
              </a>
            </fieldset>
          </form>

          <h3>klay.signTransaction()</h3>
          <p>
            Signs a transaction according to <code>klay_signTransaction</code> and
            returns V, R, S.
          </p>

          <form action="#">
            <fieldset>
              <label>Tx Data (Hex)</label>
              <textarea
                id="txField"
                placeholder="e8018504e3b292008252089428ee52a8f3d6e5d15f8b131996950d7f296c7952872bd72a2487400080"
                value={txData}
                onChange={this.onTxDataChanged}
              ></textarea>
              <a
                href="#output"
                className="button"
                onClick={this.onSignTransaction}
              >
                Sign
              </a>
            </fieldset>
          </form>
        </div>

        <div id="output">
          <h2>Output</h2>

          <div>
            {error ? (
              <pre>
                <code className="error">Error: {error.toString()}</code>
              </pre>
            ) : result ? (
              <pre>
                <code className="result">{result}</code>
              </pre>
            ) : (
              <span></span>
            )}
          </div>

          <button onClick={this.onClear}>Clear</button>
        </div>
      </section>
    );
  }
}

ReactDOM.render(<App />, document.getElementById("root"));
listen((log) => console.log(log.type + ": " + log.message));
