import "./css/style.css";
import FullList from "./model/FullList";
import ListItem from "./model/ListItem";
import ListTemplete from "./templetes/ListTemplete";

const initApp = (): void => {
  const fullList = FullList.instance;
  const listTemplete = ListTemplete.instance;

  const itemEntryForm = document.querySelector(
    "#itemEntryForm"
  ) as HTMLFormElement;

  itemEntryForm.addEventListener("submit", (event: SubmitEvent): void => {
    event.preventDefault();

    const inputElement = document.querySelector("#newItem") as HTMLInputElement;
    const newTask: string = inputElement.value.trim();

    const nextId = fullList.list.length
      ? parseInt(fullList.list[fullList.list.length - 1].id) + 1
      : 1;
    const newItem = new ListItem(nextId.toString(), newTask);
    fullList.addItem(newItem);
    listTemplete.render(fullList);
  });

  const clearButtonElement = document.querySelector(
    "#clearItemsButton"
  ) as HTMLButtonElement;
  clearButtonElement.addEventListener("click", () => {
    fullList.clearList();
    listTemplete.clear();
  });

  fullList.load();
  listTemplete.render(fullList);
};

document.addEventListener("DOMContentLoaded", initApp);
