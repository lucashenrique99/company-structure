import { MatPaginatorIntl } from '@angular/material/paginator';

export class PaginatorIntl extends MatPaginatorIntl {

    constructor() {
        super();

        this.itemsPerPageLabel = "Itens por página";
        this.firstPageLabel = "Primeira";
        this.lastPageLabel = "Última";
        this.nextPageLabel = "Próxima";
        this.previousPageLabel = "Anterior";

        this.getRangeLabel = (page: number, pageSize: number, length: number) => {
            if (length == 0 || pageSize == 0) {
                return `0 de ${length}`;
            }
            length = Math.max(length, 0);
            const startIndex = page * pageSize;
            const endIndex = startIndex < length ? Math.min(startIndex + pageSize, length) : startIndex + pageSize;
            return `${startIndex + 1} – ${endIndex} de ${length}`;
        }
    }
}

