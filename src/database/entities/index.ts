import { MatchInitializer } from './match.entity';
import { PictureInitializer } from './picture.entity';

export function initEntities(): void {
  const entityInitializers = [PictureInitializer, MatchInitializer];
  entityInitializers.forEach((initializer) => initializer.init());
  entityInitializers.forEach((initializer) => initializer.initAssociations());
}

initEntities();

export { PictureEntity } from './picture.entity';
export { MatchEntity } from './match.entity';
