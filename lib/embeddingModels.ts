export interface EmbeddingModel {
  id: string
  name: string
  provider: string
  pricePerMillion: number
  dimensions: number
  description: string
}

export const EMBEDDING_MODELS: EmbeddingModel[] = [
  {
    id: 'text-embedding-3-small',
    name: 'text-embedding-3-small',
    provider: 'OpenAI',
    pricePerMillion: 0.02,
    dimensions: 1536,
    description: 'Most cost-effective embedding model from OpenAI',
  },
  {
    id: 'text-embedding-3-large',
    name: 'text-embedding-3-large',
    provider: 'OpenAI',
    pricePerMillion: 0.13,
    dimensions: 3072,
    description: 'Highest quality embeddings with 3072 dimensions',
  },
  {
    id: 'text-embedding-ada-002',
    name: 'text-embedding-ada-002',
    provider: 'OpenAI',
    pricePerMillion: 0.1,
    dimensions: 1536,
    description: 'Legacy Ada model, still widely used',
  },
  {
    id: 'embed-english-v3.0',
    name: 'embed-english-v3.0',
    provider: 'Cohere',
    pricePerMillion: 0.1,
    dimensions: 1024,
    description: 'Best for English text embeddings',
  },
  {
    id: 'embed-multilingual-v3.0',
    name: 'embed-multilingual-v3.0',
    provider: 'Cohere',
    pricePerMillion: 0.1,
    dimensions: 1024,
    description: 'Supports 100+ languages',
  },
  {
    id: 'mistral-embed',
    name: 'mistral-embed',
    provider: 'Mistral',
    pricePerMillion: 0.1,
    dimensions: 1024,
    description: 'Mistral embedding model for RAG applications',
  },
]

export function getAllEmbeddingModels(): EmbeddingModel[] {
  return EMBEDDING_MODELS
}

export function formatEmbeddingPrice(price: number): string {
  return `$${price.toFixed(2)}`
}
