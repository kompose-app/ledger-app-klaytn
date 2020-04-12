import "./sscaffold.css";
import "./index.css";
import React, { Component } from "react";
import ReactDOM from "react-dom";
import TransportU2F from "@ledgerhq/hw-transport-u2f";
import { listen } from "@ledgerhq/logs";
import Klaytn from "@kompose-app/hw-app-klaytn";

//@flow

class App extends Component {
  state = {
    result: null,
    error: null,
    message: ""
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
        .map(function(a) {
          return String.fromCharCode(parseInt(a, 16));
        })
        .join("")
    );
  };

  createKlaytn = async (timeout?: number = 30000): Klaytn => {
    const transport = await TransportU2F.create();
    transport.setExchangeTimeout(timeout);
    listen(log => console.log(log.type + ": " + log.message));
    return new Klaytn(transport);
  };

  onGetAddress = async () => {
    try {
      this.showProcessing();
      const klay = await this.createKlaytn();
      const path = "44'/8217'/0'/0/0";
      const { publicKey, address, chainCode } = await klay.getAddress(
        path,
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

  onSignTransaction = async () => {
    try {
      this.showProcessing();
      const klay = await this.createKlaytn(90000);
      const path = "44'/8217'/0'/0/0";
      const rawTx = "0x";
      const { v, r, s } = await klay.signTransaction(path, rawTx);
      const resultText = "[V=" + v + "],[R=" + r + "],[S=" + s + "]";
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
      console.log("signing", this.state.message);
      const { v, r, s } = await klay.signPersonalMessage(path, msgHex);
      const resultText = "[V=" + v + "],[R=" + r + "],[S=" + s + "]";
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
        kctProvisioningNecessary,
        version
      } = await klay.getAppConfiguration();
      this.setState({
        result:
          `[arbitraryDataEnabled=${arbitraryDataEnabled}]` +
          `[kctProvisioningNecessary=${kctProvisioningNecessary}]` +
          `[version=${version}]`
      });
    } catch (error) {
      this.setState({ error });
    }
  };

  onMessageChanged = async event => {
    this.setState({ message: event.target.value });
  };

  onClear = async () => {
    this.clear();
  };

  render() {
    const { message, result, error } = this.state;
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
