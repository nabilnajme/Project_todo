const iniital = {
  tab: [],
};

export default function Todo(state = iniital, action) {
  switch (action.type) {
    case "add":
      return {
        ...state,
        tab: [
          ...state.tab,
          {
            id: action.payload.id,
            text: action.payload.text,
            completed: false,
          },
        ],
      };

    case "delete":
      return {
        ...state,
        tab: state.tab.filter((elem) => elem.id != action.payload.id),
      };

    case "edit":
      return {
        ...state,
        tab: state.tab.map((elem) =>
          elem.id == action.payload.id
            ? { ...elem, text: action.payload.text }
            : elem,
        ),
      };

    case "toggle":
      return {
        ...state,
        tab: state.tab.map((elem) =>
          elem.id == action.payload.id
            ? { ...elem, completed: !elem.completed }
            : elem,
        ),
      };

    default:
      return state;
  }
}
