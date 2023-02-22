export interface EntityMapper<Model, Entity> {
  toModel(entity: null): null;
  toModel(entity: Entity): Model;
  toModel(entity: Entity | null): Model | null;
}
