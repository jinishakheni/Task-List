import FullList from "../model/FullList";

interface DOMList {
  ul: HTMLUListElement;
  clear(): void;
  render(fullList: FullList): void;
}

export default class ListTemplete implements DOMList {
  static instance: ListTemplete = new ListTemplete();

  ul: HTMLUListElement;

  private constructor() {
    this.ul = document.querySelector("#listItems") as HTMLUListElement;
  }

  clear(): void {
    this.ul.innerHTML = "";
  }

  render(fullList: FullList): void {
    this.clear();

    fullList.list.forEach((currentElement) => {
      const listElement = document.createElement("li") as HTMLLIElement;
      listElement.className = "item";

      const inputElement = document.createElement("input") as HTMLInputElement;
      inputElement.id = currentElement.id;
      inputElement.type = "checkbox";
      inputElement.checked = currentElement.checked;
      inputElement.addEventListener("change", () => {
        currentElement.checked = !currentElement.checked;
        fullList.save();
      });
      listElement.appendChild(inputElement);

      const lableElement = document.createElement("label") as HTMLLabelElement;
      lableElement.htmlFor = currentElement.id;
      lableElement.innerText = currentElement.item;
      listElement.appendChild(lableElement);

      const buttonElement = document.createElement(
        "button"
      ) as HTMLButtonElement;
      buttonElement.innerText = "X";
      buttonElement.className = "button";
      buttonElement.addEventListener("click", () => {
        fullList.removeItem(currentElement.id);
        this.render(fullList);
      });
      listElement.appendChild(buttonElement);

      this.ul.append(listElement);
    });
  }
}
