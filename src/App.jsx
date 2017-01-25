import React from 'react';
import ReactDOM from 'react-dom';

export default class TestClient extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            channel: '',
            message: '',
        }
        this.initClient();
        this.send = this.send.bind(this);
        this.handleChannel = this.handleChannel.bind(this);
        this.handleMessage = this.handleMessage.bind(this);
        this.addSubscribtion = this.addSubscribtion.bind(this);
    }

    initClient() {
        this.client = Stomp.client("ws://localhost:8080/gs-guide-websocket", "v11.stomp");
        this.client.connect("", "");
    }

    send() {
        this.client.send(this.state.channel, {}, this.state.message);
    }


    handleChannel(event) {
        this.setState({ channel: event.target.value });
    }

    handleMessage(event) {
        this.setState({ message: event.target.value });
    }

    addSubscribtion() {
        this.client.subscribe(this.state.channel,
            function (message) {
                console.log(message);
            });
    }

    render() {
        return <div>
            <div>
                <label>Channel</label>
                <input value={this.state.channel} onChange={this.handleChannel} />
                <label>Message</label>
                <input value={this.state.message} onChange={this.handleMessage} />
                <button onClick={this.send}>Send Message</button>
            </div>
            <div>
                <label>Channel</label>
                <input value={this.state.channel} onChange={this.handleChannel} />
                <button onClick={this.addSubscribtion}>Subscribe to Channel</button>
            </div>
        </div>;
    }
}

ReactDOM.render(
    <TestClient />,
    document.getElementById('app')
);
