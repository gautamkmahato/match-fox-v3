import { v4 as uuidv4 } from 'uuid';

export default function generateUuid() {
  const uniqueId = uuidv4(); // Generates a new UUID

  return uniqueId;
}