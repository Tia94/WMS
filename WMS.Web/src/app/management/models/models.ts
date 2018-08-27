
export class Client {
  constructor(public firstName: string, public lastName: string, public telephoneNumber: string, public address: string) { }
}

export class Product {
  constructor(public id: number, public name: string, public category) { }
}

export class OrderItem {
  constructor(public product: Product, public quantity: number, public price: number) { }

}

export class Order {
  constructor(public id: number, public number: string, public client: Client, public status: string, public total: number, public items: Array<OrderItem>) { }
}
