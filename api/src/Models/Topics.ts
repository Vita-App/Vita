import { Schema, model, SchemaDefinitionProperty } from 'mongoose';
import { TopicSchemaType } from '../types';

const TopicSchema = new Schema<TopicSchemaType>({
  value: Number,
  emojiIcon: { type: String, index: 'text' },
  emojiBadge: { type: String, index: 'text' },
  motivation: { type: String, index: 'text' },
  topicName: { type: String, index: 'text' },
  topicDescription: { type: String, index: 'text' },
});

export const TopicModel = model('Topic', TopicSchema);
