import LogServices from '#services/log_services'

export default class AuditHelper {
  static async logChanges(
    entity: 'USER' | 'TASK' | 'CATEGORY' | 'USER_ACCESSIBILITY',
    entityId: number,
    userId: number,
    oldData: any,
    newData: any
  ) {
    const logServices = new LogServices()
    for (const key of Object.keys(newData)) {
      if (oldData[key] !== newData[key]) {
        await logServices.createLog({
          action: 'UPDATE',
          entity,
          entityId,
          userId,
          field: key,
          oldValue: String(oldData[key] ?? ''),
          newValue: String(newData[key] ?? ''),
        })
      }
    }
  }
}
