export class Client {
    constructor(public firstName: string, public lastName: string, public telephoneNumber: string, public address: string) { }
}

export class Product {
    constructor(public id: number, public name: string, public category) { }
}

export class OrderItem {
    constructor(public product: Product, public quantity: number) { }
}

export class Order {
    constructor(public id: number, public number: string, public client: Client, public items: Array<OrderItem>) { }
}

export class OrderItemRow {
    constructor(public order: Order, public product: Product, public quantity: number) { }

    public get clientFullName(): string {
        return `${this.order.client.firstName} ${this.order.client.lastName}`;
    }

}