export interface ImportMetaEnv {
  readonly VITE_AG_GRID_LICENSE_KEY: string;
  // other environment variables you might have
}

export interface ImportMeta {
  readonly env: ImportMetaEnv;
}
