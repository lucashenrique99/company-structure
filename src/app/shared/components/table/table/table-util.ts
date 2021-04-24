import { Statuses } from 'src/app/shared/utils/enums/statuses';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Inject, Directive } from '@angular/core';

@Directive()
export class TableUtils {


    @Inject(AuthService) static auth: AuthService;

    static getStatusClass(data: { status: Statuses }): string[] {
        switch (data.status) {
            case Statuses.ACTIVATED: return ['success-label'];
            case Statuses.AWAITING_PAYMENT: return ['secondary-label'];
            case Statuses.CANCELED: return ['danger-label'];
            case Statuses.COMPLETED: return ['success-label'];
            case Statuses.DEACTIVATED: return ['danger-label'];
            case Statuses.DELIVERED: return ['success-label'];
            case Statuses.IN_PROGRESS: return ['primary-label'];
            case Statuses.PENDING: return ['warning-label'];
            default: return [];
        }
    }

    static getStatusHighlightClass(data: { status: Statuses }): string[] {
        switch (data.status) {
            case Statuses.ACTIVATED: return ['success'];
            case Statuses.AWAITING_PAYMENT: return ['secondary'];
            case Statuses.CANCELED: return ['danger'];
            case Statuses.COMPLETED: return ['success'];
            case Statuses.DEACTIVATED: return ['danger'];
            case Statuses.DELIVERED: return ['success'];
            case Statuses.IN_PROGRESS: return ['primary'];
            case Statuses.PENDING: return ['warning'];
            default: return [];
        }
    }

    static getActiveHighlightClass(data: { isActive: boolean }): string[] {
        return data.isActive ? ['success'] : ['danger'];
    }

    static disabledButtonByStatus(data: { status: Statuses }): boolean {
        return data && (data.status === Statuses.CANCELED || data.status === Statuses.COMPLETED || data.status === Statuses.DELIVERED);
    }

}