import React, { useReducer, useEffect } from "react";
import { useHistory, generatePath } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isEmpty, map } from "lodash";
import DashboardLayout from "../components/layout/DashboardLayout.jsx";
import Card from "../components/standard/Card.jsx";
import Input from "../components/standard/Input.jsx";
import Button from "../components/standard/Button.jsx";
import { addProject } from "../../slices/projectsSlice.js";
import { fetchAllCompanies } from "../../slices/companiesSlice.js";
import validateAddProjectForm from "../../validators/AddProjectForm";

function reducer(state, action) {
    
  switch (action.type) {
    case "update-name":
      return { ...state, name: action.value };

    case "update-companyId":
      return { ...state, companyId: action.value };

    case "update-installation-date":
      return { ...state, installation_date: action.value };

    case "update-lat":
      return { ...state, lat: action.value };

    case "update-lng":
      return { ...state, lng: action.value };

    case "update-error":
      return { ...state, errors: action.value };

    default:
      throw new Error();
  }
}

const initialState = {
  errors: null,
};

const AddProject = (props) => {
  const { userDetails } = props;
  const dispatch = useDispatch();
  const history = useHistory();

  const [state, reducerDispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    dispatch(fetchAllCompanies());
  }, []);

  const { isLoading, companies } = useSelector((state) => state.companies);

  const handleAddProject = async (e) => {
    e.preventDefault();
    const errors = validateAddProjectForm(state);

    if (!isEmpty(errors)) {
      reducerDispatch({ type: "update-error", value: errors });
      return;
    }

    reducerDispatch({ type: "update-error", value: null });
    delete state.errors;

    const userId = userDetails.sub;
    dispatch(addProject(userId, state));
    const path = generatePath("/");
    history.push(path);
    return;
  };

  if (isLoading) {
    return "Loading...";
  }

  return (
    <DashboardLayout>
      <form onSubmit={handleAddProject}>
        <div className="my-4">
          <Card>
            <h1 className="text-heading text-dark font-bold">
              Add New Project
            </h1>
            <h2 className="text-cardHeading text-dark-50">Basic Details</h2>
            <div className="my-4 grid grid-cols-2 gap-4">
              <div className="col-span-2">
                <Input
                  label="Project Name"
                  error={state?.errors?.name}
                  value={state.name}
                  onChange={(e) =>
                    reducerDispatch({
                      type: "update-name",
                      value: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-2">
                <label className="block font-bold">Company</label>
                <select
                  value={state.companyId}
                  className="block px-3 py-2 w-full bg-background rounded outline-none"
                  onChange={(e) =>
                    reducerDispatch({
                      type: "update-companyId",
                      value: e.target.value,
                    })
                  }
                >
                  {map(companies, ({ companyId, name }) => (
                    <option value={companyId}>{name}</option>
                  ))}
                </select>
              </div>
              <div className="col-span-1">
                <Input
                  type="number"
                  min={-90}
                  max={90}
                  label="Latitude"
                  error={state?.errors?.lat}
                  value={state.lat}
                  onChange={(e) =>
                    reducerDispatch({
                      type: "update-lat",
                      value: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-1">
                <Input
                  type="number"
                  min={-180}
                  max={180}
                  label="Longitude"
                  error={state?.errors?.lng}
                  value={state.lng}
                  onChange={(e) =>
                    reducerDispatch({
                      type: "update-lng",
                      value: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-2">
                <Input
                  type="date"
                  label="Installation Date"
                  error={state?.errors?.installation_date}
                  value={state.installation_date}
                  onChange={(e) =>
                    reducerDispatch({
                      type: "update-installation-date",
                      value: e.target.value,
                    })
                  }
                />
              </div>
              <div className="col-span-1 mt-2">
                <Button label="Create Project" type="submit" />
              </div>
            </div>
          </Card>
        </div>
      </form>
    </DashboardLayout>
  );
};

export default AddProject;
