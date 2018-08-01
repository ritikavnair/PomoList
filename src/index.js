import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import TaskList from './Tasks/components/TaskList';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('pomoTimer'));
ReactDOM.render(<TaskList />, document.getElementById('taskList'));
registerServiceWorker();
