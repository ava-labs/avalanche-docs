import { openDB, IDBPDatabase } from 'idb';

interface QuizDB {
  quizResponses: {
    key: string;
    value: {
      selectedAnswers: number[];
      isAnswerChecked: boolean;
      isCorrect: boolean;
    };
  };
}

const dbName = 'QuizDatabase';
const storeName = 'quizResponses';

let dbPromise: Promise<IDBPDatabase<QuizDB>> | null = null;

function getDBPromise() {
  if (!dbPromise) {
    dbPromise = openDB<QuizDB>(dbName, 1, {
      upgrade(db) {
        db.createObjectStore(storeName);
      },
    });
  }
  return dbPromise;
}

export async function saveQuizResponse(quizId: string, response: QuizDB['quizResponses']['value']) {
  if (typeof window !== 'undefined') {
    const db = await getDBPromise();
    await db.put(storeName, response, quizId);
  }
}

export async function getQuizResponse(quizId: string): Promise<QuizDB['quizResponses']['value'] | undefined> {
  if (typeof window !== 'undefined') {
    const db = await getDBPromise();
    return db.get(storeName, quizId);
  }
  return undefined;
}

export async function resetQuizResponse(quizId: string) {
  if (typeof window !== 'undefined') {
    const db = await getDBPromise();
    await db.delete(storeName, quizId);
  }
}