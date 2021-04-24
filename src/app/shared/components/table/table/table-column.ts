
import { SortOption } from './sort-option';
import { AdvancedFilterType } from './advanced-filter-type';
import { DynamicPipeOptions } from 'src/app/shared/pipes/pipes/pipes/dynamic.pipe';

export interface TableColumn {
    name: string;
    header?: string;
    description?: string;
    field: (data: any) => any;
    pipe?: DynamicPipeOptions;
    pipeArgs?: (data: any) => any[];
    sort?: boolean;
    sortOption?: SortOption;
    class?: (data: any) => string[];
    filter?: AdvancedFilterType;
    showFilterOptions?: boolean;
    hasHighlight?: boolean;
    highlightClass?: (data: any) => string[];
}
