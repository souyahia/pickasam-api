export interface EntityMapper<Model, Entity, Args = never> {
  toModel(entity: null, args?: Args): null;
  toModel(entity: Entity, args?: Args): Model;
  toModel(entity: Entity | null, args?: Args): Model | null;
}
