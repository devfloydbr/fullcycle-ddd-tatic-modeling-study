import { OrderItem } from '../order_item.aggregate'

export class Order {
  private _id: string
  private _customerId: string
  private _items: OrderItem[]
  private _total: number

  constructor(id: string, customerId: string, items: OrderItem[]) {
    this._id = id
    this._customerId = customerId
    this._items = items
    this._total = this.total()
    this.validate()
  }

  get id(): string {
    return this._id
  }

  get customerId(): string {
    return this._customerId
  }

  get items(): OrderItem[] {
    return this._items
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error('ID is required.')
    }

    if (this._customerId.length === 0) {
      throw new Error('Customer ID is required.')
    }

    if (this._items.length === 0) {
      throw new Error('Items length must be greater than zero.')
    }

    if (this._items.some(item => item.quantity <= 0)) {
      throw new Error('Quantity must be greater than zero.')
    }
  }

  addItem(item: OrderItem): void {
    this._items.push(item)
  }

  total() {
    return this._items.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    )
  }
}
