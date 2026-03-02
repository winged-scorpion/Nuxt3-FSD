import { getDB } from '../utils/db'
import type { TagItem, QuestionItem } from '../types/question'

export class QuestionService {
  static async insertData(data: TagItem[]): Promise<{ success: boolean; message: string }> {
    const db = await getDB()

    try {
      await db.run('BEGIN TRANSACTION')

      for (const tag of data) {
        // Вставляем тег и получаем его ID
        const tagResult = await db.run(`
          INSERT INTO Tags (tag, name, show)
          VALUES (?, ?, ?)
        `, [tag.tag, tag.name, tag.show])

        const tagId = tagResult.lastID

        // Вставляем все вопросы для этого тега
        for (const question of tag.list) {
          await db.run(`
            INSERT INTO Questions (tag_id, question, answer, audio, show)
            VALUES (?, ?, ?, ?, ?)
          `, [tagId, question.question, question.answer, question.audio, question.show])
        }
      }

      await db.run('COMMIT')
      return { success: true, message: 'Все данные успешно добавлены' }
    } catch (error) {
      await db.run('ROLLBACK')
      console.error('Ошибка при добавлении данных:', error)
      return { success: false, message: 'Ошибка при добавлении данных' }
    }
  }

  static async getFullData() {
    const db = await getDB()
    return await db.all(`
      SELECT T.tag, T.name, T.show as tag_show,
             Q.question, Q.answer, Q.audio, Q.show as question_show
      FROM Tags T
      JOIN Questions Q ON T.tag_id = Q.tag_id
    `)
  }
}
