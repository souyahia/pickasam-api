export interface PictureRepository {
  updateElo: (uuid: string, elo: number) => Promise<void>;
}
