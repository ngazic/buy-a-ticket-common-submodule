export enum OrderStatus {
  // when the order has been created, but the
  // ticket has not been reserved yet
  Created = 'created',

  // the ticket we try to order has been reserved, or
  // when user has cancelled the order, or
  // the order expires before payment
  Cancelled = 'cancelled',

  // the order has successfully reserved the ticket
  AwaitingPayment = 'awaiting:payment', 

  //the order has reserved the ticket, and the user has 
  //provided payment successfully
  Complete = 'complete',
}