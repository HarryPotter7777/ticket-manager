const initialState = {
    data: [],
};

const sortByCompleted = (todo) => {
    return todo.sort((a, b) => !a.completed ? -1 : !b.completed ? 1 : 0);
};

export default function users(state = initialState, action = {}) {
    switch (action.type) {
        case "todo/all": {
            return {
                ...state,
                data: sortByCompleted(action.data),
            };
        }

        case "todo/create": {
            return {
                ...state,
                data: sortByCompleted([action.data.todo, ...state.data])
            };
        }

        case "todo/update": {
            const { todo } = action.data;
            const { id } = todo;
            const index = state.data.findIndex((todo) => todo.id === id);
            return {
                ...state,
                data:
                    index !== -1
                        ? sortByCompleted(state.data.map((todoState, i) =>
                            i === index ? { ...todoState, ...todo } : todoState
                        ))
                        : state.data,
            };
        }

        case "todo/complete": {
            const { todo } = action.data;
            const { id } = todo;
            const index = state.data.findIndex((todo) => todo.id === id);
            return {
                ...state,
                data:
                    index !== -1
                        ? sortByCompleted(state.data.map((todoState, i) =>
                            i === index ? { ...todoState, completed: !todoState.completed } : todoState
                        ))
                        : state.data,
            };
        }

        default:
            return state;
    }
}