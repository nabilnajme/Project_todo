export default function Todo(state = [], action) {
  switch (action.type) {
    case "add":
      return [
        ...state,
        { id: action.payload.id, text: action.payload.text, completed: false },
      ];

    case "delete":
      return state.filter((elem) => elem.id != action.payload.id);

    case "edit":
      return state.map((elem) =>
        elem.id == action.payload.id
          ? { ...elem, text: action.payload.text }
          : elem,
      );

    case "toggle":
      return state.map((elem) =>
        elem.id == action.payload.id
          ? { ...elem, completed: !elem.completed }
          : elem,
      );

    default:
      return state;
  }
}
