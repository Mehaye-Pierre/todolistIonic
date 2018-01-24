import { NgModule } from '@angular/core';
import { ListComponent } from './list/list';
import { TodoItemComponent } from './todo-item/todo-item';
@NgModule({
	declarations: [ListComponent,
    TodoItemComponent],
	imports: [],
	exports: [ListComponent,
    TodoItemComponent]
})
export class ComponentsModule {}
