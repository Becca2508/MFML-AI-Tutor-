export interface sectionNotes {
  topic: string;
  objective: string;
  vocabulary: {
    term: string;
    definition: string;
    example?: string;
  }[];
}