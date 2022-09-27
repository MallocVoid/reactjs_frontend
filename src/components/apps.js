import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Link } from "react-router-dom";
import { Button } from "@mui/material"
import { Delete } from "@mui/icons-material";

const appInfoFormat = {
    command: ''
    , rowCount: 0
    , oid: 0
    , rows: [{ id: 0, name: "", ownername: "", description: "", icon: "" }]
}

function Apps() {
    const [apps, setData] = useState(appInfoFormat);
    const [checkedState, setCheckedState] = useState([]);

    useEffect(() => {
        axios.get("http://127.0.0.1:3001/apps/")
            .then(({ data }) => {
                setData(data);
                setCheckedState(new Array(data.rowCount).fill(false));
            })
    }, []);

    const handleOnChange = (position) => {
        const updatedCheckedState = checkedState.map((item, index) =>
            index === position ? !item : item
        );

        setCheckedState(updatedCheckedState);
    };

    const handleOnDeleteClicked = () => {
        let deleteList = [];

        checkedState.forEach((item, index) => {
            if (item === true) {
                console.log(apps.rows[index].id);
                deleteList.push("http://127.0.0.1:3001/app/" + apps.rows[index].id);
            }
        });

        if (deleteList.length > 0) {
            axios.all(deleteList.map(l => axios.delete(l)))
                .then(axios.spread((...responses) => {
                    responses.forEach(response => {
                        console.log(response);
                    });
                    window.location.reload();
                })).catch(errors => {
                    // react on errors.
                    console.log(errors);
                });
        }
    };

    return (
        <div>
            <table className="table table-bordered">
                <thead>
                    <tr>
                        <th>Delete?</th>
                        <th>ID</th>
                        <th>Name</th>
                        <th>Owner Name</th>
                        <th>Description</th>
                        <th>Icon Link</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        apps.rows.map((row, index) => (
                            <tr data-index={index} key={index}>
                                <td>
                                    <input
                                        type="checkbox"
                                        id={`custom-checkbox-${index}`}
                                        onChange={() => handleOnChange(index)}
                                    />
                                </td>
                                <td>
                                    <Link to={`/app/${row.id}`} className="app-link">
                                        {row.id}
                                    </Link>
                                </td>
                                <td>{row.name}</td>
                                <td>{row.ownername}</td>
                                <td>{row.description}</td>
                                <td>{row.icon}</td>
                            </tr>
                        ))}
                </tbody>
                <tfoot>
                    <tr>
                        <th><Delete onClick={handleOnDeleteClicked} /></th>
                    </tr>
                </tfoot>
            </table>
            <Link to={`/app/0`} className="nav-item nav-link">
                <Button>Create New App</Button>
            </Link>
        </div>
    );
}

export default Apps;