import type {StructureResolver} from 'sanity/structure'

// video + progress are internal (ingestion output / app state) — hidden from authors
const HIDDEN_TYPES = ['video', 'progress']

export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      ...S.documentTypeListItems().filter(
        (item) => !HIDDEN_TYPES.includes(item.getId() as string),
      ),
    ])
