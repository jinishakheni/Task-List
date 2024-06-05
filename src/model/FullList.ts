import ListItem from "./ListItem";

interface List {
  list: ListItem[];
  load(): void;
  save(): void;
  clearList(): void;
  addItem(item: ListItem): void;
  removeItem(id: string): void;
}

export default class FullList implements List {
  static instance: FullList = new FullList();

  private constructor(private _list: ListItem[] = []) {}

  get list(): ListItem[] {
    return this._list;
  }

  load(): void {
    const storedList: string | null = localStorage.getItem("list");
    if (typeof storedList != "string") return;

    const parsedStoredList: {
      _id: string;
      _item: string;
      _checked: boolean;
    }[] = JSON.parse(storedList);

    parsedStoredList.forEach((currentItem) => {
      const newItem = new ListItem(
        currentItem._id,
        currentItem._item,
        currentItem._checked
      );
      FullList.instance.addItem(newItem);
    });
  }

  save(): void {
    localStorage.setItem("list", JSON.stringify(this._list));
  }

  clearList(): void {
    this._list = [];
    this.save();
  }

  addItem(item: ListItem): void {
    this._list.push(item);
    this.save();
  }

  removeItem(id: string): void {
    this._list = this._list.filter((ele) => ele.id != id);
    this.save();
  }
}
