export interface EntityInitializer {
  init(): void;
  initAssociations(): void;
}
