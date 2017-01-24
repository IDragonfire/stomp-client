import React from 'react';
import ReactDOM from 'react-dom';

export default class TestClient extends React.Component {
    constructor(props) {
        super(props);
    }

    componentDidMount() {
        var socket = new SockJS('echo.websocket.org');
        stompClient = Stomp.over(socket);
        stompClient.connect({}, function (frame) {
            setConnected(true);
            console.log('Connected: ' + frame);
            stompClient.subscribe('/topic/greetings', function (greeting) {
                console.log(JSON.parse(greeting.body).content);
            });
        });
    }

    render() {
        return <div>
            Test Da
        </div>;
    }
}

ReactDOM.render(
    <TestClient />,
    document.getElementById('app')
);
