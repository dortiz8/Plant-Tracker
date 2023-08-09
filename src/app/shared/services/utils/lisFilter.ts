import { Pipe, PipeTransform } from "@angular/core";
import { Plant } from "../../models/Plant";


@Pipe({name: 'listFilter'})
export class FilterPipe implements PipeTransform{
    transform(items: Plant[], searchText: string): Plant[] {
        if (!items) {
            return [];
        }
        if (!searchText) {
            return items;
        }
        searchText = searchText.toLocaleLowerCase();

        return items.filter(item => {
            return  item?.name?.toLocaleLowerCase().includes(searchText);
        });
    }

}