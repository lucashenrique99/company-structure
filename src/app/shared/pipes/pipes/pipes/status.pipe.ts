import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'status'
})
export class StatusPipe implements PipeTransform {

  transform(value: any): any {
    switch (value) {
      case "ACTIVATED": return "Activated";
      case "DEACTIVATED": return "Deactivated";
      case "AWAITING_PAYMENT": return "Awaiting Payment";
      case "PENDING": return "Pending";
      case "IN_PROGRESS": return "In Progress";
      case "COMPLETED": return "Completed";
      case "DELIVERED": return "Delivered";
      case "CANCELED": return "Canceled";
      case "OPENED": return "Opened";
      case "CLOSED": return "Closed";
      case "DELETED": return "Deleted";
      default:
        return null;
    }
  }

}