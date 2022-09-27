import React from "react";
import Form from "@rjsf/core";
import { ISubmitEvent } from "@rjsf/core";
import validator from "@rjsf/validator-ajv6";
import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from 'react'
import axios from 'axios'

const appInfoData = {
  command: ''
  , rowCount: 0
  , oid: 0
  , rows: [{ id: 0, name: "", ownername: "", description: "", icon: "" }]
}

const AppInfo = () => {
  const navigate = useNavigate();

  const { id } = useParams();
  const appInfoSchema = {
    title: id == 0 ? " Create New App" : "Edit App",
    type: "object",
    required: ["name", "id"],
    properties: {
      id: { type: "number", title: "ID", default: 0, readOnly: true },
      name: { type: "string", title: "Name", default: "" },
      ownername: { type: "string", title: "Owner Name", default: "" },
      description: { type: "string", title: "Description", default: "" },
      icon: { type: "string", title: "Icon", default: "" }
    }
  };

  const [appInfo, setData] = useState(appInfoData);

  useEffect(() => {
    axios.get("http://127.0.0.1:3001/app/" + id)
      .then(({ data }) => {
        setData(data.rows[0]);
      })
  }, [id]);

  const onSubmit = (event: ISubmitEvent<unknown>) => {
    console.log("submit", event.formData);

    if (id == 0) {
      axios.post("http://127.0.0.1:3001/app", event.formData)
        .then(({ data }) => {
          console.log(data);
          navigate("/apps");
        });
    }

    axios.put("http://127.0.0.1:3001/app/", event.formData)
      .then(({ data }) => {
        console.log(data);
        navigate("/apps");
      });
  };

  let uiSchema = (id == 0) ? { id: { "ui:widget": "hidden" } } : {};

  return (
    <div>
      <Form
        schema={appInfoSchema}
        formData={appInfo}
        uiSchema={uiSchema}
        validator={validator}
        onSubmit={onSubmit}
      />
    </div>
  );
}

export default AppInfo;