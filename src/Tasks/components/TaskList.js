import React, { Component } from 'react';

class TaskList extends Component {

    render() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td className="timeInput"><input type="number" min="1" max="60" /></td>
                        <td className="taskInput"><input /></td>
                    </tr>
                    <tr>
                        <td className="timeInput"><input type="number" min="1" max="60" /></td>
                        <td className="taskInput"><input /></td>
                    </tr>
                    <tr>
                        <td className="timeInput"><input type="number" min="1" max="60" /></td>
                        <td className="taskInput"><input /></td>
                    </tr>
                </tbody>
            </table>
        );
    }
}
export default TaskList;