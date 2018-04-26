import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument} from 'angularfire2/firestore';

import { Post } from './post';

import { Observable } from 'rxjs/Observable';
import { map } from 'rxjs/operators';

@Injectable()
export class PostsService {
  postCollection: AngularFirestoreCollection<Post>;

  constructor(private afs: AngularFirestore) {
    this.postCollection = this.afs.collection('posts',
        (ref) => ref.orderBy('created_at', 'desc'));
  }
  getPostsSnapshot(limit:number = 999): Observable<Post[]>{
    return this.afs.collection('posts',
        (ref) => ref.orderBy('created_at', 'desc').limit(limit)).snapshotChanges().map(
      (actions) =>{
        return actions.map(
          (a) => {
            const data = a.payload.doc.data() as Post;
            return {
              id: a.payload.doc.id,
              title: data.title,
              slug:data.slug,
              category:data.category,
              description:data.description,
              image_url:data.image_url,
              short_description:data.short_description,
              visible: data.visible,
              created_at: data.created_at,
              updated_at: data.updated_at
            }
          }
        );
      }
    );
  }

  getPostsByCategoryID(slug:string, limit:number = 999): Observable<Post[]>{
    return this.afs.collection('posts',
      (ref) => ref.where('category', '==', slug).orderBy('created_at', 'desc').limit(limit)).snapshotChanges().map(
      (actions) =>{
        return actions.map(
          (a) => {
            const data = a.payload.doc.data() as Post;
            return {
              id: a.payload.doc.id,
              title: data.title,
              slug:data.slug,
              category:data.category,
              description:data.description,
              image_url:data.image_url,
              short_description:data.short_description,
              visible: data.visible,
              created_at: data.created_at,
              updated_at: data.updated_at
            }
          }
        );
      }
    );
  }
  getPostBySlug(slug:string): Observable<Post[]>{
    return this.afs.collection('posts',
      (ref) => ref.where('slug', '==', slug).limit(1)).snapshotChanges().map(
      (actions) =>{
        return actions.map(
          (a) => {
            const data = a.payload.doc.data() as Post;
            return {
              id: a.payload.doc.id,
              title: data.title,
              slug:data.slug,
              category:data.category,
              description:data.description,
              image_url:data.image_url,
              short_description:data.short_description,
              visible: data.visible,
              created_at: data.created_at,
              updated_at: data.updated_at
            }
          }
        );
      }
    );
  }

  getOnePost(id: string){
    return this.afs.doc<Post>(`posts/${id}`);
  }
  create(form: any){
      const post = {
        title: form['title'],
        slug:form['slug'],
        description:form['description'],
        category:form['category'],
        short_description: form['short_description'],
        image_url:form['image_url'],
        visible: form['visible'],
        created_at: new Date().getTime(),
        updated_at: new Date().getTime(),
    };
    return this.postCollection.add(post);
  }

  update(id: string, data: Partial<Post>){
    return this.getOnePost(id).update(data);
  }
  delete(id: string){

    // this.cS.deleteAllImages(key);

    return this.getOnePost(id).delete();
  }
}
