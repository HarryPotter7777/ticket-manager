import client from "./index";

export const findAll = () => {
    return (dispatch) => {
        client.get('/todo/all').then(res => {
            dispatch({ type: "todo/all", data: res.data });
        }).catch(err => {
            // handle fetch error
        });
    };
};

export const updateState = (todo) => {
    return (dispatch) => {
        dispatch({ type: "todo/update", data: { todo: todo } });
    };
};

export const update = (todo) => {
    return (dispatch) => {
        client.put('/todo/update', todo, {
            params: {
                id: todo.id
            }
        }).then(res => {
            dispatch({ type: "todo/update", data: { todo: todo } });
        }).catch(err => {
            // handle update error
        });
    };
};

export const complete = (todo) => {
    return (dispatch) => {
        client.put('/todo/update', { ...todo, completed: !todo.completed }, {
            params: {
                id: todo.id
            }
        }).then(res => {
            dispatch({ type: "todo/complete", data: { todo: todo } });
        }).catch(err => {
            // handle update error
        });
    };
};

export const add = (todo) => {
    return (dispatch) => {
        client.post('/todo/create', todo).then(res => {
            dispatch({ type: "todo/create", data: { todo: res.data } });
        }).catch(err => {
            // handle add error
        });
    };
};