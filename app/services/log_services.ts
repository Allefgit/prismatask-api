import Log from '#models/log'

interface CreateLogData {
  entity: 'USER' | 'TASK' | 'CATEGORY' | 'USER_ACCESSIBILITY'
  entityId: number
  action: 'CREATE' | 'UPDATE' | 'DELETE' | 'LOGIN' | 'LOGOUT'
  field?: string
  oldValue?: string | null
  newValue?: string | null
  userId: number
}

export default class LogServices {
  async createLog({ entity, entityId, action, field, oldValue, newValue, userId }: CreateLogData) {
    return await Log.create({
      entity,
      entityId,
      action,
      field,
      oldValue: oldValue ?? null,
      newValue: newValue ?? null,
      userId: userId,
    })
  }

  async taskAuditory(taskId: number) {
    const logs = await Log.query().where('entity', 'TASK').andWhere('entity_id', taskId)
    return logs
  }

  async caregoryAuditory(categoryId: number) {
    const logs = await Log.query().where('entity', 'CATEGORY').andWhere('entity_id', categoryId)
    return logs
  }

  async userAuditory(userId: number) {
    const logs = await Log.query().where('entity', 'USER').andWhere('entity_id', userId)
    return logs
  }

  async userAccessibilityAuditory(userAccessibilityId: number) {
    const logs = await Log.query()
      .where('entity', 'USER_ACCESSIBILITY')
      .andWhere('entity_id', userAccessibilityId)
    return logs
  }
}
