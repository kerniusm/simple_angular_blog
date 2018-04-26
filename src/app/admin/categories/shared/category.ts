export class Category {
  id?:string;
  title:string;
  slug:string;
  parent?:string;
  visible:boolean;
  created_at: number;
  updated_at: number;
}
