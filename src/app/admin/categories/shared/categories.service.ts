import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

import { Category } from './category';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class CategoriesService {
  categoryCollection: AngularFirestoreCollection<Category>;

  constructor(private afs: AngularFirestore) {
    this.categoryCollection = this.afs.collection('categories',
        (ref) => ref.orderBy('created_at', 'desc'));
  }
  getCategoriesSnapshot(): Observable<Category[]>{
    return this.categoryCollection.snapshotChanges().map(
      (actions) =>{
        return actions.map(
          (a) => {
            const data = a.payload.doc.data() as Category;
            return {
              id: a.payload.doc.id,
              title: data.title,
              slug:data.slug,
              parent:data.parent,
              visible: data.visible,
              created_at: data.created_at,
              updated_at: data.updated_at
            }
          }
        );
      }
    );
  }

  getOneCategory(id: string){
    return this.afs.doc<Category>(`categories/${id}`);
  }
  getCategoriesBySlug(slug: string){
    return this.afs.collection('categories',
       (ref) => ref.where('slug', '==' ,slug).limit(1)).snapshotChanges().map(
         (actions) =>{
           return actions.map(
             (a) => {
               const data = a.payload.doc.data() as Category;
               return {
                 id: a.payload.doc.id,
                 title: data.title
               }
             }
           );
         }
       );
  }
  getMainCategories(): Observable<Category[]>{
   return  this.afs.collection('categories',
      (ref) => ref.where('parent', '==' ,'')).snapshotChanges().map(
        (actions) =>{
          return actions.map(
            (a) => {
              const data = a.payload.doc.data() as Category;
              return {
                id: a.payload.doc.id,
                title: data.title,
                slug:data.slug,
                parent:data.parent,
                visible: data.visible,
                created_at: data.created_at,
                updated_at: data.updated_at
              }
            }
          );
        }
      );
  }
  getChildCategories(id:string): Observable<Category[]>{
   return  this.afs.collection('categories',
      (ref) => ref.orderBy('created_at', 'asc').where('parent', '==' ,id)).snapshotChanges().map(
        (actions) =>{
          return actions.map(
            (a) => {
              const data = a.payload.doc.data() as Category;
              return {
                id: a.payload.doc.id,
                title: data.title,
                slug:data.slug,
                parent:data.parent,
                visible: data.visible,
                created_at: data.created_at,
                updated_at: data.updated_at
              }
            }
          );
        }
      );
  }
  create(form: any){
      const category = {
        title: form['title'],
        slug:form['slug'],
        parent:form['parent'],
        visible: form['visible'],
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
    };
    return this.categoryCollection.add(category);
  }

  update(id: string, data: Partial<Category>){
    return this.getOneCategory(id).update(data);
  }
  delete(id: string){

    // this.cS.deleteAllImages(key);

    return this.getOneCategory(id).delete();
  }
}
