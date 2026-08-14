/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** GTM container id, e.g. "GTM-XXXXXXX". Analytics stay disabled until this is set. */
  readonly VITE_GTM_ID?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
