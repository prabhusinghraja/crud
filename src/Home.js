import React, { useState } from "react";
import tableData from './data.json';

const Home = () => {
    const [data, setData] = useState(tableData);
    const initialFormState = { id: null, name: '', username: '', email: '' };

    const [prdt, setPrdt] = useState(initialFormState);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setPrdt({ ...prdt, [name]: value });
    };

    const addUsers = (user) => {
        user.id = data.length + 1;
        setData([...data, user]);
    };

    const [currentUser, setCurrentUser] = useState(initialFormState);

    const editRow = (user) => {
        setCurrentUser({ ...user });
    };

    const updatedUser = (id, updatedUser) => {
        setData(data.map(user => (user.id === id ? updatedUser : user)));
        setCurrentUser(initialFormState);
    };

    const handleRowRemoval = (id) => {
        const updatedData = data.filter((row) => row.id !== id);
        setData(updatedData);
    };

    return (
        <div>
            <div>
                <hr />
                <h2 className="text-center">Add Users</h2>
                <div className="text-center">
                    <button
                        className="mx-2 btn btn-success"
                        type="button"
                        data-bs-toggle="modal"
                        data-bs-target="#exampleModal1"
                    >
                        Add User
                    </button>
                </div>
                <div className="modal fade" id="exampleModal1" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div className="modal-dialog">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">Add Users</h1>
                                <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div className="modal-body">
                                <form
                                    onSubmit={event => {
                                        event.preventDefault();
                                        if (!prdt.name || !prdt.username || !prdt.email) return;
                                        addUsers(prdt);
                                        setPrdt(initialFormState);
                                    }}
                                >
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail1" className="form-label">Name</label>
                                        <input type="text" className="form-control" onChange={handleInputChange} id="exampleInputEmail1" value={prdt.name} name="name" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail11" className="form-label">Username</label>
                                        <input type="text" className="form-control" onChange={handleInputChange} id="exampleInputEmail11" value={prdt.username} name="username" required />
                                    </div>
                                    <div className="mb-3">
                                        <label htmlFor="exampleInputEmail111" className="form-label">Email address</label>
                                        <input type="email" className="form-control" onChange={handleInputChange} id="exampleInputEmail111" value={prdt.email} name="email" required />
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button type="submit" className="btn btn-primary px-5" data-bs-dismiss="modal">Add</button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />

            <div className="table-responsive">
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Username</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.length > 0 ? (
                            data.map((row) => (
                                <tr key={row.id}>
                                    <td>{row.name}</td>
                                    <td>{row.username}</td>
                                    <td>{row.email}</td>
                                    <td>
                                        <button
                                            className="mx-2 btn btn-outline-warning"
                                            onClick={() => editRow(row)}
                                            type="button"
                                            data-bs-toggle="modal"
                                            data-bs-target="#exampleModal"
                                            disabled={currentUser !== null && currentUser.id === row.id}
                                        >
                                            Update
                                        </button>
                                        <button
                                            className="btn btn-outline-danger"
                                            onClick={() => handleRowRemoval(row.id)}
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr>
                                <td className="text-center" colSpan={4}>No Users...</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h1 className="modal-title fs-5 text-center" id="exampleModalLabel">Update</h1>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form
                                onSubmit={event => {
                                    event.preventDefault();
                                    if (!currentUser.name || !currentUser.username || !currentUser.email) return;
                                    updatedUser(currentUser.id, currentUser);
                                }}
                            >
                                <div className="mb-3">
                                    <label htmlFor="recipient-name" className="col-form-label">Name</label>
                                    <input type="text" className="form-control" id="recipient-name" onChange={(e) => setCurrentUser({ ...currentUser, name: e.target.value })} value={currentUser.name} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-username" className="col-form-label">Username</label>
                                    <input type="text" className="form-control" id="recipient-username" onChange={(e) => setCurrentUser({ ...currentUser, username: e.target.value })} value={currentUser.username} />
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="recipient-email" className="col-form-label">Email</label>
                                    <input type="text" className="form-control" id="recipient-email" onChange={(e) => setCurrentUser({ ...currentUser, email: e.target.value })} value={currentUser.email} />
                                </div>
                                <div className="d-flex justify-content-end">
                                    <button type="submit" className="btn btn-success me-3" data-bs-dismiss="modal">Save changes</button>
                                    <button type="button" className="btn btn-secondary ms-3" data-bs-dismiss="modal">Close</button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Home;
